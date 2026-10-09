#!/usr/bin/env python3
"""Build per-section textbook PDFs from the committed full PDF versions.

The three ``all.pdf`` files are source artifacts and are deliberately never
rewritten.  This script creates only the section excerpts referenced by
``downloads/manifest.json``.  Links whose destinations remain in an excerpt
are copied as local links; links to pages outside it are omitted.
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
from typing import Any

import pymupdf


PAGE_RANGES = {
    "original": "source_pages",
    "glyph": "source_pages",
    "tex": "tex_pages",
}


def section_file(source: pymupdf.Document, destination: Path, first: int, last: int) -> None:
    """Copy pages ``first`` through ``last`` (one-based), retaining local links.

    This is the same extraction approach used for the locally verified
    textbook downloads.  ``insert_pdf(..., links=False)`` avoids keeping
    broken links, then each retained link is recreated with its destination
    rebased to the excerpt.
    """
    part = pymupdf.open()
    part.insert_pdf(source, from_page=first - 1, to_page=last - 1, links=False)

    for index in range(first - 1, last):
        for link in source[index].get_links():
            kind = link["kind"]
            if kind in (pymupdf.LINK_GOTO, pymupdf.LINK_NAMED):
                target = link.get("page", -1)
                if not first - 1 <= target <= last - 1:
                    continue
                point = link["to"]
                # Named destinations use the source PDF coordinate system.
                if kind == pymupdf.LINK_NAMED:
                    point = pymupdf.Point(point.x, source[target].rect.height - point.y)
                part[index - first + 1].insert_link(
                    {
                        "kind": pymupdf.LINK_GOTO,
                        "from": link["from"],
                        "page": target - first + 1,
                        "to": point,
                    }
                )
            elif kind == pymupdf.LINK_URI:
                part[index - first + 1].insert_link(
                    {"kind": pymupdf.LINK_URI, "from": link["from"], "uri": link["uri"]}
                )

    destination.parent.mkdir(parents=True, exist_ok=True)
    if destination.exists():
        destination.unlink()
    part.save(destination, garbage=4, deflate=True)
    part.close()


def page_range(row: dict[str, Any], field: str, page_count: int) -> tuple[int, int]:
    value = row.get(field)
    if not isinstance(value, list) or len(value) != 2 or not all(isinstance(x, int) for x in value):
        raise ValueError(f"{row.get('id', '<unknown>')}: missing valid {field}")
    first, last = value
    if first < 1 or last < first or last > page_count:
        raise ValueError(
            f"{row.get('id', '<unknown>')}: {field} {value} outside PDF page range 1..{page_count}"
        )
    return first, last


def verify_links(pdf: Path) -> int:
    """Ensure every retained internal destination belongs to its excerpt."""
    document = pymupdf.open(pdf)
    try:
        link_count = 0
        for page in document:
            for link in page.get_links():
                if link["kind"] == pymupdf.LINK_GOTO:
                    target = link.get("page", -1)
                    if not 0 <= target < len(document):
                        raise ValueError(f"{pdf}: internal link points to page {target}")
                    link_count += 1
        return link_count
    finally:
        document.close()


def build(root: Path) -> None:
    downloads = root / "downloads"
    manifest_path = downloads / "manifest.json"
    manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
    rows = manifest.get("rows")
    if not isinstance(rows, list) or not rows or rows[0].get("id") != "all":
        raise ValueError("downloads/manifest.json must start with the all-PDF row")

    total_files = 0
    total_links = 0
    for version, range_field in PAGE_RANGES.items():
        source_path = downloads / version / "all.pdf"
        if not source_path.is_file():
            raise FileNotFoundError(f"required full PDF is missing: {source_path}")

        source = pymupdf.open(source_path)
        try:
            for row in rows[1:]:
                row_id = row.get("id")
                if not isinstance(row_id, str) or not row_id:
                    raise ValueError("each manifest row needs a non-empty id")
                first, last = page_range(row, range_field, len(source))
                output = downloads / version / f"{row_id}.pdf"
                section_file(source, output, first, last)
                total_links += verify_links(output)
                total_files += 1
        finally:
            source.close()

    print(
        json.dumps(
            {"section_pdfs": total_files, "validated_internal_links": total_links},
            ensure_ascii=False,
        )
    )


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()
    build(args.root.resolve())
