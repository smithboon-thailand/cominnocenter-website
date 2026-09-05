#!/usr/bin/env python3
"""สตอรี่บอร์ด + บทฉบับ 2 (เกลาภาษาให้เป็นธรรมชาติ) ของวิดีโอนำร่อง 3 เรื่อง × ไทย/อังกฤษ

ไฟล์นี้เป็นแหล่งความจริงเดียว — รันแล้วได้
  storyboard.html        หน้าอ่านสำหรับผู้ใช้ตรวจ/อนุมัติ
  storyboard.json        ข้อมูลให้ pipeline (make_specs/build) ใช้ต่อ
  scripts-pilot-v2.md    บทพากย์ฉบับ 2 อ่านง่าย

กติกาภาพ (BRAND.md E3): วัตถุเดียวเป็นอุปมา · สองสีต่อภาพ · พื้นกระดาษครีม · ไม่มีตัวอักษร ไม่มีคน ไม่มีมือ
บทเรียน PR #46: gemini-3-pro-image นับวัตถุเกินสี่ชิ้นไม่แม่น ทุกแนวคิดจึงมีวัตถุไม่เกินสี่ชิ้น (แถบบางจำนวนมากถือเป็นพื้นผิว ไม่ต้องนับ)
กติกาเสียง (edu-story-audio): ตัวเลขในเสียงเป็นคำอ่าน · ไม่มีปีในเสียง · ไม่ใช้ ๆ และ ฯ ในบทพากย์เพราะ TTS อ่านไม่นิ่ง
"""
import base64, html, json, os

HERE = os.path.dirname(os.path.abspath(__file__))
def _find_repo():
    """คลังเว็บ: ถ้าไฟล์นี้อยู่ใน scripts/video/ ของคลังให้ใช้คลังนั้น ไม่งั้นใช้ตัวแปร COMINNO_REPO หรือที่อยู่มาตรฐานของเซสชัน remote"""
    here = os.path.dirname(os.path.abspath(__file__))
    cand = os.path.abspath(os.path.join(here, "..", ".."))
    if os.path.exists(os.path.join(cand, "package.json")):
        return cand
    return os.environ.get("COMINNO_REPO", "/home/user/cominnocenter-website")


REPO = _find_repo()
IMG_DIR = os.path.join(REPO, "public/images/research/summaries")

CLOSING = {
    "th": "นี่คือหนึ่งในงานวิจัยของศูนย์คอมอินโน คณะนิเทศศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย อ่านบทสรุปและบทความฉบับเต็ม พร้อมช่องทางร่วมงานกับเรา ได้ที่ คอมอินโนเซ็นเตอร์ ดอท คอม",
    "en": "This is one of the studies from the ComInno Center, Faculty of Communication Arts, Chulalongkorn University. Read the summary, the full article, and how to work with us at cominnocenter dot com.",
}

# คู่สีต่อคลิป — อ่านจากภาพประจำบทความที่มีอยู่แล้ว เพื่อให้ภาพใหม่กลมกลืน
PALETTE = {
    "dengue": {"object": "warm amber-yellow", "shadow": "deep teal", "obj_hex": "#E0A83E", "sh_hex": "#1F6B72",
               "shadow_style": "clean flat-edged shadows to the lower right rendered as solid deep-teal shapes, like cut paper rather than soft photographic shadows"},
    "elephant": {"object": "deep teal", "shadow": "warm amber-yellow", "obj_hex": "#1F6B72", "sh_hex": "#E0A83E",
                 "shadow_style": "clean flat-edged shadows to the lower right rendered as solid warm amber-yellow shapes, like cut paper rather than soft photographic shadows"},
    "anime": {"object": "soft coral pink", "shadow": "warm amber-orange", "obj_hex": "#E5967D", "sh_hex": "#E8A15A",
              "shadow_style": "soft warm amber-orange shadows to the lower right, as in a real studio photograph of paper on a table"},
}

PROMPT_HEAD = ("A minimal paper-craft still life photographed from a slightly raised three-quarter angle, 16:9 widescreen, "
               "on a plain warm cream paper background (#F7F6F2) that fills the whole frame.\n\nThe subject: ")
PROMPT_TAIL = ("\n\nLighting and finish: soft even studio light from the upper left, matte handmade paper with visible fold creases "
               "and gentle self-shadowing on the folds. The pieces cast {shadow_style}.\n\n"
               "Exactly two colours besides the cream ground: {object} for every paper piece, {shadow} for the cast shadows. "
               "Generous empty cream space around the group, with the subject sitting in the centre-right of the frame and the left third left empty. "
               "No text, no letters, no numbers, no people, no hands, no faces, no logos, no extra props.")


def prompt(clip, subject):
    p = PALETTE[clip]
    return PROMPT_HEAD + subject + PROMPT_TAIL.format(**p)


