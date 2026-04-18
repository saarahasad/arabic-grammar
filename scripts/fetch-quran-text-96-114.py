#!/usr/bin/env python3
"""Regenerate quran-text-96-114.js (Uthmani text, surahs 95–114) from api.alquran.cloud."""

from __future__ import annotations

import json
import os
import urllib.request

API = "https://api.alquran.cloud/v1/surah/{}/quran-uthmani"


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    target = os.path.join(root, "quran-text-96-114.js")
    out: dict[str, dict] = {}
    for s in range(95, 115):
        with urllib.request.urlopen(API.format(s)) as r:
            j = json.load(r)
        data = j["data"]
        block: dict = {
            "_nameAr": data["name"],
            "_ayahCount": data["numberOfAyahs"],
        }
        for a in data["ayahs"]:
            block[str(a["numberInSurah"])] = a["text"]
        out[str(s)] = block

    with open(target, "w", encoding="utf-8") as f:
        f.write("window.QURAN_TEXT_96_114 = ")
        json.dump(out, f, ensure_ascii=False)
        f.write(";\n")
    print("Wrote", target)


if __name__ == "__main__":
    main()
