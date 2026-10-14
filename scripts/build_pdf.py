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
FONT_SIZES = json.loads((ROOT / 'assignments/font-sizes.json').read_text())
THEMES = json.loads((ROOT / 'assignments/themes.json').read_text())

def tex_escape(text):
    replacements = {'\\': r'\textbackslash{}', '&': r'\&', '%': r'\%', '$': r'\$', '#': r'\#', '_': r'\_', '{': r'\{', '}': r'\}', '~': r'\textasciitilde{}', '^': r'\textasciicircum{}'}
    return ''.join(replacements.get(char, char) for char in text)

def build(source, size='default', theme='blue'):
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
    body = re.sub(r'(\\textbf\{问题[一二三四五六七八九十]+\})[ \t]*', lambda match: match[1] + r'\hspace{0.25em}', body)
    values = {'TITLE': title, 'REDHEAD': config.get('redhead', '矩阵理论课程作业'), 'NUMBER': config.get('document-number', ''), 'ISSUER': config.get('issuer', ''), 'DATE': config.get('publication-date', ''), 'PRINTER': config.get('printer', ''), 'PRINTDATE': config.get('print-date', ''), 'REVISION': config.get('revision', '')}
    template = (ROOT / 'templates/homework.tex').read_text()
    color = THEMES[theme]['color'].lstrip('#')
    rgb = ','.join(str(int(color[index:index + 2], 16)) for index in (0, 2, 4))
    template = template.replace('@@THEMECOLOR@@', rgb)
    scale = FONT_SIZES[size]['scale']
    for key, base in {'BODYFONT': 16, 'BODYLINE': 30, 'TITLEFONT': 22, 'MATRIXLINE': 18, 'ALIGNEDLINE': 20}.items():
        template = template.replace(f'@@{key}@@', f'{base * scale:g}')
    for key, value in values.items():
        template = template.replace(f'@@{key}@@', tex_escape(value))
    template = template.replace('@@BODY@@', body)
    out = ROOT / 'pdf'
    out.mkdir(exist_ok=True)
    suffix = ('' if size == 'default' else f'-{size}') + ('' if theme == 'blue' else f'-{theme}')
    stem = source.stem + suffix
    with tempfile.TemporaryDirectory(prefix='matrix-latex-') as directory:
        work = Path(directory)
        (work / 'homework.tex').write_text(template)
        result = subprocess.run(['latexmk', '-xelatex', '-interaction=nonstopmode', '-halt-on-error', '-file-line-error', 'homework.tex'], cwd=work, text=True, capture_output=True)
        log = (work / 'homework.log').read_text(errors='replace') if (work / 'homework.log').exists() else result.stdout + result.stderr
        (out / f'{stem}.log').write_text(log)
        (out / f'{stem}.tex').write_text(template)
        if result.returncode:
            raise RuntimeError(f'LaTeX compilation failed: {out / (stem + ".log")}\n{log[-2500:]}')
        issues = [line for line in log.splitlines() if any(token in line for token in ['Overfull', 'Missing character', 'Undefined control sequence'])]
        if issues:
            raise RuntimeError('Layout/font audit failed:\n' + '\n'.join(issues))
        shutil.copyfile(work / 'homework.pdf', out / f'{stem}.pdf')
    print(f'{source.name} ({FONT_SIZES[size]["label"]}, {THEMES[theme]["label"]}) -> pdf/{stem}.pdf', flush=True)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('files', nargs='*', help='Markdown filenames under assignments/')
    parser.add_argument('--sizes', nargs='+', choices=FONT_SIZES, default=['default', 'tiny', 'small', 'large'], help='Font sizes to build (default: all four)')
    parser.add_argument('--themes', nargs='+', choices=THEMES, default=['blue', 'red', 'black'], help='Document themes to build (default: all three)')
    args = parser.parse_args()
    sources = [ROOT / 'assignments' / name for name in args.files] if args.files else [ROOT / 'assignments' / name for name in json.loads((ROOT / 'assignments/documents.json').read_text())]
    for source in sources:
        for size in args.sizes:
            for theme in args.themes:
                build(source, size, theme)