# ---------------------------------------------------------------------------
# ข้อมูลสตอรี่บอร์ด — ฉากละหนึ่งย่อหน้าพากย์ · label/text = ข้อความบนจอ · visual_th = แนวคิดภาพ (ไทย) · subject = ส่วน "The subject" ของ prompt
# secs = ความยาวโดยประมาณจากเสียงฉบับ 1 (ไทย/อังกฤษ) ใช้กะจังหวะเท่านั้น ของจริงคำนวณจากเสียงใหม่
# ---------------------------------------------------------------------------
CLIPS = [
    {
        "key": "dengue",
        "slug": "dengue-media-exposure-longitudinal",
        "name_th": "ไข้เลือดออก — สื่อไปถึงคนมากขึ้น แต่คนลงมือน้อยลง",
        "name_en": "Dengue — more reach, less action",
        "label": {"th": "งานวิจัย · การสื่อสารสุขภาพ", "en": "Research · Health communication"},
        "scenes": [
            {
                "role": "hook", "secs": (7.1, 8.8), "image": "existing",
                "narr": {"th": "สื่อรณรงค์เรื่องไข้เลือดออกไปถึงคนไทยมากขึ้นทุกปี … แล้วทำไมคนถึงกำจัดลูกน้ำกันน้อยลง",
                         "en": "Dengue messaging reaches more Thai people every year … so why are fewer of them clearing the places mosquitoes breed?"},
                "label": {"th": "งานวิจัย · การสื่อสารสุขภาพ", "en": "Research · Health communication"},
                "text": {"th": "สื่อเรื่องไข้เลือดออก ไปถึงคนมากขึ้นทุกปี แต่ความรู้และการกำจัดลูกน้ำ ไม่ได้ตามไปด้วย",
                         "en": "Dengue messaging reached more people every year, but knowledge and weekly larva control did not follow"},
                "visual_th": "ภาพประจำบทความ (มีแล้ว): แท่งกระดาษสามแท่งไต่สูงขึ้น แท่งที่สี่ล้มนอน — เข้าถึงมากขึ้น แต่การลงมือล้ม",
                "subject": None,
            },
            {
                "role": "method", "secs": (11.7, 17.1), "image": "new",
                "narr": {"th": "ทีมวิจัยจากคณะนิเทศศาสตร์ จุฬาฯ ร่วมกับนักวิจัยจากกระทรวงสาธารณสุข สำรวจคนไทยกว่าเจ็ดพันคน ในยี่สิบห้าจังหวัด ติดต่อกันสามปี โดยมีการระบาดใหญ่เกิดขึ้นคั่นกลาง",
                         "en": "A research team from Chulalongkorn's Faculty of Communication Arts, together with researchers from the Ministry of Public Health, surveyed more than seven thousand people in twenty-five provinces, over three consecutive years, with a major outbreak in the middle."},
                "label": {"th": "ทำอะไร", "en": "What was done"},
                "text": {"th": "สำรวจ 7,772 คน · 25 จังหวัด · 3 ปี", "en": "7,772 people · 25 provinces · 3 years"},
                "visual_th": "แผ่นกระดาษพับสามใบตั้งเรียงกันเหมือนหน้าปฏิทินสามปี มียอดแหลมกระดาษสูงโผล่ขึ้นระหว่างใบที่หนึ่งกับใบที่สอง — การระบาดใหญ่ที่คั่นกลาง",
                "subject": "exactly THREE identical folded paper cards standing upright in a row with small gaps, like three calendar pages seen from the side. Rising between the first and the second card, one tall narrow paper spike, sharp at the top, taller than the cards. Four pieces in total: three cards and one spike. Nothing else.",
            },
            {
                "role": "finding", "secs": (8.9, 12.4), "image": "new",
                "narr": {"th": "ผลที่ออกมาฟังดูขัดกัน คนเห็นข่าวสารเรื่องไข้เลือดออกบ่อยขึ้นทุกปีจริง แต่ความรู้ดีขึ้นแค่ปีเดียว แล้วก็ตกลงมาเท่าเดิม",
                         "en": "The results point in opposite directions. People did see dengue information in the media more often each year. But their knowledge improved for only one year, then slipped back to where it started."},
                "label": {"th": "พบอะไร", "en": "What was found"},
                "text": {"th": "เห็นสื่อบ่อยขึ้นทุกปี แต่ความรู้ขึ้นแค่ปีเดียว แล้วตกกลับ",
                         "en": "Exposure rose every year. Knowledge rose for one year, then fell back"},
                "visual_th": "ริบบิ้นกระดาษสองเส้น เส้นบนไต่สูงขึ้นเรื่อยไปทางขวา เส้นล่างไต่ขึ้นแล้วหักลงกลับที่เดิม",
                "subject": "exactly TWO long paper ribbons standing on their edges, both starting at the left and running to the right. The upper ribbon climbs steadily higher all the way to the right edge. The lower ribbon climbs for a short stretch, then bends and comes back down to its starting height. Two ribbons only, nothing else.",
            },
            {
                "role": "finding", "secs": (8.3, 10.4), "image": "new",
                "narr": {"th": "ความเข้าใจผิดข้อใหญ่ที่สุดยังอยู่ครบ มีคนแค่ราวหนึ่งในสามที่รู้ว่า ยุงลายไม่ได้วางไข่ในน้ำเน่าน้ำสกปรก",
                         "en": "The biggest misconception survived untouched: only about one person in three knew that the dengue mosquito does not breed in dirty, smelly water."},
                "label": {"th": "ความเข้าใจผิดที่ฝังแน่น", "en": "The stubborn misconception"},
                "text": {"th": "มีเพียง 1 ใน 3 ที่รู้ว่า ยุงลายไม่ได้วางไข่ในน้ำสกปรก",
                         "en": "Only 1 in 3 knew the dengue mosquito does not breed in dirty water"},
                "visual_th": "หยดน้ำกระดาษพับสามหยดเรียงกัน สองหยดสีอำพัน หยดเดียวสีเขียวเข้ม — หนึ่งในสามที่รู้",
                "subject": "exactly THREE folded paper water-drop shapes standing upright in a row, evenly spaced, all the same size. Two of them are warm amber-yellow; the one on the left is deep teal, the same colour as the shadows. Three drops in total, nothing else.",
            },
            {
                "role": "finding", "secs": (8.6, 9.7), "image": "new",
                "narr": {"th": "ที่น่าห่วงกว่านั้น คนที่กำจัดแหล่งเพาะพันธุ์ยุงทุกสัปดาห์อย่างที่รณรงค์กัน ลดจากราวหกในสิบ เหลือไม่ถึงครึ่ง",
                         "en": "More worrying still, the share of people clearing breeding sites every week, as the campaigns ask, fell from about six in ten to under half."},
                "label": {"th": "การลงมือทำถอยหลัง", "en": "Action went backwards"},
                "text": {"th": "กำจัดแหล่งเพาะพันธุ์ทุกสัปดาห์ ลดจาก 61% เหลือ 48%",
                         "en": "Weekly clearing of breeding sites fell from 61% to 48%"},
                "visual_th": "ลูกศรกระดาษเส้นเดียวพุ่งไปข้างหน้าแล้วโค้งกลับหลังเป็นรูปยูเทิร์น",
                "subject": "ONE single folded paper arrow lying on the ground: it starts at the left, runs forward to the right, then curves around in a tight U-turn and points back towards the left, ending with a clean arrowhead. One continuous piece, nothing else.",
            },
            {
                "role": "conclusion", "secs": (9.8, 10.4), "image": "new",
                "narr": {"th": "ผู้วิจัยสรุปชัดเจนว่า รณรงค์ผ่านสื่อให้คนตระหนักอย่างเดียว โดยไม่มีชุมชนลงมือทำด้วย คุมโรคไม่อยู่",
                         "en": "The authors are blunt about it. A media campaign that only raises awareness, with no community doing the work on the ground, did not control the disease."},
                "label": {"th": "ข้อสรุปของผู้วิจัย", "en": "The authors' conclusion"},
                "text": {"th": "สร้างความตระหนักอย่างเดียว โดยไม่มีชุมชนลงมือ คุมโรคไม่อยู่",
                         "en": "Awareness alone, without community action, did not control the disease"},
                "visual_th": "กรวยโทรโข่งกระดาษใบใหญ่ทางซ้าย ปากกรวยหันไปทางขวา ไกลออกไปมีลูกบาศก์กระดาษเล็กสามลูกเกาะกลุ่ม ตรงกลางเว้นว่าง — เสียงไปไม่ถึง",
                "subject": "a large folded paper megaphone cone lying on its side at the left, wide mouth facing right. Far to the right, a tight cluster of exactly THREE small paper cubes. A wide empty stretch of cream ground between the cone and the cubes. Four pieces in total, nothing else.",
            },
            {
                "role": "lesson", "secs": (14.5, 14.5), "image": "new",
                "narr": {"th": "บทเรียนสำหรับคนทำงานสื่อสารสุขภาพก็คือ ข้อความไปถึงคนมากแค่ไหน ไม่ได้แปลว่าสำเร็จ ต้องรู้ก่อนว่าคนเข้าใจผิดตรงไหน แล้วพูดให้ตรงจุดนั้น และเอางานสื่อไปผูกกับงานในชุมชน ที่ทำให้คนลงมือทำจริง",
                         "en": "For anyone in health communication, the lesson is that reach is not success. Find out what people actually get wrong, speak to that directly, and tie your media work to the community programmes that get people to act."},
                "label": {"th": "บทเรียน", "en": "The lesson"},
                "text": {"th": "การเข้าถึงไม่ใช่ความสำเร็จ · พูดให้ตรงจุดที่คนเข้าใจผิด · ผูกงานสื่อกับงานชุมชน",
                         "en": "Reach is not success · Speak to what people get wrong · Tie media to community work"},
                "visual_th": "ริบบิ้นกระดาษสองเส้นผูกกันเป็นปมเดียวตรงกลาง — ผูกงานสื่อเข้ากับงานชุมชน",
                "subject": "exactly TWO paper ribbons tied together into ONE simple knot at the centre of the frame, the loose ends of both ribbons trailing away to the left and to the right. One knot, two ribbons, nothing else.",
            },
            {
                "role": "closing", "secs": (13.7, 15.2), "image": "logo",
                "narr": CLOSING,
                "label": None, "text": None,
                "visual_th": "การ์ดปิดประจำชุด: โลโก้ + ชื่อศูนย์ฯ เต็ม + cominnocenter.com (ไม่ต้องเจนภาพ)",
                "subject": None,
            },
        ],
    },
    {
        "key": "elephant",
        "slug": "elephant-tales-sensory-exhibition",
        "name_th": "นิทรรศการช้าง — ให้จับ ดม ฟัง ชิม แล้วจำได้อีกปีครึ่ง",
        "name_en": "Elephant exhibition — touch, smell, hear, taste",
        "label": {"th": "งานวิจัย · การสื่อสารสิ่งแวดล้อม", "en": "Research · Environmental communication"},
        "scenes": [
            {
                "role": "hook", "secs": (6.6, 8.4), "image": "existing",
                "narr": {"th": "จะทำอย่างไรให้คนไม่ใช่แค่รู้เรื่องช้างไทย แต่รู้สึกกับมันจริง … แล้วยังจำได้ไปอีกเป็นปี",
                         "en": "How do you get people to do more than know about Thai elephants … to feel something, and still remember it a year later?"},
                "label": {"th": "งานวิจัย · การสื่อสารสิ่งแวดล้อม", "en": "Research · Environmental communication"},
                "text": {"th": "นิทรรศการที่ให้จับ ดม ฟัง และชิม ทำให้คนตระหนักเรื่องช้างมากขึ้น และยังจำได้อีกปีครึ่งให้หลัง",
                         "en": "An exhibition you could touch, smell, hear and taste raised awareness about elephants, and was still remembered a year and a half later"},
                "visual_th": "ภาพประจำบทความ (มีแล้ว): ดาวกระดาษเตี้ยทอดเงายาวสุดเฟรม — ประสบการณ์สั้น ความทรงจำยาว",
                "subject": None,
            },
            {
                "role": "method", "secs": (14.9, 15.0), "image": "new",
                "narr": {"th": "คณะผู้วิจัยจัดนิทรรศการศิลปะสองวันในคอมมูนิตี้มอลล์ ออกแบบให้ผู้ชมใช้ประสาทสัมผัสครบทั้งห้า มีประติมากรรมให้จับ มีกลิ่นป่า มีเสียงช้างที่อัดมาจากของจริง และมีไอศกรีมรสผลไม้ที่ช้างชอบกิน",
                         "en": "The research team staged a two-day art exhibition in a community mall, built for all five senses: sculptures you could touch, the scent of a forest, recordings of real elephants, and ice cream in the fruit flavours elephants love."},
                "label": {"th": "ทำอะไร", "en": "What was done"},
                "text": {"th": "นิทรรศการ 2 วัน · ประสาทสัมผัสทั้ง 5 · ผู้ชมราว 300 คน",
                         "en": "A 2-day exhibition · all 5 senses · around 300 visitors"},
                "visual_th": "โคนไอศกรีมกระดาษหนึ่งอันตั้งอยู่ ข้างกันมีลูกบาศก์กระดาษเล็กหนึ่งลูก (ประติมากรรมให้จับ) และแถบกระดาษบางโค้งเป็นคลื่นเสียงหนึ่งเส้นทางขวา",
                "subject": "a folded paper ice-cream cone standing upright with one round paper scoop on top, at the centre. To its left, one small folded paper cube. To its right, one thin paper strip standing on its edge and bent into a gentle wave, like a sound wave. Three pieces in total, nothing else.",
            },
            {
                "role": "finding", "secs": (10.7, 12.2), "image": "new",
                "narr": {"th": "ผู้ชมกว่าสองร้อยคนตอบแบบสอบถามหลังดูงาน ใครที่รู้สึกว่าได้เล่น ได้สัมผัสกับงานมาก ก็บอกว่าตัวเองตระหนักเรื่องช้างมากขึ้นตามไปด้วย",
                         "en": "More than two hundred visitors filled in a questionnaire afterwards. The more hands-on the exhibition felt to them, the more they said it had raised their awareness of elephants."},
                "label": {"th": "พบอะไร", "en": "What was found"},
                "text": {"th": "ยิ่งรู้สึกว่าได้โต้ตอบกับงาน ยิ่งตระหนักเรื่องช้างมากขึ้น (r = 0.64)",
                         "en": "The more hands-on it felt, the more awareness grew (r = 0.64)"},
                "visual_th": "ริบบิ้นกระดาษสองเส้นไต่ขึ้นเฉียงไปทางขวาบนขนานกัน เส้นหนึ่งหนา เส้นหนึ่งบาง — สองอย่างไปด้วยกัน",
                "subject": "exactly TWO paper ribbons standing on their edges, side by side and parallel, both climbing diagonally from the lower left to the upper right at the same angle. One ribbon is wide, the other narrow. Two ribbons only, nothing else.",
            },
            {
                "role": "finding", "secs": (11.5, 14.8), "image": "new",
                "narr": {"th": "ราวปีครึ่งให้หลัง ผู้วิจัยโทรกลับไปถามผู้ชมกลุ่มหนึ่ง ทุกคนยังจำภาพและรสชาติได้ ส่วนใหญ่จำเสียงช้างได้ แต่แทบไม่มีใครจำกลิ่นได้เลย",
                         "en": "About a year and a half later, the researchers phoned a small group of those visitors. Everyone still remembered what they saw and what they tasted. Most remembered the elephant sounds. Almost nobody remembered the scent."},
                "label": {"th": "ปีครึ่งให้หลัง", "en": "A year and a half later"},
                "text": {"th": "ทุกคนจำภาพและรสชาติได้ · 5 ใน 6 จำเสียงได้ · 1 ใน 6 จำกลิ่นได้",
                         "en": "All remembered sight and taste · 5 of 6 the sounds · 1 of 6 the scent"},
                "visual_th": "แท่งกระดาษพับสี่แท่งเรียงแถว สองแท่งแรกสูงเท่ากัน แท่งที่สามเตี้ยลง แท่งที่สี่แบนแทบติดพื้น — ภาพ รส เสียง กลิ่น",
                "subject": "exactly FOUR upright folded paper blocks of the same width standing in a row from left to right. The first two are tall and equal in height. The third is clearly shorter. The fourth is a thin flat slab, barely rising above the ground. Count them: four blocks. Nothing else.",
            },
            {
                "role": "finding", "secs": (6.8, 7.6), "image": "new",
                "narr": {"th": "ที่คนจำได้ คือของที่ไม่เคยเจอในนิทรรศการทั่วไป ไอศกรีม กับประติมากรรมที่จับได้",
                         "en": "What stayed with people was whatever an ordinary exhibition doesn't have: the ice cream, and the sculptures you could touch."},
                "label": {"th": "อะไรที่คนจำได้", "en": "What stuck"},
                "text": {"th": "ของที่นิทรรศการทั่วไปไม่มี: ไอศกรีม และประติมากรรมที่จับได้",
                         "en": "What an ordinary exhibition doesn't have: the ice cream, and sculptures you could touch"},
                "visual_th": "แผ่นกระดาษสี่เหลี่ยมแบนสามแผ่นเรียงแถวเหมือนกรอบรูปบนผนัง มีโคนไอศกรีมกระดาษหนึ่งอันตั้งแทรกอยู่ในแถว — สิ่งที่ต่างออกไปคือสิ่งที่ถูกจำ",
                "subject": "exactly THREE identical flat rectangular paper sheets standing upright in a row like framed pictures on a wall, and standing among them, in the third position, ONE folded paper ice-cream cone with a round scoop, the only object that is not a rectangle. Four pieces in total, nothing else.",
            },
            {
                "role": "lesson", "secs": (15.5, 13.6), "image": "new",
                "narr": {"th": "บทเรียนสำหรับงานสื่อสารเรื่องสิ่งแวดล้อมก็คือ ให้คนได้จับ ได้ชิม ได้ฟัง ความทรงจำจะอยู่นานกว่าดูรูปแล้วอ่านป้ายมาก และไม่ต้องใช้เงินมาก ส่วนกลิ่น ถ้าจะลงทุน ต้องทำให้เด่นกว่านี้มาก",
                         "en": "For environmental communication, the lesson is simple. Let people touch, taste and listen, and the memory outlasts anything they read on a wall, at modest cost. And if you invest in scent, make it far more prominent than this."},
                "label": {"th": "บทเรียน", "en": "The lesson"},
                "text": {"th": "ให้จับ ชิม ฟัง ความทรงจำอยู่นานกว่าดูรูปอ่านป้าย และต้นทุนไม่สูง",
                         "en": "Touch, taste and sound outlast pictures and captions, at modest cost"},
                "visual_th": "ลูกบาศก์กระดาษพับตั้งอยู่ทอดเงายาวมาก กับแผ่นกระดาษแบนวางราบข้างกันแทบไม่มีเงา — ของที่จับได้ทิ้งความทรงจำยาว",
                "subject": "exactly TWO pieces: at the left, one folded paper cube standing upright and casting a very long shadow that stretches far to the right; beside it, one flat rectangular paper sheet lying flat on the ground, casting almost no shadow at all. Two pieces only, nothing else.",
            },
            {
                "role": "caveat", "secs": (5.6, 6.0), "image": "new",
                "narr": {"th": "ข้อควรระวังอย่างหนึ่ง งานนี้วัดว่าคนตระหนักมากขึ้นไหม ไม่ได้วัดว่าใครเปลี่ยนพฤติกรรมหรือเปล่า",
                         "en": "One caution: the study measured awareness, not whether anyone went on to change their behaviour."},
                "label": {"th": "ข้อควรระวัง", "en": "One caution"},
                "text": {"th": "วัดความตระหนัก ไม่ได้วัดการเปลี่ยนพฤติกรรม", "en": "Measured awareness, not behaviour change"},
                "visual_th": "ดอกจันกระดาษพับหนึ่งดอก (แถบกระดาษสามเส้นไขว้กัน) — สัญลักษณ์ประจำฉากข้อควรระวังทุกคลิป",
                "subject": "ONE folded paper asterisk: exactly three short paper strips of equal length crossing at a single centre point to form a six-armed star, lying flat at the centre of the frame. One object, nothing else.",
            },
            {
                "role": "closing", "secs": (14.3, 13.6), "image": "logo",
                "narr": CLOSING, "label": None, "text": None,
                "visual_th": "การ์ดปิดประจำชุด (ไม่ต้องเจนภาพ)", "subject": None,
            },
        ],
    },
    {
        "key": "anime",
        "slug": "anime-thai-gen-z",
        "name_th": "อนิเมะกับเจนซี — ฟีดทำให้ค้นเจอ เพื่อนทำให้ตัดสินใจ",
        "name_en": "Anime and Gen Z — the feed discovers, friends decide",
        "label": {"th": "งานวิจัย · วัฒนธรรมแฟนและเจนซี", "en": "Research · Fan culture and Gen Z"},
        "scenes": [
            {
                "role": "hook", "secs": (7.8, 7.3), "image": "existing",
                "narr": {"th": "เมื่อก่อน ชอบอนิเมะแล้วโดนมองว่าแปลก วันนี้กลายเป็นเรื่องธรรมดาของคนเจนซี … มันแทรกเข้ามาทางไหน",
                         "en": "Liking anime used to make you the odd one out in Thailand. For Gen Z it's simply normal … so how did it get there?"},
                "label": {"th": "งานวิจัย · วัฒนธรรมแฟนและเจนซี", "en": "Research · Fan culture and Gen Z"},
                "text": {"th": "อนิเมะเข้ากระแสหลักในเจนซีไทย ผ่านคำบอกต่อของเพื่อนสนิท ฟีดทำให้ค้นเจอ แต่ไม่ได้ทำให้ตัดสินใจ",
                         "en": "Anime went mainstream among Thai Gen Z through close friends' word of mouth. The feed makes discoveries, not decisions"},
                "visual_th": "ภาพประจำบทความ (มีแล้ว): แถบกระดาษกางเป็นพัดกว้าง (ฟีด) กับลูกบาศก์สามลูกเกาะกลุ่ม (วงเพื่อน)",
                "subject": None,
            },
            {
                "role": "method", "secs": (9.9, 10.0), "image": "new",
                "narr": {"th": "ผู้วิจัยนั่งคุยเชิงลึกกับคนในวงการยี่สิบสามคนในกรุงเทพ ทั้งคนจัดงาน คนทำคอนเทนต์ แฟนทั่วไป และแฟนสายลึก งานนี้ต่อยอดจากผลงานวิจัยของนิสิตคณะนิเทศศาสตร์ โดยมีอาจารย์ของศูนย์คอมอินโนเป็นที่ปรึกษา",
                         "en": "The researchers sat down with twenty-three people inside the Bangkok scene: event organisers, content creators, casual fans, and the serious, deep-cut fans. The study grew out of a student's research project at the Faculty of Communication Arts, supervised by a ComInno Center lecturer."},
                "label": {"th": "ทำอะไร", "en": "What was done"},
                "text": {"th": "สัมภาษณ์เชิงลึก 23 คนในกรุงเทพฯ · 4 กลุ่มในวงการ",
                         "en": "23 in-depth interviews in Bangkok · 4 groups inside the scene"},
                "visual_th": "กรอบคำพูดกระดาษสองอันหันเข้าหากัน อันหนึ่งใหญ่ อันหนึ่งเล็ก — การนั่งคุย",
                "subject": "exactly TWO folded paper speech-bubble shapes standing upright and facing each other, one large on the left and one smaller on the right, with a small gap between their pointed tails. Two pieces only, nothing else.",
            },
            {
                "role": "finding", "secs": (11.0, 13.5), "image": "new",
                "narr": {"th": "เกือบทุกคนเจอเรื่องใหม่จากฟีดติ๊กต็อก แต่แทบไม่มีใครเริ่มดูเพราะฟีดอย่างเดียว ที่ทำให้ตัดสินใจเปิดดูจริง คือเพื่อนสนิทบอกว่าเรื่องนี้ดี",
                         "en": "Almost all of them find new titles on their TikTok feed. But hardly anyone starts watching because of the feed alone. What actually gets them to press play is a close friend saying: you have to see this one."},
                "label": {"th": "พบอะไร", "en": "What was found"},
                "text": {"th": "20 จาก 23 เจอเรื่องใหม่จาก TikTok · 21 จาก 23 เริ่มดูเพราะเพื่อนสนิท",
                         "en": "20 of 23 discover on TikTok · 21 of 23 start watching because of a close friend"},
                "visual_th": "แถบกระดาษบางจำนวนมากโปรยกระจัดกระจายทางซ้าย มีเส้นเดียวถูกดึงออกมาวางตรง ชี้ไปหาลูกบาศก์กระดาษสองลูกที่ยืนชิดกันทางขวา",
                "subject": "many thin paper strips scattered loosely in a heap at the left. One single strip has been pulled out of the heap and lies straight, pointing to the right, where exactly TWO folded paper cubes stand close together, touching. The heap of strips is texture; the countable objects are one straight strip and two cubes. Nothing else.",
            },
            {
                "role": "finding", "secs": (7.5, 8.4), "image": "new",
                "narr": {"th": "อินฟลูเอนเซอร์ดัง คนดูจะระแวงว่ากำลังรับงานโปรโมตอยู่หรือเปล่า ส่วนคนที่รู้ลึกรู้จริงในแนวนั้น กลับได้ความไว้ใจ",
                         "en": "Big influencers are met with suspicion: are they being paid to say this? The people who are trusted are the ones who clearly know a genre inside out."},
                "label": {"th": "ใครถูกไว้ใจ", "en": "Who is trusted"},
                "text": {"th": "อินฟลูเอนเซอร์ดังถูกระแวง คนที่รู้ลึกในแนวนั้นถูกไว้ใจ",
                         "en": "Big influencers are doubted. People who know a genre deeply are trusted"},
                "visual_th": "กรวยกระดาษใบใหญ่แต่บางตั้งอยู่ กับลูกบาศก์กระดาษเล็กแต่ทึบตันข้างกัน ลูกบาศก์เล็กทอดเงายาวกว่า — เสียงดังไม่เท่ากับน้ำหนัก",
                "subject": "exactly TWO pieces: a large, tall but thin hollow paper cone standing upright at the left, and a small solid folded paper cube standing to its right. The small cube casts the longer, stronger shadow; the big cone casts only a short faint one. Two pieces only, nothing else.",
            },
            {
                "role": "finding", "secs": (13.0, 13.0), "image": "new",
                "narr": {"th": "คนที่ดูเงียบ ไม่ออกความเห็น ก็ยังนับเป็นคนในชุมชน ส่วนงานอีเวนต์เป็นเหมือนห้องทดลองตัวตน ที่ได้ปลดปล่อยเป็นคนแบบอื่น แต่ก็มีแรงกดดันเรื่องหน้าตา รูปร่าง และเงินที่ต้องจ่าย มาพร้อมกัน",
                         "en": "Lurkers still count as part of the community. And fan events work like a laboratory for identity: a place to try being someone else, and at the same time a place that piles on pressure about how you look and how much you spend."},
                "label": {"th": "ชุมชน", "en": "The community"},
                "text": {"th": "ดูเงียบๆ ก็นับเป็นสมาชิก · อีเวนต์คือห้องทดลองตัวตน ทั้งปลดปล่อยและกดดัน",
                         "en": "Lurkers count as members · Events are identity laboratories, freeing and pressuring at once"},
                "visual_th": "ลูกบาศก์กระดาษสี่ลูกยืนเป็นวงหันเข้าหากัน ลูกหนึ่งถอยห่างออกไปเล็กน้อยแต่ยังอยู่ในวง — คนดูเงียบก็อยู่ในชุมชน",
                "subject": "exactly FOUR folded paper cubes arranged in a loose circle as if gathered around a table. Three of them stand close together; the fourth stands a little further back from the others but is still clearly part of the circle. Count them: four cubes. Nothing else.",
            },
            {
                "role": "lesson", "secs": (16.7, 16.7), "image": "new",
                "narr": {"th": "บทเรียนสำหรับแบรนด์และองค์กรที่อยากคุยกับคนรุ่นนี้ก็คือ ซื้อพื้นที่บนฟีดได้แค่ให้คนเห็น การตัดสินใจเกิดในวงเพื่อน ซึ่งซื้อไม่ได้ แต่เข้าไปสนับสนุนได้ และคอนเทนต์ที่ดูออกว่าขายของ ทำลายความไว้ใจเร็วมาก",
                         "en": "For brands and organisations trying to reach this generation, buying space on the feed only gets you seen. Decisions happen among friends, which you can't buy, but you can support. And content that looks like selling destroys trust fast."},
                "label": {"th": "บทเรียน", "en": "The lesson"},
                "text": {"th": "ซื้อพื้นที่บนฟีดได้แค่ให้คนเห็น การตัดสินใจเกิดในวงเพื่อน ซื้อไม่ได้ แต่สนับสนุนได้",
                         "en": "The feed gets you seen. Decisions happen among friends: not for sale, but you can support them"},
                "visual_th": "ป้ายราคากระดาษ (สี่เหลี่ยมเจาะรู มีเชือกกระดาษ) วางราบทางซ้าย และลูกบาศก์กระดาษสองลูกเอนพิงกันทางขวา — ซื้อไม่ได้ แต่สนับสนุนได้",
                "subject": "at the left, ONE flat paper price tag lying on the ground: a rectangle with one corner cut off, a small punched hole and a short loop of paper string. At the right, exactly TWO folded paper cubes leaning gently against each other. Three pieces in total, nothing else.",
            },
            {
                "role": "caveat", "secs": (9.5, 11.0), "image": "new",
                "narr": {"th": "ข้อควรระวังอย่างหนึ่ง นี่เป็นงานสัมภาษณ์คนยี่สิบสามคนในกรุงเทพ ตัวเลขบอกได้แค่ว่าประเด็นไหนถูกพูดถึงบ่อยในกลุ่มนี้ ไม่ใช่สัดส่วนของคนทั้งประเทศ",
                         "en": "One caution: this is an interview study of twenty-three people in Bangkok. Its numbers tell you how often a theme came up in that room, not how a whole generation thinks."},
                "label": {"th": "ข้อควรระวัง", "en": "One caution"},
                "text": {"th": "งานเชิงคุณภาพ 23 คนในกรุงเทพฯ ตัวเลขบอกความถี่ในกลุ่มนี้ ไม่ใช่สัดส่วนของคนทั้งประเทศ",
                         "en": "A qualitative study of 23 people in Bangkok. Its numbers describe this group, not the whole generation"},
                "visual_th": "ดอกจันกระดาษพับหนึ่งดอก — สัญลักษณ์ประจำฉากข้อควรระวัง (คู่สีของคลิปนี้)",
                "subject": "ONE folded paper asterisk: exactly three short paper strips of equal length crossing at a single centre point to form a six-armed star, lying flat at the centre of the frame. One object, nothing else.",
            },
            {
                "role": "closing", "secs": (13.9, 13.4), "image": "logo",
                "narr": CLOSING, "label": None, "text": None,
                "visual_th": "การ์ดปิดประจำชุด (ไม่ต้องเจนภาพ)", "subject": None,
            },
        ],
    },
]

