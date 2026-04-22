# -*- coding: utf-8 -*-
from pathlib import Path
import re

p = Path("quran-iraab-data.js")
t = p.read_text(encoding="utf-8")
T = re.search(
    r'ayahText: "([^"]+)"',
    t[t.find('id: "97-4"') : t.find('id: "97-5"')],
).group(1)
bi, me = T.find("بِإِذْنِ"), T.find(" مّ", T.find("بِإِذْنِ"))
BITH = T[bi:me]
q = t[t.find('segment: "فِى لَيْلَةِ"') : t.find('segment: "ٱلْقَدْرِ"', t.find('segment: "فِى لَيْلَةِ"'))]
ms = re.findall(r"\{ type: 'link', text: \"([^\"]+)\"\, rule: \"harf-jarr\" \}", q)
LJ, MT = ms[0], ms[1]

i0 = t.find('        segment: "بِإِذْنِ",')
i1 = t.find('        segment: "مّ', i0)
old = t[i0:i1]

bith = f"""      {{
        segment: "{BITH}",
        analysisParts: [
          {{ type: 'link', text: "{LJ}", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "{MT}", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "بِحَالٍ مَحْذُوفَةٍ", rule: "tawabi" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "مِنَ ٱلْمَلَائِكَةِ", rule: "fael" }},
          {{ type: 'text', text: " (أَي: " }},
          {{ type: 'text', text: "مُسَيَّرِينَ). " }},
          {{ type: 'text', text: "«ٱلْبَاءُ» " }},
          {{ type: 'link', text: "حَرْفُ جَرٍّ", rule: "harf-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'text', text: "وَٱلْمَجْرُورُ: " }},
          {{ type: 'text', text: "«إِذْنٌ» " }},
          {{ type: 'link', text: "ٱسْمٌ مَجْرُورٌ", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'text', text: "وَٱلْمُرَكَّبُ: " }},
          {{ type: 'text', text: "رَبٌ " }},
          {{ type: 'link', text: "مُضَافٌ", rule: "idafah" }},
          {{ type: 'text', text: " " }},
          {{ type: 'text', text: "وَٱلْمُلْحَقُ: " }},
          {{ type: 'text', text: "«ٱلْهَاءُ» " }},
          {{ type: 'link', text: "ضَمِيرٌ مُتَّصِلٌ", rule: "attached-pronouns" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "مَبْنِيٌ", rule: "mabni-muarab" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "عَلَى الْفَتْحِ", rule: "mabni-muarab" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "فِي مَحَلِّ جَرٍّ", rule: "irab-jarr" }},
          {{ type: 'text', text: " " }},
          {{ type: 'link', text: "مُضَافٌ إِلَيْهٍ", rule: "idafah" }},
          {{ type: 'text', text: ". " }},
          {{ type: 'text', text: "وَٱلْمِيمُ " }},
          {{ type: 'link', text: "لِلْجَمَاعَةِ", rule: "number-plural" }},
          {{ type: 'text', text: "." }},
        ],
      }},

"""

p.write_text(t[:i0] + bith + t[i1:], encoding="utf-8")
print("bith merged", repr(BITH))
