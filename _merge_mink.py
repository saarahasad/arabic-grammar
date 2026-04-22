# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path("quran-iraab-data.js")
t = p.read_text(encoding="utf-8")
b2 = t[t.find('id: "97-4"') : t.find('id: "97-5"')]
T = re.search(r'ayahText: "([^"]+)"', b2).group(1)
mi = T.find("مّ", T.find("بِإِذْنِ"))
MINK = T[mi : T.find(" أَمْر", mi)]

q = t[t.find('segment: "فِى لَيْلَةِ"') : t.find('segment: "ٱلْقَدْرِ"', t.find('segment: "فِى لَيْلَةِ"'))]
ms = re.findall(r"\{ type: 'link', text: \"([^\"]+)\"\, rule: \"harf-jarr\" \}", q)
LJ, MT = ms[0], ms[1]

i0 = t.find('        segment: "مّ', t.find('id: "97-4"'))
i1 = t.find('        segment: "أَمْرٍۢ",', i0)
i_open = t.rfind("      {", 0, i0)

mink = f"""      {{
        segment: "{MINK}",
        analysisParts: [
          {{ type: 'link', text: "{LJ}", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "{MT}", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "بِتَنَزَّلُ", rule: "verb-present" }},
          {{ type: 'text', text: ". " }},
          {{ type: 'text', text: "«مِنْ» " }},
          {{ type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'text', text: "وَٱلْمَجْرُورُ: " }},
          {{ type: 'text', text: "«كُلٌ''» " }},
          {{ type: 'link', text: "ٱسْمٌ مَجْرُورٌ", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "وَٱلْمُضَافٌ", rule: "idafah" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "وَعَلَامَةُ جَرِ''ه", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "ٱلْكَسْرَةُ", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "ٱلظَّاهِرَةُ", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "عَلَى آخِرِهِ", rule: "irab-jarr" }},
          {{ type: 'text', text: "." }},
        ],
      }},

"""

# «كُلٌ''» must match orthography — use exact from MINK (second word)
kul_in_ayah = MINK.split()[1]
mink = mink.replace("«كُلٌ''»", f"«{kul_in_ayah}»")

# جرِ''ه needs shadda like file: use جَرِ''ه from 97-3 row
if "وَعَلَامَةُ جَرِ''ه" in mink:
    mink = mink.replace("وَعَلَامَةُ جَرِ''ه", "وَعَلَامَةُ جَرِ''ه")

p.write_text(t[:i_open] + mink + t[i1:], encoding="utf-8")
print("mink", repr(MINK))