# ── ชุดที่ 2 (4 ก.ย. 2569) อยู่ในไฟล์แยกเพื่อให้ไฟล์นี้อ่านได้ · storyboard.json รวมทุกชุด ส่วน HTML/MD แยกตาม --batch
from storyboard_batch2 import CLIPS2, PALETTE2
from storyboard_batch3 import CLIPS3, PALETTE3
from storyboard_batch4 import CLIPS4, PALETTE4
CLIPS += CLIPS2 + CLIPS3 + CLIPS4
PALETTE.update(PALETTE2)
PALETTE.update(PALETTE3)
PALETTE.update(PALETTE4)
for _c in CLIPS:
    _c.setdefault("batch", 1)

ROLE_TH = {"hook": "เปิดเรื่อง", "method": "ทำอะไร", "finding": "พบอะไร", "conclusion": "ข้อสรุป", "lesson": "บทเรียน", "caveat": "ข้อควรระวัง", "closing": "ปิดท้าย"}

IMAGE_PRICE = 0.20
TTS_TH, TTS_EN = 0.16, 0.21  # ราคาเฉลี่ยต่อคลิปจากรอบแรก


def b64img(path):
    with open(path, "rb") as f:
        return "data:image/webp;base64," + base64.b64encode(f.read()).decode()


