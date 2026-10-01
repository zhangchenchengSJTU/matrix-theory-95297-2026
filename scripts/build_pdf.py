#!/usr/bin/env python3
"""Compile homework Markdown with Pandoc and XeLaTeX, without HTML."""
import argparse
import json
import re
import shutil
import subprocess
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def tex_escape(text):
    replacements = {'\\': r'\textbackslash{}', '&': r'\&', '%': r'\%', '$': r'\$', '#': r'\#', '_': r'\_', '{': r'\{', '}': r'\}', '~': r'\textasciitilde{}', '^': r'\textasciicircum{}'}
    return ''.join(replacements.get(char, char) for char in text)

def build(source):
    text = source.read_text()
    config = json.loads((ROOT / 'assignments/documents.json').read_text()).get(source.name, {})
    metadata = re.match(r'^---\r?\n([\s\S]*?)\r?\n---\r?\n', text)
    if metadata:
        for line in metadata[1].splitlines():
            if ':' in line:
                key, value = line.split(':', 1)
                config[key.strip()] = value.strip()
        text = text[metadata.end():]
    heading = re.search(r'^#\s+(.+)$', text, re.MULTILINE)
    title = heading.group(1) if heading else source.stem
    if heading:
        text = text[:heading.start()] + text[heading.end():]
    body = subprocess.run(['pandoc', '--from=markdown+tex_math_dollars-raw_html', '--to=latex', '--wrap=none'], input=text, text=True, check=True, capture_output=True).stdout
    values = {'TITLE': title, 'REDHEAD': config.get('redhead', '矩阵理论课程作业'), 'NUMBER': config.get('document-number', ''), 'ISSUER': config.get('issuer', ''), 'DATE': config.get('publication-date', ''), 'PRINTER': config.get('printer', ''), 'PRINTDATE': config.get('print-date', '')}
    template = (ROOT / 'templates/homework.tex').read_text()
    for key, value in values.items():
        template = template.replace(f'@@{key}@@', tex_escape(value))
    template = template.replace('@@BODY@@', body)
    out = ROOT / 'pdf'
    out.mkdir(exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='matrix-latex-') as directory:
        work = Path(directory)
        (work / 'homework.tex').write_text(template)
        result = subprocess.run(['latexmk', '-xelatex', '-interaction=nonstopmode', '-halt-on-error', '-file-line-error', 'homework.tex'], cwd=work, text=True, capture_output=True)
        log = (work / 'homework.log').read_text(errors='replace') if (work / 'homework.log').exists() else result.stdout + result.stderr
        (out / f'{source.stem}.log').write_text(log)
        (out / f'{source.stem}.tex').write_text(template)
        if result.returncode:
            raise RuntimeError(f'LaTeX compilation failed: {out / (source.stem + ".log")}\n{log[-2500:]}')
        issues = [line for line in log.splitlines() if any(token in line for token in ['Overfull', 'Missing character', 'Undefined control sequence'])]
        if issues:
            raise RuntimeError('Layout/font audit failed:\n' + '\n'.join(issues))
        shutil.copyfile(work / 'homework.pdf', out / f'{source.stem}.pdf')
    print(f'{source.name} -> pdf/{source.stem}.pdf')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('files', nargs='*', help='Markdown filenames under assignments/')
    args = parser.parse_args()
    sources = [ROOT / 'assignments' / name for name in args.files] if args.files else [ROOT / 'assignments' / name for name in json.loads((ROOT / 'assignments/documents.json').read_text())]
    for source in sources:
        build(source)
