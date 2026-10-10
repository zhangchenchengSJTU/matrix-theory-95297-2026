#!/usr/bin/env python3
"""Copy a reviewed textbook export into this course site's static paths."""
import argparse
import hashlib
import json
import re
import shutil
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def sync(source):
    reader = source / 'mathjax'
    target = ROOT / 'textbook'
    target.mkdir(exist_ok=True)
    for name in ('index.html', 'reader.css', 'reader.js', 'mathjax-config.js'):
        shutil.copy2(reader / name, target / name)
    index = (target / 'index.html').read_text()
    index = index.replace('href="http://localhost:8952/"', 'href="../"')
    index = index.replace('src="vendor/tex-svg.js"', 'src="../vendor/tex-svg.js"')
    (target / 'index.html').write_text(index)
    assert (reader / 'vendor/tex-svg.js').read_bytes() == (ROOT / 'vendor/tex-svg.js').read_bytes()

    content = target / 'content'
    content.mkdir(exist_ok=True)
    pages = {}
    image_names = set()
    pattern = re.compile(r'\.\./semantic/ocr-generated/images/([^"<>]+)')
    for path in sorted((reader / 'content').glob('p*.html')):
        text = path.read_text()
        image_names.update(pattern.findall(text))
        text = pattern.sub(r'images/\1', text)
        pages[int(path.stem[1:])] = text
    images = target / 'images'
    images.mkdir(exist_ok=True)
    for name in sorted(image_names):
        shutil.copy2(source / 'semantic/ocr-generated/images' / name, images / name)

    manifest = json.loads((reader / 'content/manifest.json').read_text())
    assert sorted(pages) == manifest['pages'] == list(range(5, 261))
    manifest['revision'] = hashlib.sha256(json.dumps(pages, ensure_ascii=False, sort_keys=True).encode()).hexdigest()[:16]
    for bundle in manifest['bundles']:
        path = target / bundle['path']
        path.parent.mkdir(parents=True, exist_ok=True)
        selected = {number: text for number, text in pages.items() if bundle['first'] <= number <= bundle['last'] + 1}
        path.write_text(json.dumps(selected, ensure_ascii=False, separators=(',', ':')) + '\n')
    search_index = json.loads((reader / 'content/search-index.json').read_text())
    if isinstance(search_index, dict) and 'revision' in search_index:
        search_index['revision'] = manifest['revision']
    (content / 'search-index.json').write_text(json.dumps(search_index, ensure_ascii=False, separators=(',', ':')) + '\n')
    (content / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')

    downloads = ROOT / 'downloads'
    downloads.mkdir(exist_ok=True)
    shutil.copy2(source / 'downloads/manifest.json', downloads / 'manifest.json')
    # This standalone document accompanies both corrected derived PDF versions.
    shutil.copy2(source / 'downloads/errata.pdf', downloads / 'errata.pdf')
    for version in ('original', 'glyph', 'tex'):
        folder = downloads / version
        folder.mkdir(exist_ok=True)
        shutil.copy2(source / 'downloads' / version / 'all.pdf', folder / 'all.pdf')
    print(json.dumps(dict(body_pages=len(pages), chapter_bundles=len(manifest['bundles']), images=len(image_names), pdf_versions=3)))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source', type=Path, required=True)
    sync(parser.parse_args().source)
