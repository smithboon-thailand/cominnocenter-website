/**
 * ผลงานวิชาการของศูนย์ฯ (generated 2026-08-23)
 *
 * ไฟล์นี้สร้างด้วย scripts/fetch-publications.mjs — อย่าแก้ด้วยมือ ให้รันสคริปต์ใหม่แทน
 *
 * แหล่งข้อมูล — ดึงจาก API สาธารณะทั้งหมด:
 * - ORCID public API: รศ.ดร.สมิทธิ์ (0000-0001-7412-4506), ผศ.ดร.ธีรดา (0000-0003-2785-8595)
 * - Crossref API: รศ.ดร.Pavel Slutskiy (กรองด้วยชื่อต้น "Pavel" — Crossref มี Slutskiy ท่านอื่นปนมา)
 * - citations = จำนวนการอ้างอิงใน Crossref ซึ่งต่ำกว่า Google Scholar/Scopus โดยธรรมชาติ
 *   (ตัวเลข GS/Scopus รายบุคคลยังแสดงในโปรไฟล์หน้า /about ตามเดิม)
 *
 * บทในหนังสือที่ผู้เขียนเป็นเจ้าของเล่มเอง ถูกยุบรวมเป็นรายการเดียวกับเล่ม (field chapters)
 */

export type PublicationType = "book" | "journal-article" | "book-chapter" | "conference-paper";

export type PublicationEntry = {
  title: string;
  venue: string;
  year: number;
  type: PublicationType;
  /** ไม่มีในบางรายการที่ตีพิมพ์ในวารสารไทย/เวทีประชุมที่ไม่จด DOI */
  doi?: string;
  /** จำนวนการอ้างอิงจาก Crossref — แสดงเฉพาะที่มากกว่า 0 */
  citations?: number;
  /** slug ของผู้เขียนใน leadership.ts */
  authors: string[];
  /** จำนวนบทในเล่ม (เฉพาะ type: book) */
  chapters?: number;
};

