"""สตอรี่บอร์ดชุดที่ 7 — ผลงานของ ดร.อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญ 2 เรื่อง × ไทย/อังกฤษ (27 ก.ย. 2569) — storyboard.py นำเข้าไฟล์นี้แล้วต่อท้าย CLIPS/PALETTE

ช่วงที่ 3 ของแผน "รวบรวมผลงาน → บทสรุป → วิดีโอ" ที่ผู้ใช้ขอ · ข้อต่างจากชุดที่ 2–6:
  · **ไม่เจนภาพใหม่เลย** ทุกฉากใช้ภาพประจำบทความที่อยู่บนเว็บแล้ว (`image: "existing"`) — ผู้ใช้ตัดสินใจ 6 ก.ย. ว่าไม่เจนวิดีโอด้วย AI แบบชุดก่อนอีก
    ชุดนี้จึงเหลือค่าใช้จ่ายเฉพาะเสียงพากย์
  · **เสียงพากย์เป็นเสียงโคลนของผู้ใช้** (ไทย Smith Boon · อังกฤษ Smith Boonbr) ไม่ใช่เสียงของผู้เขียน — ผู้ใช้ตัดสินใจ 27 ก.ย.
    บทจึง**ห้ามใช้บุรุษที่หนึ่งแทนผู้วิจัย** ศูนย์ฯ เป็นผู้เล่า ("ศูนย์คอมอินโนขอเล่างานของ…") และประธานของกริยาวิจัยคือ "ทีมวิจัย"
    ดร.อิบเตซาม ได้เครดิตเป็น "นักวิจัยรับเชิญของศูนย์" ตามหน้าทีมบนเว็บ · ไม่ใช้สรรพนามแทนตัวท่านเลยทั้งสองภาษา
  · เรื่องกาตาร์ต่อยอดจากงานของนิสิต (ไอชา อัลคุไลฟี — ผู้ใช้ยืนยัน 27 ก.ย.) จึงมีประโยค STUDENT_TH/EN ตามถ้อยคำที่ผู้ใช้เลือกไว้ในชุดที่ 6
    อาจารย์ที่ปรึกษา (ผู้ใช้เอง) ไม่เอ่ยชื่อในบท เพราะเสียงพากย์เป็นเสียงของท่าน และชื่ออยู่บนการ์ดปิดแล้ว (`credits.py` อ่าน `citation.authors`)
  · ตัวเลขทุกตัวมาจากบทสรุปบนเว็บที่ยึดตารางผลของบทความ (PR #72) และฉากข้อควรระวังพูดถึงจุดที่บทความไม่รองรับข้อสรุปของตัวเองด้วย
    (ปากีสถาน: ช่องว่างเมือง–ชนบทไม่มีค่าสถิติ · กาตาร์: ผลการสัมภาษณ์ไม่ได้แยกเรื่องการรู้เท่าทันสื่อออกมา)
"""
from storyboard_batch2 import CLOSING2
from storyboard_batch6 import STUDENT_TH, STUDENT_EN

CLOSING7 = CLOSING2

# คู่สีอ่านจากภาพประจำบทความ (นับพิกเซลที่อิ่มสีของไฟล์ -800.webp) — ใช้แค่ในหน้าสตอรี่บอร์ด เพราะชุดนี้ไม่เจนภาพ
PALETTE7 = {
    "pkmedia": {"object": "deep crimson", "shadow": "mustard yellow", "obj_hex": "#A02040", "sh_hex": "#E0A040",
                "shadow_style": "(no new images in this batch — the paper's existing illustration is used for every scene)"},
    "qatarwe": {"object": "coral red", "shadow": "deep navy", "obj_hex": "#E06060", "sh_hex": "#204060",
                "shadow_style": "(no new images in this batch — the paper's existing illustration is used for every scene)"},
}