def thumb_b64(path, width=640):
    """ย่อภาพที่เจนได้เป็น WebP กว้าง 640 แล้วฝังในหน้า (PNG ต้นฉบับใบละ ~1 MB ฝังตรงไม่ได้ 18 ใบเกินเพดาน 16 MB)"""
    import io
    from PIL import Image
    im = Image.open(path).convert("RGB")
    im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.save(buf, "WEBP", quality=80)
    return "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()


# ภาพที่เจนได้แล้วแต่เบี่ยงจากแนวคิด — บอกผู้ใช้ตามที่เห็นจริง ไม่ใช่ตามที่สั่ง (บทเรียน PR #45)
DEVIATIONS = {
    "dengue-03": "ริบบิ้นทั้งสองเส้นไต่ขึ้นไปทางขวา เส้นล่างไม่ได้หักกลับลงมาที่เดิมตามแนวคิด จึงยังไม่ได้เล่าว่า “ความรู้ตกกลับ” — เจนใหม่ได้ในราคา $0.20 ถ้าต้องการ",
    "elephant-03": "ริบบิ้นสองเส้นบิดม้วนขึ้นไปด้วยกัน ไม่ใช่เส้นตรงขนานตามแนวคิด แต่ยังอ่านได้ว่า “สองอย่างไปด้วยกัน”",
    "anime-04": "เงาของลูกบาศก์เล็กไม่ได้ยาวกว่าเงาของกรวยตามแนวคิด แต่ความต่างระหว่างกรวยใหญ่กลวงกับก้อนเล็กทึบยังอ่านได้",
}
ACTUAL_IMG_COST = 0.30 + 17 * 0.20   # ใบทดสอบใบแรกแนบภาพอ้างอิงจึงคิด $0.30
ACTUAL_TTS_COST = 1.24               # จากใบเสร็จของ ElevenLabs รอบนี้ (คลิปยาวกว่าที่ประเมิน)