export const publications: PublicationEntry[] = [
  {
    "title": "Co-designing a study on a health interventions with Myanmar migrant workers to address work-related musculoskeletal disorders in Thailand’s seafood industry",
    "venue": "Research Involvement and Engagement",
    "year": 2026,
    "type": "journal-article",
    "doi": "10.1186/s40900-026-00891-8",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Cross-Cultural Adaptation and Validation of the (Re)-emerging and ePidemic Infectious Diseases Stigma Scales in Thailand: A Study Protocol",
    "venue": "Wellcome Open Research",
    "year": 2026,
    "type": "journal-article",
    "doi": "10.12688/wellcomeopenres.26014.1",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Enhancing fans and artists’ affective engagement and behavioral intentions in digital music streaming platforms through relational bonds: a case study of JOOX Rooms",
    "venue": "Cogent Arts & Humanities",
    "year": 2026,
    "type": "journal-article",
    "doi": "10.1080/23311983.2026.2675861",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "From stigma to mainstream: a multi-stakeholder thematic analysis of anime consumption and community-driven communication in Thai Generation Z",
    "venue": "Cogent Arts & Humanities",
    "year": 2026,
    "type": "journal-article",
    "doi": "10.1080/23311983.2026.2647143",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "In Defense of Advertising Value Equivalency",
    "venue": "The Journal of Communication and Media Studies",
    "year": 2026,
    "type": "journal-article",
    "doi": "10.18848/2470-9247/cgp/a140",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "ai, Post-Truth Realities, and Thai Students’ Information-Seeking Behavior",
    "venue": "Manusya: Journal of Humanities",
    "year": 2025,
    "type": "journal-article",
    "doi": "10.1163/26659077-20252811",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "From tradition to progressiveness: Analyzing Thailand’s image on youtube amid post-cannabis legalization",
    "venue": "PLOS ONE",
    "year": 2025,
    "type": "journal-article",
    "doi": "10.1371/journal.pone.0317506",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "The effectiveness of augmented reality in marketing communications on Generation Z consumer behaviour",
    "venue": "Fashion, Style & Popular Culture",
    "year": 2025,
    "type": "journal-article",
    "doi": "10.1386/fspc_00152_1",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Global Communication",
    "venue": "Springer Nature Singapore",
    "year": 2025,
    "type": "book",
    "doi": "10.1007/978-981-96-7583-8",
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 11
  },
  {
    "title": "Impact of negative word of mouth on consumers’ attitude. Moderating role of advertising under cognitive involvement conditions",
    "venue": "Cogent Social Sciences",
    "year": 2025,
    "type": "journal-article",
    "doi": "10.1080/23311886.2025.2526800",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Trump in Russian Pro-Government Media: Analyzing Narratives and Metaphors in 2024 U.S. Presidential Election Coverage",
    "venue": "American Behavioral Scientist",
    "year": 2025,
    "type": "journal-article",
    "doi": "10.1177/00027642251405617",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Perception of social media users regarding cryptocurrency investment adoption: a case of social media platform – Reddit",
    "venue": "Cogent Business & Management",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.1080/23311975.2024.2402513",
    "citations": 7,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Ethical gamified health communication intervention to prevent Work-related Musculoskeletal Disorders (WMSDs) in Myanmar migrants at Thailand's seafood factory: A study protocol",
    "venue": "Wellcome Open Research",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.12688/wellcomeopenres.21428.1",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Promoting upcycling fashion through DIY tutorials amongst Thai Generation Z",
    "venue": "Fashion, Style & Popular Culture",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.1386/fspc_00091_1",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Customer-Brand Attitude Congruence and Purchase Intentions Among Thai Media Students in Higher Education: A Case Study of the Sansiri Brand",
    "venue": "Media Education (Mediaobrazovanie)",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.13187/me.2024.2.239",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Praxeological Status of Unintentional Speech Acts",
    "venue": "Journal for the Theory of Social Behaviour",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.1111/jtsb.12433",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Challenging Gender Roles in the Environmental Issues",
    "venue": "Multi-Stakeholder Contribution in Asian Environmental Communication",
    "year": 2024,
    "type": "book-chapter",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Philosophical Foundations of Communication Studies",
    "venue": "Springer Nature Singapore",
    "year": 2024,
    "type": "book",
    "doi": "10.1007/978-981-97-1013-3",
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 16
  },
  {
    "title": "Probability And Bayesian Inference In Human Communication",
    "venue": "WACANA: Jurnal Ilmiah Ilmu Komunikasi",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.32509/wacana.v23i1.3388",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Yes, You Should Own Bitcoin",
    "venue": "Journal of Libertarian Studies",
    "year": 2024,
    "type": "journal-article",
    "doi": "10.35297/001c.123605",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "The Chinese media narrative of Thailand as a tourist destination after the legalisation of cannabis",
    "venue": "Heliyon",
    "year": 2023,
    "type": "journal-article",
    "doi": "10.1016/j.heliyon.2023.e15478",
    "citations": 13,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "The Impact of VTubers and Streamers on the Purchase Intention of Otaku and Non-Otaku Respondents: A Comparative Study",
    "venue": "Basic and Applied Social Psychology",
    "year": 2023,
    "type": "journal-article",
    "doi": "10.1080/01973533.2023.2208246",
    "citations": 8,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Cognitive Load Theory in Online Education: Leveraging Interactive Media, Testing, Interaction and to Enhance Engagement and Active Learning",
    "venue": "TENCON 2023 - 2023 IEEE Region 10 Conference (TENCON)",
    "year": 2023,
    "type": "conference-paper",
    "doi": "10.1109/tencon58879.2023.10322455",
    "citations": 4,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Perspectives on Online Learning and Technostress Experienced by Science and Non-science First-year University Students during COVID-19",
    "venue": "PASAA Journal",
    "year": 2023,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Segmenting Thai Generation Z Consumers on Cruelty-free Products: Their Value, Attitude, Brand Loyalty, and Purchase Intention",
    "venue": "Communication and Media in Asia Pacific",
    "year": 2023,
    "type": "journal-article",
    "doi": "10.14456/cmap.2023.5",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Inappropriate Content of Sexual Harassment in Thai Entertainment Programs",
    "venue": "Journal of Communication Arts",
    "year": 2023,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Online Video Game Influencer's Credibility and Purchase Intention",
    "venue": "Drustvena istrazivanja",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.5559/di.31.4.06",
    "citations": 4,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Application of interactive sensory arts exhibition in promoting the protection of endangered species: The Elephant tales",
    "venue": "Thinking Skills and Creativity",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.1016/j.tsc.2022.101017",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Credibility of the Official COVID Communication in Thailand: When People Stop Believing the Government",
    "venue": "American Behavioral Scientist",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.1177/00027642221118297",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Relationship between Chinese viewers’ attitude toward fansub videos and attitude against sponsorship",
    "venue": "Cogent Education",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.1080/2331186x.2022.2102481",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Attitudes and opinions about 360 virtual videos to relieve muscle pain and fibrosis in the neck and shoulder",
    "venue": "Journal of Public Health and Development",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.55131/jphd/2022/200118",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "ENGAGE-A3 model: communication risk to involve Myanmar workers in AIDS prevention",
    "venue": "HIV &amp; AIDS Review",
    "year": 2022,
    "type": "journal-article",
    "doi": "10.5114/hivar.2022.115679",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Public Relations Internship during Covid-19 Pandemic: Lessons learnt from both mentors and mentees",
    "venue": "Asia Pacific Public Relation Research & Education Network (APPRREN) Online Research Symposium 2022",
    "year": 2022,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Communication and Libertarianism",
    "venue": "Springer Singapore",
    "year": 2021,
    "type": "book",
    "doi": "10.1007/978-981-33-6664-0",
    "citations": 12,
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 24
  },
  {
    "title": "Effectiveness of slow-paced safety instruction videos in conveying flight safety information to young first-time flyers",
    "venue": "Journal of Public Health and Development",
    "year": 2021,
    "type": "journal-article",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Health Belief Model of the Retirees and Reducing Sodium Intake Campaign",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2021,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Crisis Communication of Digital Television Channels with Administrative Penalties after Releasing News Reports of the Gunman Taking Hostages in Nakhon Ratchasima Province",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2021,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "University Students and their Techno-Stress During Covid-19 Pandemic",
    "venue": "Online Symposium on Impact of Covid-19 on Media Usage",
    "year": 2021,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Freedom of Expression, Social Media Censorship, and Property Rights",
    "venue": "Tripodos",
    "year": 2020,
    "type": "journal-article",
    "doi": "10.51698/tripodos.2020.48p53-68",
    "citations": 7,
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Freedom of Expression, Social Media Censorship, and Property Rights",
    "venue": "Tripodos",
    "year": 2020,
    "type": "journal-article",
    "doi": "10.51698/tripodos.2020.48p53-67",
    "citations": 2,
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Factors Predicting Consumer’s Loyalty to One Stop Service On-Demand Application",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2020,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Right to Clean Air' but What Went Wrong?: A Case Study on Global Public Relations in Local Communities in Thailand",
    "venue": "Asia Pacific Public Relations Research and Education Network Research Symposium",
    "year": 2020,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Requirement and Concern towards Health Form and Content Posted on Social Media for Working Age Women",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2020,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Developing an HIV/AIDS risk communication intervention model among Myanmar migrant workers in a factory in Samut Sakhon, Thailand",
    "venue": "HIV and AIDS Review",
    "year": 2019,
    "type": "journal-article",
    "doi": "10.5114/hivar.2019.88535",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "#nodam in #maewong: Framing Analysis on the Roles of Social Media and Strategic Public Relations in Environmental Movement in Thailand",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2018,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Allocating Responsibility for the Damage from Deceptive PR-Materials Disseminated by the Media: A Thought Experiment",
    "venue": "Tripodos",
    "year": 2018,
    "type": "journal-article",
    "doi": "10.51698/tripodos.2018.42.21-38",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "s Video-art Becoming a Form of Popular Art? The case of Apple TV’s Aerial Screen Savers",
    "venue": "IAFOR Journal of Cultural Studies",
    "year": 2018,
    "type": "journal-article",
    "doi": "10.22492/ijcs.3.1.05",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Visual Merchandising in Sportswear Retail",
    "venue": "Communication and Media in Asia Pacific",
    "year": 2018,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Utilization of dating apps by men who have sex with men for persuading other men toward substance use",
    "venue": "Psychology Research and Behavior Management",
    "year": 2017,
    "type": "journal-article",
    "doi": "10.2147/prbm.s121480",
    "citations": 25,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Longitudinal study of Thai people media exposure, knowledge, and behavior on dengue fever prevention and control",
    "venue": "Journal of Infection and Public Health",
    "year": 2017,
    "type": "journal-article",
    "doi": "10.1016/j.jiph.2017.01.016",
    "citations": 23,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Educating Burmese migrants working in Thailand with HIV/AIDS public health knowledge – a perspective of public health officers",
    "venue": "HIV and AIDS Review",
    "year": 2017,
    "type": "journal-article",
    "doi": "10.5114/hivar.2017.72029",
    "citations": 3,
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Bangkok 250: Role of PR in Urban Design and Development",
    "venue": "International Research Symposium, \"Future of Public Relations in the Asia Pacific: Sustainability, Social Responsibility and Social Media\"",
    "year": 2017,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Correlates of colorism: freedom of speech and discriminatory advertising in thailand",
    "venue": "International Journal of Social Sciences",
    "year": 2017,
    "type": "journal-article",
    "doi": "10.20472/ss2017.6.2.005",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Right to Clean Air\" but What Went Wrong? A Case Study on Opportunities and Obstacles to Communicating Climate Change on Social Media in Thailand",
    "venue": "Tenth International Conference on Climate Change: Impacts and Responses Research Network",
    "year": 2017,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Communication in Adopting Moral Norms",
    "venue": "MANUSYA",
    "year": 2016,
    "type": "journal-article",
    "doi": "10.1163/26659077-01902005",
    "authors": [
      "pavel-slutskiy"
    ]
  },
  {
    "title": "Gays dating applications: information disclosure and sexual behavior",
    "venue": "Journal of Health Research",
    "year": 2016,
    "type": "journal-article",
    "doi": "10.14456/jhr.2016.32",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Muslim Consumers in Thailand and Marketing Public Relations: Decision Making Factors in Purchasing Food, Products and Tourist Service",
    "venue": "Religion, Media and Marketing in a Complex Society",
    "year": 2016,
    "type": "book-chapter",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Thai-Muslim Consumer Behavior toward Marketing Public Relations of Tourism",
    "venue": "20th Annual International Conference of American Society of Business and Behavioral Science",
    "year": 2016,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Role of Social Media In Political Advertising: An Exploratory Investigation of the Bangkok’s Election",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2016,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Survey results of knowledge sharing preferences and practices in public health communication professionals in thailand's department of disease control: a descriptive study",
    "venue": "Journal of Health Research",
    "year": 2015,
    "type": "journal-article",
    "doi": "10.14456/jhr.2015.30",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Key qualitative and quantitative indicators: towards an integrated evaluation framework for government websites in Thailand",
    "venue": "IJBSR",
    "year": 2014,
    "type": "journal-article",
    "doi": "10.1504/ijbsr.2014.060300",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Thai Citizens' Utilization of Social Media Communications Devices during the Bangkok Governor Campaign in 2013",
    "venue": "American Society of Business and Behavioral Science",
    "year": 2014,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Mixed methods for public relations research: Environmental campaigns in Bangkok",
    "venue": "The International Graduate Conference 8",
    "year": 2013,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Global Warming Campaigns in Bangkok: Framing Analysis and Campaign Effectiveness",
    "venue": "The International Journal of Climate Change: Impacts and Responses",
    "year": 2012,
    "type": "journal-article",
    "doi": "10.18848/1835-7156/cgp/v03i04/37139",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Global warming in Bangkok: Framing analysis and campaign effectiveness",
    "venue": "The International Conference of Climate Change: Impacts & Responses",
    "year": 2012,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Green campaigns in Thailand: Use of mixed methods in environmental communication studies",
    "venue": "The International Graduate Conference 7",
    "year": 2011,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Thai citizens and environmental myths: Public and private frames of global warming in Thailand",
    "venue": "The International Graduate Conference 6,",
    "year": 2010,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Global Warming in Bangkok: Environmental Network Communication",
    "venue": "Journal of Language and Culture",
    "year": 2009,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Power and paradox: Global warming discourse in magazine advertisements",
    "venue": "The International Conference on Communication & Sustainable Development in the Next Decade",
    "year": 2009,
    "type": "conference-paper",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Viral Communication through Forward E-mails and Audience Responses",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2009,
    "type": "journal-article",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  }
];

export const publicationYears = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

export const publicationStats = {
  total: publications.length,
  books: publications.filter((p) => p.type === "book").length,
  articles: publications.filter((p) => p.type === "journal-article").length,
  chapters:
    publications.filter((p) => p.type === "book-chapter").length +
    publications.reduce((sum, p) => sum + (p.chapters || 0), 0),
  conference: publications.filter((p) => p.type === "conference-paper").length,
  venues: new Set(publications.map((p) => p.venue).filter(Boolean)).size,
  since: Math.min(...publications.map((p) => p.year)),
};