EXISTING = "ภาพประจำบทความ (มีแล้วบนเว็บ) — ชุดนี้ไม่เจนภาพใหม่"


def closing():
    return {"role": "closing", "secs": (14, 14), "image": "logo", "narr": CLOSING7, "label": None, "text": None,
            "visual_th": "การ์ดปิดประจำชุด + ชื่อผู้เขียนทุกคน (ไม่ต้องเจนภาพ)", "subject": None}


def scene(role, secs, narr_th, narr_en, label_th, label_en, text_th, text_en):
    return {"role": role, "secs": (secs, secs), "image": "existing", "narr": {"th": narr_th, "en": narr_en},
            "label": {"th": label_th, "en": label_en}, "text": {"th": text_th, "en": text_en},
            "visual_th": EXISTING, "subject": None}


CLIPS7 = [
    # ───────────────────────────────────────────────────────────────────────────
    {
        "key": "pkmedia", "batch": 7,
        "slug": "adult-media-literacy-pakistan",
        "name_th": "การรู้เท่าทันสื่อของผู้ใหญ่ในปากีสถาน",
        "name_en": "Media literacy among adults in Pakistan",
        "label": {"th": "งานวิจัย · รู้เท่าทันสื่อ", "en": "Research · Media literacy"},
        "scenes": [
            scene("hook", 10,
                  "ผู้ใหญ่ในปากีสถานที่ใช้สื่อทุกวัน มีแค่สี่สิบเอ็ดเปอร์เซ็นต์ ที่ดูออกว่าข่าวไหนลำเอียง หรือชวนให้เข้าใจผิด … แล้วอะไรที่แยกคนที่ดูออก กับคนที่ดูไม่ออก",
                  "Among adults in Pakistan who use media every day, only forty-one percent could tell when a news story was biased or misleading … so what separates the people who can from the people who can't?",
                  "งานวิจัย · รู้เท่าทันสื่อ", "Research · Media literacy",
                  "ใช้สื่อทุกวัน แต่ดูข่าวลำเอียงออก แค่ 41%",
                  "They use media every day, yet only 41% could spot a biased story"),
            scene("method", 22,
                  "ศูนย์คอมอินโนขอเล่างานของ ดอกเตอร์อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญของศูนย์ ที่เขียนร่วมกับซิดราห์ ยาซีน ทีมวิจัยลงพื้นที่สำรวจแบบพบหน้า ผู้ใหญ่ห้าร้อยคนจากทั้งสี่แคว้นของปากีสถาน ตามสัดส่วนประชากร ในเดือนมีนาคมถึงเมษายน สองพันห้าร้อยหกสิบแปด ทุกคนใช้สื่ออย่างน้อยวันละชั่วโมง ราวครึ่งหนึ่งอยู่ชนบท และใช้อินเทอร์เน็ตทุกวันไม่ถึงหนึ่งในสาม จากนั้นทีมวิจัยเลือกสามสิบคนมาคุยเชิงลึก ทั้งคนเมืองและคนชนบท เป็นภาษาอูรดู สินธี และปาชโต ผู้หญิงในชนบทได้คุยกับพนักงานเก็บข้อมูลที่เป็นผู้หญิง",
                  "The ComInno Center presents the work of Dr. Ibtesam Mazahir, an invited researcher at the Center, written with Sidrah Yaseen. The research team surveyed five hundred adults face to face across all four of Pakistan's provinces, in proportion to population, in March and April twenty twenty-five. Everyone used media at least an hour a day, about half lived in rural areas, and fewer than a third went online every day. The team then sat down with thirty of them for in-depth interviews, in towns and villages, in Urdu, Sindhi and Pashto, with rural women interviewed by women.",
                  "ทำอะไร", "What was done",
                  "สำรวจแบบพบหน้า 500 คน · ครบทั้ง 4 แคว้น · ทุกคนใช้สื่อวันละชั่วโมงขึ้นไป · สัมภาษณ์เชิงลึกอีก 30 คน",
                  "500 adults surveyed face to face · all four provinces · an hour or more of media a day · 30 in-depth interviews"),
            scene("finding", 14,
                  "สี่สิบเอ็ดเปอร์เซ็นต์ที่ดูข่าวลำเอียงออก ยังไม่ใช่ตัวเลขที่ต่ำที่สุด มีแค่หนึ่งในสาม ที่เข้าใจการตั้งค่าความเป็นส่วนตัวบนโซเชียลมีเดีย และไม่ถึงหนึ่งในห้า ที่เคยสร้างหรือแชร์เนื้อหาของตัวเองสักชิ้น",
                  "Forty-one percent spotting slanted news was not even the lowest number. Only a third understood their privacy settings on social media, and fewer than one in five had ever created or shared anything of their own.",
                  "สามตัวเลข", "Three numbers",
                  "ดูข่าวลำเอียงออก 41% · ตั้งค่าความเป็นส่วนตัวเป็น 33% · เคยสร้างหรือแชร์เนื้อหาเอง 18%",
                  "Spot biased news 41% · understand privacy settings 33% · ever created or shared own content 18%"),
            scene("finding", 18,
                  "สิ่งที่ไปด้วยกันกับการรู้เท่าทันสื่อชัดที่สุด คือการศึกษา ยิ่งเรียนสูง คะแนนยิ่งสูง คนเมืองก็ดูข่าวลำเอียงออกมากกว่าคนชนบท ส่วนอายุไปอีกทาง ยิ่งอายุน้อย ยิ่งใช้เครื่องมือดิจิทัลเก่ง แต่ผู้เขียนตั้งข้อสังเกตว่า คนรุ่นใหม่มักเชื่อสิ่งที่อ่าน โดยไม่ตั้งคำถาม",
                  "The clearest link was with education: the more schooling, the higher the score. People in cities also spotted slanted news more often than people in villages. Age ran the other way: the younger people were, the better they handled digital tools. But the authors note that young people often believe what they read without questioning it.",
                  "อะไรไปด้วยกัน", "What goes together",
                  "ยิ่งเรียนสูง ยิ่งรู้เท่าทันสื่อ · ยิ่งอายุน้อย ยิ่งใช้เครื่องมือเก่ง · คนเมืองดูข่าวลำเอียงออกมากกว่า",
                  "The more schooling, the higher the score · the younger, the better with digital tools · cities spotted more than villages"),
            scene("finding", 22,
                  "การคุยเชิงลึกช่วยอธิบายตัวเลขเหล่านี้ หลายคนเลิกเชื่อข่าวโทรทัศน์ เพราะเห็นว่าลำเอียงและเร้าอารมณ์ แล้วหันไปฟังคนวิจารณ์บนยูทูบ กับกลุ่มวอตส์แอปแทน คนสูงวัยดูโทรทัศน์โดยไม่ค่อยตั้งคำถาม คนรุ่นใหม่อยู่บนโซเชียลทั้งวัน แต่แยกไม่ออกว่าอะไรน่าเชื่อ และในชนบท ผู้หญิงหลายคนจะใช้มือถือหรืออินเทอร์เน็ตได้ ก็ต้องผ่านญาติผู้ชายเท่านั้น",
                  "The interviews help explain those numbers. Many people have stopped trusting TV news, which they see as biased and sensational, and turned to YouTube commentators and WhatsApp groups instead. Older people watch TV without much questioning. Younger people are on social media all day but can't tell what's credible. And in rural areas, many women could reach a phone or the internet only through a male relative.",
                  "จากการคุยเชิงลึก", "In the interviews",
                  "เลิกเชื่อทีวี หันไปยูทูบ และวอตส์แอป · รุ่นใหม่ใช้คล่อง แต่แยกไม่ออก · ผู้หญิงในชนบท ใช้มือถือผ่านญาติผู้ชาย",
                  "Distrust TV, turn to YouTube and WhatsApp · young people fluent but can't judge · rural women reach phones through male relatives"),
            scene("lesson", 21,
                  "บทเรียนสำหรับคนทำโครงการรู้เท่าทันสื่อก็คือ ใช้สื่อคล่อง กับดูสื่อเป็น เป็นคนละเรื่องกัน และการเลิกเชื่อโทรทัศน์ ก็ไม่ได้แปลว่าตรวจข้อมูลเป็น ทีมวิจัยเสนอให้ไปหาผู้ใหญ่ที่ที่ทำงาน และในชุมชน ไม่ใช่แค่ในโรงเรียนกับมหาวิทยาลัย และโครงการที่อยากไปถึงผู้หญิงในชนบท ต้องออกแบบโดยรู้ว่า มือถืออาจอยู่ในมือคนอื่นในบ้าน",
                  "The lesson for anyone running media literacy work: using media fluently and judging it well are two different skills, and giving up on TV is not the same as knowing how to check. The team calls for reaching adults at work and in their communities, not only in schools and universities. And a programme meant for rural women has to be designed knowing the phone may be in someone else's hands.",
                  "บทเรียน", "The lesson",
                  "ใช้คล่อง ไม่เท่ากับดูเป็น · ไปถึงผู้ใหญ่ ที่ทำงานและในชุมชน · มือถืออาจไม่ใช่ของเธอ",
                  "Fluent is not the same as critical · reach adults at work and in communities · the phone may not be hers"),
            scene("caveat", 13,
                  "ข้อควรระวัง กลุ่มที่สำรวจคือคนที่ใช้สื่ออย่างน้อยวันละชั่วโมง ไม่ใช่ผู้ใหญ่ทั้งประเทศ เก็บข้อมูลครั้งเดียว จึงบอกได้ว่าอะไรไปด้วยกัน แต่ไม่ได้บอกว่าอะไรเป็นเหตุ และช่องว่างระหว่างเมืองกับชนบท บทความไม่ได้ทดสอบทางสถิติ",
                  "One caution: the survey covered people who use media at least an hour a day, not every adult. It was a single snapshot, so it shows what goes together, not what causes what. And the paper does not test the gap between city and countryside statistically.",
                  "ข้อควรระวัง", "One caution",
                  "เฉพาะคนที่ใช้สื่อวันละ 1 ชม. ขึ้นไป · เก็บครั้งเดียว บอกความสัมพันธ์ ไม่ใช่เหตุ · ช่องว่างเมือง–ชนบท ไม่มีค่าสถิติ",
                  "Only people using media an hour a day or more · one snapshot: association, not cause · the urban–rural gap is untested"),
            closing(),
        ],
    },
    # ───────────────────────────────────────────────────────────────────────────
    {
        "key": "qatarwe", "batch": 7,
        "slug": "women-entrepreneurs-qatar-social-media",
        "name_th": "ผู้ประกอบการหญิงในกาตาร์กับโซเชียลมีเดีย",
        "name_en": "Women entrepreneurs in Qatar and social media",
        "label": {"th": "งานวิจัย · สื่อสารการตลาด", "en": "Research · Marketing communication"},
        "scenes": [
            scene("hook", 11,
                  "สำหรับผู้หญิงที่อยากเริ่มธุรกิจในกาตาร์ โซเชียลมีเดียเปิดประตูสู่ตลาดได้ง่ายและถูก … แต่ผู้ประกอบการคนหนึ่งเตือนว่า พลาดครั้งเดียว ธุรกิจอาจโดนคว่ำบาตรได้เลย",
                  "For women starting a business in Qatar, social media opens the door to the market, easily and cheaply … but as one entrepreneur warned, a single mistake can get a business boycotted.",
                  "งานวิจัย · สื่อสารการตลาด", "Research · Marketing communication",
                  "เข้าตลาดได้ง่ายและถูก แต่พลาดครั้งเดียว อาจโดนคว่ำบาตร",
                  "An easy, cheap way into the market, but one mistake can mean a boycott"),
            scene("method", 23,
                  "ศูนย์คอมอินโนขอเล่างานของไอชา อัลคุไลฟี และ ดอกเตอร์อิบเตซาม มาซาฮีร์ นักวิจัยรับเชิญของศูนย์ " + STUDENT_TH + " ทีมวิจัยสัมภาษณ์เชิงลึกผู้ประกอบการหญิงในกาตาร์สิบคน ที่ทำธุรกิจหลายขนาด และใช้โซเชียลมีเดียอยู่แล้ว ในเดือนกันยายนถึงตุลาคม สองพันห้าร้อยหกสิบห้า ถามว่าใช้เพราะอะไร ได้อะไร และติดอะไร",
                  "The ComInno Center presents the work of Aisha Al-khulaifi and Dr. Ibtesam Mazahir, an invited researcher at the Center. " + STUDENT_EN + " The research team interviewed ten women entrepreneurs in Qatar in depth, all running businesses of different sizes and already using social media, in September and October twenty twenty-two. The team asked these women why they use it, what they gain, and what gets in the way.",
                  "ทำอะไร", "What was done",
                  "สัมภาษณ์เชิงลึก 10 คน · ผู้ประกอบการหญิงในกาตาร์ · ธุรกิจหลายขนาด · ก.ย.–ต.ค. 2565",
                  "In-depth interviews with 10 · women entrepreneurs in Qatar · businesses of all sizes · Sept–Oct 2022"),
            scene("finding", 20,
                  "เหตุผลที่ใช้ตรงไปตรงมา สะดวก ติดต่อลูกค้าได้ในคลิกเดียว คุ้มที่สุดเมื่อเทียบกับโฆษณาแบบอื่น และเปิดโอกาสทางธุรกิจ สิ่งที่ได้กลับมา คือแบรนด์เป็นที่รู้จัก คุยกับลูกค้าได้แม้นอกเวลาทำการ ขยายกิจการ และเพิ่มยอดขาย ส่วนช่องทางที่ลูกค้าของพวกเธอใช้มากที่สุด คืออินสตาแกรมกับสแนปแชต",
                  "Their reasons were simple. It's convenient, reaching a customer in one click. It's the most cost-effective advertising they have. And it opens doors. What they got back was a brand people recognise, conversations with customers even after hours, a bigger business and more sales. And the platforms their customers used most were Instagram and Snapchat.",
                  "ใช้เพราะอะไร ได้อะไร", "Why they use it",
                  "สะดวก · คุ้มที่สุด · เปิดโอกาส · คุยกับลูกค้าได้นอกเวลาทำการ · ลูกค้าอยู่บนอินสตาแกรม และสแนปแชต",
                  "Convenient · most cost-effective · opens doors · reach customers after hours · customers on Instagram and Snapchat"),
            scene("finding", 14,
                  "ส่วนที่ยาก ไม่ใช่การโพสต์ แต่คือการสร้างผู้ติดตามจากศูนย์ โดยเฉพาะธุรกิจที่เพิ่งเริ่ม การรักษาความเป็นมืออาชีพ เมื่อเจอความเห็นเชิงลบหรือคำร้องเรียน และการดูแลชื่อเสียง ที่พลาดครั้งเดียวก็เสียหายได้",
                  "The hard part wasn't posting. It was building an audience from nothing, especially for a new business; staying professional in the face of negative comments and complaints; and protecting a reputation that one misstep could damage.",
                  "ติดอะไร", "What gets in the way",
                  "สร้างผู้ติดตามจากศูนย์ · รับมือความเห็นเชิงลบ · ดูแลชื่อเสียง",
                  "Building an audience from zero · handling negative comments · protecting a reputation"),
            scene("finding", 20,
                  "วิธีรับมือที่พวกเธอใช้จริง คือวางกติกาให้ทีมว่า ต้องตอบเร็วแค่ไหน ด้วยน้ำเสียงแบบไหน และความเห็นแบบไหนที่ต้องตอบ แล้วเฝ้าดูตลอด ตอบเร็ว ยอมรับเมื่อพลาด และแบ่งปันรีวิวที่ดีของลูกค้า ผู้หญิงกลุ่มนี้ยังมองว่า โซเชียลมีเดียเป็นพื้นที่ที่ข้ามเส้นแบ่งทางเพศ และปลอดภัยพอจะทำธุรกิจได้ ในโลกธุรกิจที่ผู้ชายครองพื้นที่",
                  "How they coped: clear rules for the team on how fast to reply, in what tone, and which comments need an answer. Then watching constantly, replying fast, owning mistakes and sharing good customer reviews. They also saw social media as a space that cuts across gender lines, where it felt safe to do business in a market dominated by men.",
                  "รับมืออย่างไร", "How they cope",
                  "กติกาเรื่องเวลาและน้ำเสียง ในการตอบ · ตอบเร็ว ยอมรับผิด · แบ่งปันรีวิวที่ดี · พื้นที่ข้ามเส้นแบ่งทางเพศ",
                  "Rules on reply time and tone · reply fast, own mistakes · share good reviews · a space across gender lines"),
            scene("lesson", 20,
                  "บทเรียนสำหรับหน่วยงานที่ส่งเสริมผู้ประกอบการหญิง คือโซเชียลมีเดียลดกำแพงเข้าตลาดได้จริง แต่สิ่งที่ผู้ประกอบการรู้สึกเปราะที่สุด คือการรับมือคำวิจารณ์ และการดูแลชื่อเสียง การอบรมจึงควรสอนเรื่องนี้ด้วย ไม่ใช่แค่เทคนิคเพิ่มยอดผู้ติดตาม ทีมวิจัยยังเสนอให้ใส่การรู้เท่าทันสื่อ ไว้ในหลักสูตรฝึกผู้ประกอบการ",
                  "The lesson for anyone supporting women entrepreneurs: social media really does lower the barrier to the market, but what these women felt most exposed on was handling criticism and protecting their reputation. So training should cover that, not only how to grow a following. The research team also recommends building media literacy into entrepreneurship programmes.",
                  "บทเรียน", "The lesson",
                  "สิ่งที่เปราะที่สุด ไม่ใช่การโพสต์ · คือคำวิจารณ์และชื่อเสียง · อบรมเรื่องนี้ด้วย ไม่ใช่แค่ยอดผู้ติดตาม",
                  "The weak spot isn't posting · it's criticism and reputation · train for that, not only for followers"),
            scene("caveat", 14,
                  "ข้อควรระวัง นี่คือการสัมภาษณ์สิบคนในประเทศเดียว ส่วนใหญ่เป็นคนรุ่นใหม่ จึงบอกได้ว่าคนกลุ่มนี้เจออะไร ไม่ใช่ว่าเรื่องนี้พบบ่อยแค่ไหน และแม้การรู้เท่าทันสื่อจะอยู่ในชื่อเรื่อง แต่ผลการสัมภาษณ์ไม่ได้แยกเรื่องนี้ออกมาโดยตรง",
                  "One caution: this is ten interviews in one country, mostly with younger entrepreneurs, so it shows what these women experienced, not how common it is. And although media literacy is in the title, the interview results don't single it out directly.",
                  "ข้อควรระวัง", "One caution",
                  "สัมภาษณ์ 10 คน ประเทศเดียว · ส่วนใหญ่อายุน้อย · ผลไม่ได้แยก เรื่องการรู้เท่าทันสื่อ",
                  "10 interviews, one country · mostly younger · results don't isolate media literacy"),
            closing(),
        ],
    },
]