def build_json():
    out = []
    for c in CLIPS:
        scenes = []
        for i, s in enumerate(c["scenes"], 1):
            scenes.append({
                "n": i, "role": s["role"], "image": s["image"],
                "image_file": (f"{c['key']}-{i:02d}.webp" if s["image"] == "new" else (f"{c['slug']}.webp" if s["image"] == "existing" else None)),
                "narr": s["narr"], "label": s["label"], "text": s["text"],
                "visual_th": s["visual_th"], "prompt": (prompt(c["key"], s["subject"]) if s["subject"] else None),
                "secs_v1": s["secs"],
            })
        out.append({"key": c["key"], "slug": c["slug"], "batch": c.get("batch", 1), "name_th": c["name_th"], "name_en": c["name_en"],
                    "palette": PALETTE[c["key"]], "label": c["label"], "scenes": scenes})
    return out


def write_scripts_md(data, batch=1):
    data = [c for c in data if c.get("batch", 1) == batch]
    if batch != 1:
        L = [f"# บทวิดีโอชุดที่ {batch} — {len(data)} เรื่อง × ไทย/อังกฤษ (รอ lock)", "",
             "กติกา: ศูนย์ฯ เป็นผู้เล่า ไม่ใช่ผู้ทำ · เลขเป็นคำอ่าน · ไม่มี ๆ ฯ ในเสียง · ข้อเท็จจริงตรงกับบทสรุปบนเว็บ", ""]
        for c in data:
            L += [f"## {c['name_th']}", ""]
            for lang, head in (("th", "### ไทย"), ("en", "### English")):
                L += [head, ""]
                for sc in c["scenes"]:
                    L += [sc["narr"][lang], ""]
            L += ["---", ""]
        open(os.path.join(HERE, f"scripts-batch{batch}.md"), "w", encoding="utf-8").write("\n".join(L))
        return
    L = ["# บทวิดีโอนำร่อง 3 เรื่อง × ไทย/อังกฤษ — ฉบับ 2 (เกลาภาษาให้เป็นธรรมชาติ · รอ lock)", "",
         "เปลี่ยนจากฉบับ 1: เลี่ยงสำนวนแปล (\"การเปิดรับสื่อ\" → \"เห็นข่าวสารบ่อยขึ้น\" · \"สิ่งที่ถูกจำ\" → \"ที่คนจำได้\" · \"การให้ร่างกายมีส่วนร่วม\" → \"ให้คนได้จับ ได้ชิม ได้ฟัง\") · ตัด ๆ และ ฯ ออกจากเสียงพากย์ · อังกฤษเขียนใหม่จากความหมาย ไม่ถอดจากไทยประโยคต่อประโยค · ข้อเท็จจริงทุกข้อยังตรงกับบทสรุปบนเว็บ", ""]
    for c in data:
        L += [f"## {c['name_th']}", ""]
        for lang, head in (("th", "### ไทย"), ("en", "### English")):
            L += [head, ""]
            for s in c["scenes"]:
                L += [s["narr"][lang], ""]
        L += ["---", ""]
    open(os.path.join(HERE, "scripts-pilot-v2.md"), "w", encoding="utf-8").write("\n".join(L))


PILOT_HEADER = """<div class="wrap">
<div class="eyebrow">ComInno Center · วิดีโอเล่าสาระหลักของบทความ</div>
<h1 style="margin-top:6px">สตอรี่บอร์ดคลิปนำร่อง 3 เรื่อง × ไทย/อังกฤษ — ฉบับ 2</h1>
<p class="lead">ฉากละหนึ่งภาพ ผูกกับย่อหน้าที่พากย์ · ภาพทุกใบเป็น paper-craft สองสีตาม BRAND.md E3 และใช้คู่สีของภาพประจำบทความนั้น · บทพากย์เกลาใหม่ทั้งสองภาษาให้เป็นภาษาพูดจริง ไม่ใช่สำนวนแปล · ทุกข้อเท็จจริงตรงกับบทสรุปบนเว็บซึ่งตรวจกับตัวบทความแล้ว</p>

<div class="params">
<div><b>ผู้ฟัง</b>นักวิชาการ นักวิจัย แหล่งทุน ผู้สนใจทั่วไป</div>
<div><b>ความยาว</b>คลิปละ 75–95 วินาที · 8 ฉาก</div>
<div><b>เสียง</b>ไทย Toto · อังกฤษ Sterling (เดิม)</div>
<div><b>ภาพ</b>paper-craft 16:9 · gemini-3-pro-image · ไม่เกิน 4 วัตถุต่อภาพ</div>
<div><b>เลย์เอาต์</b>ข้อความซ้าย 45% · ภาพขวา 55% พื้นครีมต่อเนื่องกัน</div>
<div><b>สัญลักษณ์ประจำชุด</b>ดอกจันกระดาษ = ฉากข้อควรระวัง · การ์ดปิดโลโก้เหมือนกันทุกคลิป</div>
</div>

<div class="layout">
<div class="changes">
<h3>สิ่งที่เปลี่ยนจากฉบับ 1</h3>
<ul>
<li><b>ภาพทุกฉาก</b> เดิมมีภาพเดียวแล้วต่อด้วยการ์ดข้อความล้วน 5 ใบ ฉบับนี้ทุกฉากมีภาพประกอบที่วาด <em>รูปร่างของสิ่งที่พูดถึง</em> ในฉากนั้น (ไม่วาดเนื้อเรื่อง ตามหลักการเดียวกับภาพประจำบทความ)</li>
<li><b>ภาษา</b> ตัดสำนวนที่ถอดจากศัพท์วิชาการหรืออังกฤษ เช่น "การเปิดรับสื่อ" → "เห็นข่าวสารบ่อยขึ้น" · "สิ่งที่ถูกจำ" → "ที่คนจำได้" · "การให้ร่างกายมีส่วนร่วม" → "ให้คนได้จับ ได้ชิม ได้ฟัง" · อังกฤษเขียนใหม่จากความหมาย ไม่ถอดจากไทยทีละประโยค</li>
<li><b>เลย์เอาต์</b> ข้อความอยู่ซ้าย ภาพอยู่ขวาบนพื้นครีมเดียวกัน (แบบเดียวกับ hero หน้าแรกของเว็บ) แทนการสลับ "ภาพเต็มจอ → การ์ดตัวอักษร"</li>
<li><b>ต้องอัดเสียงใหม่</b> เพราะบทเปลี่ยน ใช้เสียงและค่าเดิม ราคาเท่ารอบแรก</li>
</ul>
</div>
<div>
<div class="mock" aria-label="ตัวอย่างเลย์เอาต์ฉาก: ป้ายและข้อความซ้าย วัตถุกระดาษขวา"><div class="t"><i></i><b></b><b></b><b></b></div><div class="o"></div><div class="f"></div></div>
<p class="note">ผังฉากแบบใหม่ — ป้ายสีชมพูกับข้อความ Kanit อยู่ซ้าย วัตถุกระดาษอยู่ขวา ภาพที่เจนจะสั่งให้เว้นพื้นครีมฝั่งซ้ายหนึ่งในสามไว้ เพื่อให้ขอบภาพกลืนกับพื้นการ์ดโดยไม่เห็นรอยต่อ</p>
</div>
</div>
"""


def header_body(batch, data):
    if batch == 1:
        return PILOT_HEADER
    n = len(data)
    return f"""<div class="wrap">
<div class="eyebrow">ComInno Center · วิดีโอเล่าสาระหลักของบทความ</div>
<h1 style="margin-top:6px">สตอรี่บอร์ดชุดที่ {batch} — {n} เรื่อง × ไทย/อังกฤษ</h1>
<p class="lead">รูปแบบเดียวกับชุดนำร่องที่ผู้ใช้อนุมัติแล้ว: ฉากละหนึ่งภาพ paper-craft สองสีตามคู่สีของภาพประจำบทความ · เสียงอาจารย์เอง (ไทย Smith Boon · อังกฤษ Smith Boonbr สำเนียงอังกฤษ) อัดทีละย่อหน้า · จิงเกิล เพลงพื้นหลัง และเสียงกระดาษชุดเดิม · การ์ดปิดมีชื่อผู้เขียนทุกคน · ประธานของกริยาวิจัยคือทีมวิจัย ไม่ใช่ศูนย์ฯ · ทุกข้อเท็จจริงตรงกับบทสรุปบนเว็บ</p>
<div class="params">
<div><b>ผู้ฟัง</b>นักวิชาการ นักวิจัย แหล่งทุน ผู้สนใจทั่วไป</div>
<div><b>ความยาว</b>คลิปละราว 1:40–1:55 · 8 ฉาก</div>
<div><b>เสียง</b>ไทย Smith Boon · อังกฤษ Smith Boonbr · eleven_v3</div>
<div><b>ภาพ</b>paper-craft 16:9 · gemini-3-pro-image · ไม่เกิน 4 วัตถุต่อภาพ</div>
<div><b>เลย์เอาต์</b>ข้อความซ้าย ภาพขวา พื้นครีมต่อเนื่อง · ตัดบรรทัดไทยตามวรรค</div>
<div><b>สัญลักษณ์ประจำชุด</b>ดอกจันกระดาษ = ฉากข้อควรระวัง · การ์ดปิด + ชื่อผู้เขียนทุกคน</div>
</div>
<div class="changes">
<h3>สิ่งที่ขอให้ตรวจก่อนอนุมัติ</h3>
<ul>
<li><b>บทพากย์</b> ทั้งสองภาษา — โดยเฉพาะประธานของประโยค (ทีมวิจัย / คณะผู้วิจัย / ผู้วิจัย) ว่าตรงกับผู้ทำงานจริงของแต่ละเรื่องหรือไม่ และเรื่องไหนต่อยอดจากผลงานของนิสิตที่ควรบอกในบท</li>
<li><b>ข้อความบนจอ</b> เว้นวรรคตามหน่วยความหมายแล้ว ตัวตัดบรรทัดจะไม่ตัดกลางคำ</li>
<li><b>แนวคิดภาพ</b> ทุกใบนับวัตถุไม่เกินสี่ชิ้น ใบไหนเจนออกมาไม่ตรงจะรายงานตามที่เห็นจริงและถามก่อนเจนซ้ำ</li>
<li><b>ค่าใช้จ่าย</b> ดูตารางท้ายหน้า — ทุกรายการคิดเงินเมื่อกดสร้าง จะเริ่มเมื่ออนุมัติเท่านั้น</li>
</ul>
</div>
"""


def write_html(data, batch=1):
    esc = html.escape
    data = [c for c in data if c.get("batch", 1) == batch]
    n_new = sum(1 for c in data for s in c["scenes"] if s["image"] == "new")
    img_cost = n_new * IMAGE_PRICE
    # ชุดนำร่องประเมินต่อคลิป · ชุดถัดไปประเมินจากใบเสร็จจริงของชุดนำร่อง (48 ท่อน = $1.25 → ≈ $0.026/ท่อน)
    # ชุดที่ 2–3 จ่ายจริง $2.67 และ $3.36 ต่อ 80 ท่อน — ElevenLabs คิดตามอักขระ จึงประเมินจากอักขระจริงของบท (ชุดที่ 3: 20,385 อักขระ = $3.36)
    tts_cost = 3 * (TTS_TH + TTS_EN) if batch == 1 else sum(len(s["narr"][l]) for c in data for s in c["scenes"] for l in ("th", "en")) * (3.36 / 20385)

    def swatches(p):
        return (f'<span class="sw" style="background:{p["obj_hex"]}" title="วัตถุ"></span>'
                f'<span class="sw" style="background:{p["sh_hex"]}" title="เงา"></span>')

    parts = []
    parts.append(f"""<title>{"สตอรี่บอร์ดคลิปงานวิจัยนำร่อง" if batch == 1 else f"สตอรี่บอร์ดคลิปงานวิจัยชุดที่ {batch}"}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;500&display=swap">
<style>
:root{{--bg:#FBF9F7;--ink:#1A1613;--ink2:#4A423D;--muted:#7A716A;--rule:#E6DFD8;--panel:#F3EEE8;--panel2:#EDE6DF;--accent:#D31D81;--accent-ink:#FFFFFF;--tag:#FFF0F7;--tag-ink:#A8146A;--ok:#2E6B4F;--ok-bg:#E6F1EA}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]){{--bg:#1A1613;--ink:#FBF9F7;--ink2:#D9D2CB;--muted:#A39B93;--rule:#3A332E;--panel:#26211D;--panel2:#2F2925;--accent:#F26FB6;--accent-ink:#1A1613;--tag:#3A2230;--tag-ink:#F9A8D4;--ok:#9CD4B4;--ok-bg:#1F3328}}}}
:root[data-theme="dark"]{{--bg:#1A1613;--ink:#FBF9F7;--ink2:#D9D2CB;--muted:#A39B93;--rule:#3A332E;--panel:#26211D;--panel2:#2F2925;--accent:#F26FB6;--accent-ink:#1A1613;--tag:#3A2230;--tag-ink:#F9A8D4;--ok:#9CD4B4;--ok-bg:#1F3328}}
*{{box-sizing:border-box}}
body{{margin:0;background:var(--bg);color:var(--ink);font-family:Kanit,"Noto Sans Thai",system-ui,sans-serif;font-weight:400;line-height:1.6;font-size:16px}}
.wrap{{max-width:1180px;margin:0 auto;padding:40px 24px 96px}}
h1,h2,h3{{font-weight:500;margin:0;text-wrap:balance;line-height:1.25}}
h1{{font-size:clamp(28px,3.4vw,40px)}}
h2{{font-size:clamp(22px,2.4vw,28px)}}
h3{{font-size:18px}}
.eyebrow{{color:var(--accent);font-weight:500;font-size:14px;letter-spacing:.04em;text-transform:uppercase}}
.lead{{color:var(--ink2);max-width:68ch;margin:12px 0 0}}
.params{{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--rule);border:1px solid var(--rule);margin:28px 0 0}}
@media (max-width:820px){{.params{{grid-template-columns:repeat(2,1fr)}}}}
@media (max-width:520px){{.params{{grid-template-columns:1fr}}}}
.params div{{background:var(--bg);padding:14px 16px}}
.params b{{display:block;font-weight:500;color:var(--muted);font-size:13px}}
.changes{{margin:28px 0 0;padding:20px 24px;background:var(--panel);border-left:3px solid var(--accent)}}
.changes ul{{margin:8px 0 0;padding-left:20px;color:var(--ink2)}}
.changes li+li{{margin-top:6px}}
.clip{{margin-top:64px}}
.cliphead{{display:flex;flex-wrap:wrap;align-items:baseline;gap:12px 20px;padding-bottom:12px;border-bottom:2px solid var(--ink)}}
.cliphead .en{{color:var(--muted)}}
.cliphead .pal{{margin-left:auto;display:flex;align-items:center;gap:8px;color:var(--muted);font-size:14px}}
.sw{{display:inline-block;width:18px;height:18px;border-radius:50%;border:1px solid rgba(0,0,0,.08)}}
.scene{{display:grid;grid-template-columns:300px 1fr;gap:24px;padding:24px 0;border-bottom:1px solid var(--rule)}}
.frame{{aspect-ratio:16/9;background:var(--panel);position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}}
.frame img{{width:100%;height:100%;object-fit:cover;display:block}}
.frame .sketch{{padding:14px 16px;font-size:14px;line-height:1.5;color:var(--ink2);text-align:left;align-self:stretch;display:flex;flex-direction:column;gap:8px}}
.frame .sketch .dots{{display:flex;gap:6px}}
.frame .logo{{font-weight:500;color:var(--muted);font-size:14px;padding:16px;text-align:center}}
.meta{{display:flex;flex-wrap:wrap;gap:6px 10px;margin-top:8px;font-size:13px;color:var(--muted)}}
.tag{{display:inline-block;padding:1px 8px;border-radius:999px;background:var(--tag);color:var(--tag-ink);font-weight:500;font-size:12px}}
.tag.have{{background:var(--ok-bg);color:var(--ok)}}
.tag.none{{background:var(--panel2);color:var(--muted)}}
.tag.warn{{background:#FBEBD6;color:#8A4B00}}
:root[data-theme="dark"] .tag.warn{{background:#3D2A12;color:#F3C07A}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]) .tag.warn{{background:#3D2A12;color:#F3C07A}}}}
.visual.dev{{color:#8A4B00}}
:root[data-theme="dark"] .visual.dev{{color:#F3C07A}}
@media (prefers-color-scheme: dark){{:root:not([data-theme="light"]) .visual.dev{{color:#F3C07A}}}}
.narr{{display:grid;grid-template-columns:1fr 1fr;gap:16px 24px}}
.narr p{{margin:0}}
.narr .lang{{display:block;font-size:12px;color:var(--muted);font-weight:500;letter-spacing:.04em;margin-bottom:2px}}
.screen{{margin-top:14px;display:grid;grid-template-columns:1fr 1fr;gap:12px 24px}}
.screen .card{{background:var(--panel);padding:12px 14px;border-radius:2px}}
.screen .lab{{color:var(--accent);font-weight:500;font-size:13px;display:block;border-bottom:2px solid var(--accent);width:max-content;max-width:100%;padding-bottom:1px;margin-bottom:6px}}
.screen .txt{{font-weight:500;font-size:15px;line-height:1.45}}
.visual{{margin-top:14px;color:var(--ink2);font-size:15px}}
.visual b{{font-weight:500;color:var(--ink)}}
details{{margin-top:8px;font-size:13px;color:var(--muted)}}
summary{{cursor:pointer;font-weight:500}}
pre{{white-space:pre-wrap;font:inherit;font-size:13px;line-height:1.5;background:var(--panel);padding:12px 14px;margin:6px 0 0;color:var(--ink2);overflow-x:auto}}
.budget{{margin-top:64px}}
table{{width:100%;border-collapse:collapse;margin-top:12px;font-variant-numeric:tabular-nums}}
th,td{{text-align:left;padding:10px 12px;border-bottom:1px solid var(--rule);vertical-align:top}}
th{{font-weight:500;color:var(--muted);font-size:13px}}
td.num,th.num{{text-align:right}}
tfoot td{{font-weight:500;border-bottom:0;border-top:2px solid var(--ink)}}
.note{{color:var(--muted);font-size:14px;margin-top:10px;max-width:70ch}}
.layout{{margin-top:28px;display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start}}
.mock{{aspect-ratio:16/9;background:var(--panel);position:relative;overflow:hidden;border:1px solid var(--rule)}}
.mock .t{{position:absolute;left:8%;top:22%;width:38%}}
.mock .t i{{display:block;height:6px;background:var(--accent);width:40%;margin-bottom:10px}}
.mock .t b{{display:block;height:9px;background:var(--ink);opacity:.85;margin-bottom:7px}}
.mock .t b:nth-child(3){{width:85%}} .mock .t b:nth-child(4){{width:60%}}
.mock .o{{position:absolute;right:10%;top:28%;width:32%;aspect-ratio:1;background:{data[0]['palette']['obj_hex']};transform:skewX(-8deg);box-shadow:24px 22px 0 {data[0]['palette']['sh_hex']}}}
.mock .f{{position:absolute;left:8%;right:8%;bottom:8%;height:5px;background:var(--muted);opacity:.5}}
@media (max-width:820px){{.scene{{grid-template-columns:1fr}}.narr,.screen,.layout{{grid-template-columns:1fr}}}}
@media (prefers-reduced-motion: no-preference){{summary{{transition:color .15s}}}}
a{{color:var(--accent)}}
:focus-visible{{outline:2px solid var(--accent);outline-offset:2px}}
</style>
{header_body(batch, data)}""")

    for c in data:
        p = c["palette"]
        parts.append(f"""<section class="clip" id="{c['key']}">
<div class="cliphead"><h2>{esc(c['name_th'])}</h2><span class="en">{esc(c['name_en'])}</span><span class="pal">คู่สี {swatches(p)}</span></div>""")
        for s in c["scenes"]:
            n = s["n"]
            if s["image"] == "existing":
                frame = f'<img src="{b64img(os.path.join(IMG_DIR, c["slug"] + "-800.webp"))}" alt="">'
                tag = '<span class="tag have">ภาพประจำบทความ · มีแล้ว</span>'
            elif s["image"] == "new":
                gen_path = os.path.join(HERE, "images-v2", f'{c["key"]}-{n:02d}.png')
                if os.path.exists(gen_path):
                    frame = f'<img src="{thumb_b64(gen_path)}" alt="">'
                    key = f'{c["key"]}-{n:02d}'
                    tag = (f'<span class="tag warn">เจนแล้ว · เบี่ยงจากแนวคิด</span>' if key in DEVIATIONS
                           else f'<span class="tag have">เจนแล้ว · ตรงแนวคิด</span>')
                else:
                    frame = (f'<div class="sketch"><div class="dots">{swatches(p)}</div><div>{esc(s["visual_th"])}</div></div>')
                    tag = f'<span class="tag">ภาพใหม่ · {c["key"]}-{n:02d}</span>'
            else:
                frame = '<div class="logo">โลโก้ + ชื่อศูนย์ฯ + cominnocenter.com</div>'
                tag = '<span class="tag none">การ์ดปิด · ไม่เจนภาพ</span>'
            secs = f"ไทย ~{s['secs_v1'][0]:.0f} วิ · อังกฤษ ~{s['secs_v1'][1]:.0f} วิ"
            narr = (f'<div class="narr"><p><span class="lang">พากย์ไทย</span>{esc(s["narr"]["th"])}</p>'
                    f'<p><span class="lang">Narration</span>{esc(s["narr"]["en"])}</p></div>')
            if s["label"]:
                screen = (f'<div class="screen"><div class="card"><span class="lab">{esc(s["label"]["th"])}</span><div class="txt">{esc(s["text"]["th"])}</div></div>'
                          f'<div class="card"><span class="lab">{esc(s["label"]["en"])}</span><div class="txt">{esc(s["text"]["en"])}</div></div></div>')
            else:
                screen = ""
            visual = f'<div class="visual"><b>ภาพ</b> — {esc(s["visual_th"])}</div>'
            dev = DEVIATIONS.get(f'{c["key"]}-{n:02d}')
            if dev:
                visual += f'<div class="visual dev"><b>ที่ได้จริง</b> — {esc(dev)}</div>'
            if s["prompt"]:
                visual += f'<details><summary>prompt ที่จะส่งให้โมเดล (อังกฤษ)</summary><pre>{esc(s["prompt"])}</pre></details>'
            parts.append(f"""<article class="scene">
<div><div class="frame">{frame}</div><div class="meta"><span>ฉาก {n} · {ROLE_TH[s['role']]}</span><span>{secs}</span>{tag}</div></div>
<div>{narr}{screen}{visual}</div>
</article>""")
        parts.append("</section>")

    if batch != 1:
        n_seg = sum(len(c["scenes"]) for c in data) * 2
        parts.append(f"""<section class="budget">
<h2>ค่าใช้จ่ายที่ขออนุมัติ — ประมาณ {img_cost + tts_cost:.2f} USD</h2>
<table>
<thead><tr><th>รายการ</th><th>จำนวน</th><th class="num">ประเมิน (USD)</th></tr></thead>
<tbody>
<tr><td>ภาพ paper-craft ใหม่ (gemini-3-pro-image · ข้อความล้วน $0.20/ใบ)</td><td>{n_new} ใบ ({len(data)} เรื่อง × 6 ใบ)</td><td class="num">{img_cost:.2f}</td></tr>
<tr><td>อัดเสียงพากย์ทีละย่อหน้า (Smith Boon · Smith Boonbr · eleven_v3)</td><td>{n_seg} ท่อน ({len(data)} เรื่อง × 2 ภาษา × 8 ย่อหน้า) · ประเมินจากใบเสร็จชุดนำร่อง ≈ $0.026/ท่อน</td><td class="num">{tts_cost:.2f}</td></tr>
<tr><td>ประกอบวิดีโอ (ffmpeg ในเซสชัน)</td><td>{len(data) * 2} คลิป</td><td class="num">0.00</td></tr>
</tbody>
<tfoot><tr><td colspan="2">รวม</td><td class="num">{img_cost + tts_cost:.2f}</td></tr></tfoot>
</table>
<p class="note">ภาพที่เจนออกมาไม่ตรงแนวคิดจะรายงานตามที่เห็นจริงและถามก่อนเจนซ้ำ (ใบละ $0.20) · แก้บทย่อหน้าไหนหลังอัดแล้ว อัดใหม่เฉพาะย่อหน้านั้น (≈ $0.03) · ประกอบใหม่ไม่มีค่าใช้จ่าย</p>
</section>
</div>""")
        open(os.path.join(HERE, f"storyboard-batch{batch}.html"), "w", encoding="utf-8").write("\n".join(parts))
        return n_new, img_cost, tts_cost
    parts.append(f"""<section class="budget">
<h2>ค่าใช้จ่ายจริง (อนุมัติ 4 ก.ย. 2569 ที่ {img_cost + tts_cost:.2f})</h2>
<table>
<thead><tr><th>รายการ</th><th>จำนวน</th><th class="num">ประเมิน (USD)</th><th class="num">จริง (USD)</th></tr></thead>
<tbody>
<tr><td>ภาพ paper-craft ใหม่ (gemini-3-pro-image)</td><td>{n_new} ใบ · ใบแรกแนบภาพอ้างอิงสไตล์ ($0.30) อีก 17 ใบข้อความล้วน ($0.20)</td><td class="num">{img_cost:.2f}</td><td class="num">{ACTUAL_IMG_COST:.2f}</td></tr>
<tr><td>อัดเสียงพากย์ตามบทฉบับ 2 (Toto · Sterling · eleven_v3)</td><td>6 คลิป · 78–99 วินาที</td><td class="num">{tts_cost:.2f}</td><td class="num">{ACTUAL_TTS_COST:.2f}</td></tr>
<tr><td>ประกอบวิดีโอ (ffmpeg ในเซสชัน)</td><td>6 คลิป</td><td class="num">0.00</td><td class="num">0.00</td></tr>
</tbody>
<tfoot><tr><td colspan="2">รวม</td><td class="num">{img_cost + tts_cost:.2f}</td><td class="num">{ACTUAL_IMG_COST + ACTUAL_TTS_COST:.2f}</td></tr></tfoot>
</table>
<p class="note">ภาพ 15 จาก 18 ใบตรงแนวคิดตั้งแต่รอบแรก อีก 3 ใบเบี่ยงเล็กน้อย (ป้ายสีส้มด้านบน) ยังไม่ได้เจนซ้ำ รอการตัดสินใจ · แต่ละใบที่เจนซ้ำคิด $0.20 · ไฟล์ทั้งหมดอยู่ในเซสชัน แก้บทหรือสลับภาพแล้วประกอบใหม่ได้โดยไม่มีค่าใช้จ่าย</p>
</section>
</div>""")
    open(os.path.join(HERE, "storyboard.html"), "w", encoding="utf-8").write("\n".join(parts))
    return n_new, img_cost, tts_cost


if __name__ == "__main__":
    import sys
    batch = int(sys.argv[sys.argv.index("--batch") + 1]) if "--batch" in sys.argv else 1
    data = build_json()
    json.dump(data, open(os.path.join(HERE, "storyboard.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    write_scripts_md(data, batch)
    n_new, ic, tc = write_html(data, batch)
    print(f"scenes: {sum(len(c['scenes']) for c in data)} · new images: {n_new} (${ic:.2f}) · tts: ${tc:.2f} · total ${ic + tc:.2f}")
