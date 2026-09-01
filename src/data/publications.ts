/**
 * ผลงานวิชาการของศูนย์ฯ (generated 2026-09-01)
 *
 * ไฟล์นี้สร้างด้วย scripts/fetch-publications.mjs — อย่าแก้ด้วยมือ ให้รันสคริปต์ใหม่แทน
 *
 * ทุกรายการผ่านการตรวจว่า "มีจริง" และ "เป็นของผู้เขียนคนนั้นจริง":
 * - รายการที่มี DOI ถูกดึง metadata จาก Crossref มาเทียบนามสกุลผู้เขียน
 *   DOI ที่ชี้ไปงานของคนอื่นถูกตัดออกแล้ว (รอบล่าสุดตัดออก 0 รายการ)
 * - รายการที่ไม่มี DOI ถูกค้นในดัชนีอิสระโดยบังคับให้นามสกุลผู้เขียนตรงด้วย
 * - งานชิ้นเดียวที่สำนักพิมพ์จด DOI ซ้ำสองเลขถูกยุบเป็นรายการเดียว
 *   (รอบล่าสุดยุบ 1 รายการ) เก็บเลขที่มียอดอ้างอิงสูงกว่า
 *
 * ระดับการตรวจสอบ (field verified):
 *   "doi"   47 รายการ — ทะเบียน DOI ยืนยันชื่อผู้เขียนตรงกัน
 *   "link"  2 รายการ — DOI เปิดได้และชื่อเรื่องตรง แต่ทะเบียนไม่ลงรายชื่อผู้เขียน
 *   "index" 12 รายการ — พบในดัชนีอิสระพร้อมชื่อผู้เขียนตรงกัน
 *   "self"  14 รายการ — มีเฉพาะที่ผู้เขียนแจ้งไว้ใน ORCID
 *           ส่วนใหญ่เป็นวารสารไทย (TCI/ThaiJO) และเวทีประชุมที่ไม่จด DOI
 *           ไม่ได้แปลว่าไม่มีจริง แต่ยังตรวจสอบออนไลน์อัตโนมัติไม่ได้
 */

export type PublicationType = "book" | "journal-article" | "book-chapter" | "conference-paper";

/**
 * ระดับหลักฐานของแต่ละรายการ — ใช้ทั้งแสดงบนหน้าเว็บและคัดกรองก่อนส่งเข้า JSON-LD
 *   doi   ทะเบียน DOI ยืนยันชื่อผู้เขียนตรงกัน
 *   link  DOI เปิดได้ ชื่อเรื่องตรง แต่ทะเบียนไม่ได้ลงรายชื่อผู้เขียน (วารสารไทยส่วนใหญ่)
 *   index พบในดัชนีอิสระพร้อมชื่อผู้เขียนตรงกัน (ไม่มี DOI)
 *   self  มีเฉพาะที่ผู้เขียนแจ้งไว้ใน ORCID
 */
export type VerificationLevel = "doi" | "link" | "index" | "self";

export type PublicationEntry = {
  title: string;
  venue: string;
  year: number;
  type: PublicationType;
  verified: VerificationLevel;
  /** มีเมื่อ verified เป็น "doi" หรือ "link" */
  doi?: string;
  /** ลิงก์ดัชนีอิสระ มีเมื่อ verified === "index" */
  indexUrl?: string;
  /** จำนวนการอ้างอิงจาก Crossref — แสดงเฉพาะที่มากกว่า 0 */
  citations?: number;
  /**
   * slug ของผู้เขียน **เฉพาะคนของศูนย์ฯ** ใน leadership.ts — ใช้กรองในหน้า /research
   * **ไม่ใช่รายชื่อผู้เขียนครบทุกคน** ห้ามเอาไปสร้างการอ้างอิง ให้ใช้ citation.authors
   */
  authors: string[];
  /** จำนวนบทในเล่ม (เฉพาะ type: book) */
  chapters?: number;
  /**
   * ข้อมูลบรรณานุกรมตามที่ทะเบียนบันทึกไว้ — มีเฉพาะรายการที่ยืนยันผ่าน DOI
   * ฟิลด์ authors ในนี้คือ**ผู้เขียนครบทุกคน** รวมผู้ร่วมวิจัยที่ไม่ได้อยู่ในศูนย์ฯ
   */
  citation?: CitationMeta;
};

/** ข้อมูลที่ APA / MLA / BibTeX / RIS ต้องใช้ ดึงจากทะเบียน ไม่ได้กรอกเอง */
export type CitationMeta = {
  authors: { family: string; given: string; literal: string }[];
  containerTitle: string;
  volume: string;
  issue: string;
  page: string;
  publisher: string;
  year: number;
  month: number;
  day: number;
};

export const publications: PublicationEntry[] = [
  {
    "title": "Co-designing a study on a health interventions with Myanmar migrant workers to address work-related musculoskeletal disorders in Thailand’s seafood industry",
    "venue": "Research Involvement and Engagement",
    "year": 2026,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1186/s40900-026-00891-8",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Hlaing",
          "given": "Phyu Hnin",
          "literal": ""
        },
        {
          "family": "Cheah",
          "given": "Phaik Yeong",
          "literal": ""
        },
        {
          "family": "Myint",
          "given": "Soe Thandar",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "Research Involvement and Engagement",
      "volume": "12",
      "issue": "1",
      "page": "",
      "publisher": "Springer Science and Business Media LLC",
      "year": 2026,
      "month": 4,
      "day": 28
    }
  },
  {
    "title": "Cross-Cultural Adaptation and Validation of the (Re)-emerging and ePidemic Infectious Diseases Stigma Scales in Thailand: A Study Protocol",
    "venue": "Wellcome Open Research",
    "year": 2026,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.12688/wellcomeopenres.26014.1",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Hlaing",
          "given": "Phyu Hnin",
          "literal": ""
        },
        {
          "family": "Cheah",
          "given": "Phaik Yeong",
          "literal": ""
        },
        {
          "family": "Poomchaichote",
          "given": "Tassawan",
          "literal": ""
        },
        {
          "family": "Kulpijit",
          "given": "Natinee",
          "literal": ""
        },
        {
          "family": "Myint",
          "given": "Soe Thandar",
          "literal": ""
        },
        {
          "family": "Mukaka",
          "given": "Mavuto",
          "literal": ""
        },
        {
          "family": "Paterson",
          "given": "Amy",
          "literal": ""
        },
        {
          "family": "Pannengpetch",
          "given": "Sakda",
          "literal": ""
        },
        {
          "family": "Viriyasitavat",
          "given": "Wattana",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "Wellcome Open Research",
      "volume": "11",
      "issue": "",
      "page": "151",
      "publisher": "F1000 Research Ltd",
      "year": 2026,
      "month": 2,
      "day": 25
    }
  },
  {
    "title": "Enhancing fans and artists’ affective engagement and behavioral intentions in digital music streaming platforms through relational bonds: a case study of JOOX Rooms",
    "venue": "Cogent Arts & Humanities",
    "year": 2026,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/23311983.2026.2675861",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Chanapun",
          "given": "Nattawee",
          "literal": ""
        },
        {
          "family": "Mazahir",
          "given": "Ibtesam",
          "literal": ""
        }
      ],
      "containerTitle": "Cogent Arts & Humanities",
      "volume": "13",
      "issue": "1",
      "page": "",
      "publisher": "Informa UK Limited",
      "year": 2026,
      "month": 5,
      "day": 21
    }
  },
  {
    "title": "From stigma to mainstream: a multi-stakeholder thematic analysis of anime consumption and community-driven communication in Thai Generation Z",
    "venue": "Cogent Arts & Humanities",
    "year": 2026,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/23311983.2026.2647143",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Krongbooncho",
          "given": "Chayanon",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Mazahir",
          "given": "Ibtesam",
          "literal": ""
        }
      ],
      "containerTitle": "Cogent Arts & Humanities",
      "volume": "13",
      "issue": "1",
      "page": "",
      "publisher": "Informa UK Limited",
      "year": 2026,
      "month": 3,
      "day": 24
    }
  },
  {
    "title": "In Defense of Advertising Value Equivalency",
    "venue": "The Journal of Communication and Media Studies",
    "year": 2026,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.18848/2470-9247/cgp/a140",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Ordeix Rigo",
          "given": "Enric",
          "literal": ""
        }
      ],
      "containerTitle": "The Journal of Communication and Media Studies",
      "volume": "",
      "issue": "",
      "page": "",
      "publisher": "Common Ground Research Networks",
      "year": 2026,
      "month": 3,
      "day": 9
    }
  },
  {
    "title": "Relationship Marketing Communication of Horror Storytelling Programs",
    "venue": "Journal of Communication and Management NIDA (e-Journal)",
    "year": 2026,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so12.tci-thaijo.org/index.php/jcmn/article/view/5690",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "ai, Post-Truth Realities, and Thai Students’ Information-Seeking Behavior",
    "venue": "Manusya: Journal of Humanities",
    "year": 2025,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1163/26659077-20252811",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "Manusya: Journal of Humanities",
      "volume": "28",
      "issue": "1",
      "page": "1-19",
      "publisher": "Walter de Gruyter GmbH",
      "year": 2025,
      "month": 11,
      "day": 18
    }
  },
  {
    "title": "From tradition to progressiveness: Analyzing Thailand’s image on youtube amid post-cannabis legalization",
    "venue": "PLOS ONE",
    "year": 2025,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1371/journal.pone.0317506",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Mazahir",
          "given": "Ibtesam",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Yaseen",
          "given": "Safeena",
          "literal": ""
        }
      ],
      "containerTitle": "PLOS ONE",
      "volume": "20",
      "issue": "2",
      "page": "e0317506",
      "publisher": "Public Library of Science (PLoS)",
      "year": 2025,
      "month": 2,
      "day": 7
    }
  },
  {
    "title": "The effectiveness of augmented reality in marketing communications on Generation Z consumer behaviour",
    "venue": "Fashion, Style & Popular Culture",
    "year": 2025,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1386/fspc_00152_1",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Sahakitpijarn",
          "given": "Kanokrat",
          "literal": ""
        }
      ],
      "containerTitle": "Fashion, Style & Popular Culture",
      "volume": "12",
      "issue": "4",
      "page": "461-480",
      "publisher": "Intellect",
      "year": 2025,
      "month": 10,
      "day": 1
    }
  },
  {
    "title": "Global Communication",
    "venue": "Springer Nature Singapore",
    "year": 2025,
    "type": "book",
    "verified": "doi",
    "doi": "10.1007/978-981-96-7583-8",
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 11,
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "",
      "volume": "",
      "issue": "",
      "page": "",
      "publisher": "Springer Nature Singapore",
      "year": 2025,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Impact of negative word of mouth on consumers’ attitude. Moderating role of advertising under cognitive involvement conditions",
    "venue": "Cogent Social Sciences",
    "year": 2025,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/23311886.2025.2526800",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Yaseen",
          "given": "Safeena",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Mazahir",
          "given": "Ibtesam",
          "literal": ""
        }
      ],
      "containerTitle": "Cogent Social Sciences",
      "volume": "11",
      "issue": "1",
      "page": "",
      "publisher": "Informa UK Limited",
      "year": 2025,
      "month": 7,
      "day": 3
    }
  },
  {
    "title": "Reframing Thailand's Southern Border Conflict through a Self-transcendental Narrative Paradigm",
    "venue": "Journal of Communication Arts",
    "year": 2025,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so02.tci-thaijo.org/index.php/jcomm/article/view/275202",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Trump in Russian Pro-Government Media: Analyzing Narratives and Metaphors in 2024 U.S. Presidential Election Coverage",
    "venue": "American Behavioral Scientist",
    "year": 2025,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1177/00027642251405617",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Gavra",
          "given": "Dmitrii",
          "literal": ""
        }
      ],
      "containerTitle": "American Behavioral Scientist",
      "volume": "",
      "issue": "",
      "page": "",
      "publisher": "SAGE Publications",
      "year": 2025,
      "month": 12,
      "day": 26
    }
  },
  {
    "title": "Perception of social media users regarding cryptocurrency investment adoption: a case of social media platform – Reddit",
    "venue": "Cogent Business & Management",
    "year": 2024,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/23311975.2024.2402513",
    "citations": 7,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Rodpangtiam",
          "given": "Athit",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Mazahir",
          "given": "Ibtesam",
          "literal": ""
        }
      ],
      "containerTitle": "Cogent Business & Management",
      "volume": "11",
      "issue": "1",
      "page": "",
      "publisher": "Informa UK Limited",
      "year": 2024,
      "month": 9,
      "day": 14
    }
  },
  {
    "title": "Ethical gamified health communication intervention to prevent Work-related Musculoskeletal Disorders (WMSDs) in Myanmar migrants at Thailand's seafood factory: A study protocol",
    "venue": "Wellcome Open Research",
    "year": 2024,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.12688/wellcomeopenres.21428.1",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Hlaing",
          "given": "Phyu Hnin",
          "literal": ""
        },
        {
          "family": "Cheah",
          "given": "Phaik Yeong",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "Wellcome Open Research",
      "volume": "9",
      "issue": "",
      "page": "347",
      "publisher": "F1000 Research Ltd",
      "year": 2024,
      "month": 6,
      "day": 28
    }
  },
  {
    "title": "Promoting upcycling fashion through DIY tutorials amongst Thai Generation Z",
    "venue": "Fashion, Style & Popular Culture",
    "year": 2024,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1386/fspc_00091_1",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Lertjaruphatthra",
          "given": "Ruja",
          "literal": ""
        },
        {
          "family": "Ukoskit",
          "given": "Sarita",
          "literal": ""
        },
        {
          "family": "Yompuck",
          "given": "Tanat",
          "literal": ""
        }
      ],
      "containerTitle": "Fashion, Style & Popular Culture",
      "volume": "11",
      "issue": "3",
      "page": "517-526",
      "publisher": "Intellect",
      "year": 2024,
      "month": 10,
      "day": 1
    }
  },
  {
    "title": "Customer-Brand Attitude Congruence and Purchase Intentions Among Thai Media Students in Higher Education: A Case Study of the Sansiri Brand",
    "venue": "Media Education (Mediaobrazovanie)",
    "year": 2024,
    "type": "journal-article",
    "verified": "link",
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
    "verified": "doi",
    "doi": "10.1111/jtsb.12433",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "Journal for the Theory of Social Behaviour",
      "volume": "54",
      "issue": "4",
      "page": "591-606",
      "publisher": "Wiley",
      "year": 2024,
      "month": 10,
      "day": 9
    }
  },
  {
    "title": "Challenging Gender Roles in the Environmental Issues",
    "venue": "Multi-Stakeholder Contribution in Asian Environmental Communication",
    "year": 2024,
    "type": "book-chapter",
    "verified": "doi",
    "doi": "10.4324/9781032670508-11",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Philosophical Foundations of Communication Studies",
    "venue": "Springer Nature Singapore",
    "year": 2024,
    "type": "book",
    "verified": "doi",
    "doi": "10.1007/978-981-97-1013-3",
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 16,
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "",
      "volume": "",
      "issue": "",
      "page": "",
      "publisher": "Springer Nature Singapore",
      "year": 2024,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Probability And Bayesian Inference In Human Communication",
    "venue": "WACANA: Jurnal Ilmiah Ilmu Komunikasi",
    "year": 2024,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.32509/wacana.v23i1.3388",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "WACANA: Jurnal Ilmiah Ilmu Komunikasi",
      "volume": "",
      "issue": "",
      "page": "44-53",
      "publisher": "Universitas Prof. Dr. Moestopo Beragama",
      "year": 2024,
      "month": 6,
      "day": 25
    }
  },
  {
    "title": "Yes, You Should Own Bitcoin",
    "venue": "Journal of Libertarian Studies",
    "year": 2024,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.35297/001c.123605",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "Journal of Libertarian Studies",
      "volume": "28",
      "issue": "1",
      "page": "",
      "publisher": "Mises Institute",
      "year": 2024,
      "month": 9,
      "day": 20
    }
  },
  {
    "title": "The Chinese media narrative of Thailand as a tourist destination after the legalisation of cannabis",
    "venue": "Heliyon",
    "year": 2023,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1016/j.heliyon.2023.e15478",
    "citations": 13,
    "authors": [
      "smith-boonchutima",
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Deng",
          "given": "Shuang",
          "literal": ""
        },
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "Heliyon",
      "volume": "9",
      "issue": "4",
      "page": "e15478",
      "publisher": "Elsevier BV",
      "year": 2023,
      "month": 4,
      "day": 0
    }
  },
  {
    "title": "The Impact of VTubers and Streamers on the Purchase Intention of Otaku and Non-Otaku Respondents: A Comparative Study",
    "venue": "Basic and Applied Social Psychology",
    "year": 2023,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/01973533.2023.2208246",
    "citations": 8,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Surakanon",
          "given": "Apinya",
          "literal": ""
        }
      ],
      "containerTitle": "Basic and Applied Social Psychology",
      "volume": "45",
      "issue": "2-3",
      "page": "63-79",
      "publisher": "Informa UK Limited",
      "year": 2023,
      "month": 5,
      "day": 4
    }
  },
  {
    "title": "Cognitive Load Theory in Online Education: Leveraging Interactive Media, Testing, Interaction and to Enhance Engagement and Active Learning",
    "venue": "TENCON 2023 - 2023 IEEE Region 10 Conference (TENCON)",
    "year": 2023,
    "type": "conference-paper",
    "verified": "doi",
    "doi": "10.1109/tencon58879.2023.10322455",
    "citations": 4,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Chongkolrattanaporn",
          "given": "Teerada",
          "literal": ""
        },
        {
          "family": "Kongchan",
          "given": "Watsayut",
          "literal": ""
        }
      ],
      "containerTitle": "TENCON 2023 - 2023 IEEE Region 10 Conference (TENCON)",
      "volume": "",
      "issue": "",
      "page": "2-9",
      "publisher": "IEEE",
      "year": 2023,
      "month": 10,
      "day": 31
    }
  },
  {
    "title": "Perspectives on Online Learning and Technostress Experienced by Science and Non-science First-year University Students during COVID-19",
    "venue": "PASAA",
    "year": 2023,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.58837/chula.pasaa.65.1.8",
    "citations": 1,
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Segmenting Thai Generation Z Consumers on Cruelty-free Products: Their Value, Attitude, Brand Loyalty, and Purchase Intention",
    "venue": "Communication and Media in Asia Pacific",
    "year": 2023,
    "type": "journal-article",
    "verified": "link",
    "doi": "10.14456/cmap.2023.5",
    "authors": [
      "teerada-chongkolrattanaporn"
    ],
    "citation": {
      "authors": [
        {
          "family": "",
          "given": "",
          "literal": "Emmika Lounporn"
        }
      ],
      "containerTitle": "Communication and Media in Asia Pacific",
      "volume": "6",
      "issue": "",
      "page": "52-62",
      "publisher": "Chulalongkorn University",
      "year": 2023,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "The Inappropriate Content of Sexual Harassment in Thai Entertainment Programs",
    "venue": "Journal of Communication Arts",
    "year": 2023,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so02.tci-thaijo.org/index.php/jcomm/article/view/259563",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Online Video Game Influencer's Credibility and Purchase Intention",
    "venue": "Drustvena istrazivanja",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.5559/di.31.4.06",
    "citations": 4,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Sankosik",
          "given": "Ainwat",
          "literal": ""
        }
      ],
      "containerTitle": "Drustvena istrazivanja",
      "volume": "31",
      "issue": "4",
      "page": "683-701",
      "publisher": "Institute of Social Sciences Ivo Pilar",
      "year": 2022,
      "month": 12,
      "day": 23
    }
  },
  {
    "title": "Application of interactive sensory arts exhibition in promoting the protection of endangered species: The Elephant tales",
    "venue": "Thinking Skills and Creativity",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1016/j.tsc.2022.101017",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Ratanavadi",
          "given": "Sitamon",
          "literal": ""
        },
        {
          "family": "Chaowjirakit",
          "given": "Russarin",
          "literal": ""
        },
        {
          "family": "Prayotamornkul",
          "given": "Karnpitcha",
          "literal": ""
        }
      ],
      "containerTitle": "Thinking Skills and Creativity",
      "volume": "44",
      "issue": "",
      "page": "101017",
      "publisher": "Elsevier BV",
      "year": 2022,
      "month": 6,
      "day": 0
    }
  },
  {
    "title": "Analysing Russian Reaction to 2021 U.S. Capitol Riots",
    "venue": "American Behavioral Scientist",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1177/00027642221078767",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Gavra",
          "given": "Dmitrii",
          "literal": ""
        }
      ],
      "containerTitle": "American Behavioral Scientist",
      "volume": "70",
      "issue": "2",
      "page": "162-177",
      "publisher": "SAGE Publications",
      "year": 2022,
      "month": 3,
      "day": 29
    }
  },
  {
    "title": "Credibility of the Official COVID Communication in Thailand: When People Stop Believing the Government",
    "venue": "American Behavioral Scientist",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1177/00027642221118297",
    "citations": 1,
    "authors": [
      "smith-boonchutima",
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "American Behavioral Scientist",
      "volume": "",
      "issue": "",
      "page": "000276422211182",
      "publisher": "SAGE Publications",
      "year": 2022,
      "month": 8,
      "day": 29
    }
  },
  {
    "title": "Relationship between Chinese viewers’ attitude toward fansub videos and attitude against sponsorship",
    "venue": "Cogent Education",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1080/2331186x.2022.2102481",
    "citations": 1,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Lou",
          "given": "Ruiqi",
          "literal": ""
        }
      ],
      "containerTitle": "Cogent Education",
      "volume": "9",
      "issue": "1",
      "page": "",
      "publisher": "Informa UK Limited",
      "year": 2022,
      "month": 7,
      "day": 21
    }
  },
  {
    "title": "Attitudes and opinions about 360 virtual videos to relieve muscle pain and fibrosis in the neck and shoulder",
    "venue": "Journal of Public Health and Development",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.55131/jphd/2022/200118",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        },
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Kreeprasertkul",
          "given": "Kanokpar",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        },
        {
          "family": "Sarika",
          "given": "Krittiya",
          "literal": ""
        },
        {
          "family": "Tancharoen",
          "given": "Titaya",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        },
        {
          "family": "Yamkachorn",
          "given": "Natnaree",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        },
        {
          "family": "Jumpee",
          "given": "Praphapit",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        },
        {
          "family": "Prasansutthiporn",
          "given": "Monthip",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Faculty of Communication Arts, Chulalongkorn University, Bangkok, Thailand"
        }
      ],
      "containerTitle": "Journal of Public Health and Development",
      "volume": "20",
      "issue": "1",
      "page": "",
      "publisher": "ASEAN Institute for Health Development",
      "year": 2022,
      "month": 1,
      "day": 31
    }
  },
  {
    "title": "ENGAGE-A3 model: communication risk to involve Myanmar workers in AIDS prevention",
    "venue": "HIV & AIDS Review",
    "year": 2022,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.5114/hivar.2022.115679",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Sukonthasab",
          "given": "Suchitra",
          "literal": ""
        },
        {
          "family": "Sthapitanonda",
          "given": "Parichart",
          "literal": ""
        }
      ],
      "containerTitle": "HIV & AIDS Review",
      "volume": "21",
      "issue": "2",
      "page": "144-154",
      "publisher": "Termedia Sp. z.o.o.",
      "year": 2022,
      "month": 4,
      "day": 18
    }
  },
  {
    "title": "Health Belief Model of the Retirees and Reducing Sodium Intake Campaign",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2022,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/253798",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Public Relations Internship during Covid-19 Pandemic: Lessons learnt from both mentors and mentees",
    "venue": "Asia Pacific Public Relation Research & Education Network (APPRREN) Online Research Symposium 2022",
    "year": 2022,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Communication and Libertarianism",
    "venue": "Springer Singapore",
    "year": 2021,
    "type": "book",
    "verified": "doi",
    "doi": "10.1007/978-981-33-6664-0",
    "citations": 13,
    "authors": [
      "pavel-slutskiy"
    ],
    "chapters": 24,
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "",
      "volume": "",
      "issue": "",
      "page": "",
      "publisher": "Springer Singapore",
      "year": 2021,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Effectiveness of slow-paced safety instruction videos in conveying flight safety information to young first-time flyers",
    "venue": "Journal of Public Health and Development",
    "year": 2021,
    "type": "journal-article",
    "verified": "self",
    "authors": [
      "smith-boonchutima"
    ]
  },
  {
    "title": "Factors Predicting Consumer’s Loyalty to One Stop Service On-Demand Application",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2021,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/247870",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Crisis Communication of Digital Television Channels with Administrative Penalties after Releasing News Reports of the Gunman Taking Hostages in Nakhon Ratchasima Province",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2021,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/251243",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "University Students and their Techno-Stress During Covid-19 Pandemic",
    "venue": "Online Symposium on Impact of Covid-19 on Media Usage",
    "year": 2021,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Freedom of Expression, Social Media Censorship, and Property Rights",
    "venue": "Tripodos",
    "year": 2020,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.51698/tripodos.2020.48p53-68",
    "citations": 7,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "Tripodos",
      "volume": "",
      "issue": "48",
      "page": "53-68",
      "publisher": "Blanquerna - Universitat Ramon Llull",
      "year": 2020,
      "month": 12,
      "day": 2
    }
  },
  {
    "title": "Trump, Mueller Investigation, and Alleged Russian Election Meddling: Russian Media Coverage in 2017-2019",
    "venue": "American Behavioral Scientist",
    "year": 2020,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1177/0002764220978455",
    "citations": 4,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Gavra",
          "given": "Dmitrii",
          "literal": ""
        },
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "American Behavioral Scientist",
      "volume": "65",
      "issue": "3",
      "page": "482-511",
      "publisher": "SAGE Publications",
      "year": 2020,
      "month": 12,
      "day": 8
    }
  },
  {
    "title": "Right to Clean Air' but What Went Wrong?: A Case Study on Global Public Relations in Local Communities in Thailand",
    "venue": "Asia Pacific Public Relations Research and Education Network Research Symposium",
    "year": 2020,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Requirement and Concern towards Health Form and Content Posted on Social Media for Working Age Women",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2020,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/230947",
    "authors": [
      "teerada-chongkolrattanaporn",
      "smith-boonchutima"
    ]
  },
  {
    "title": "Developing an HIV/AIDS risk communication intervention model among Myanmar migrant workers in a factory in Samut Sakhon, Thailand",
    "venue": "HIV & AIDS Review",
    "year": 2019,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.5114/hivar.2019.88535",
    "citations": 2,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Sukonthasab",
          "given": "Suchitra",
          "literal": ""
        },
        {
          "family": "Satapitanonta",
          "given": "Parichart",
          "literal": ""
        }
      ],
      "containerTitle": "HIV & AIDS Review",
      "volume": "18",
      "issue": "4",
      "page": "285-295",
      "publisher": "Termedia Sp. z.o.o.",
      "year": 2019,
      "month": 10,
      "day": 29
    }
  },
  {
    "title": "The Evolution of Trump’s Image in Russian Media",
    "venue": "American Behavioral Scientist",
    "year": 2018,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1177/0002764218793691",
    "citations": 4,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Bykova",
          "given": "Elena",
          "literal": ""
        },
        {
          "family": "Gavra",
          "given": "Dmitrii",
          "literal": ""
        },
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "American Behavioral Scientist",
      "volume": "",
      "issue": "",
      "page": "000276421879369",
      "publisher": "SAGE Publications",
      "year": 2018,
      "month": 8,
      "day": 10
    }
  },
  {
    "title": "s Video-art Becoming a Form of Popular Art? The case of Apple TV’s Aerial Screen Savers",
    "venue": "IAFOR Journal of Cultural Studies",
    "year": 2018,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.22492/ijcs.3.1.05",
    "citations": 1,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "IAFOR Journal of Cultural Studies",
      "volume": "3",
      "issue": "1",
      "page": "",
      "publisher": "The International Academic Forum (IAFOR)",
      "year": 2018,
      "month": 4,
      "day": 2
    }
  },
  {
    "title": "#nodam in #maewong: Framing Analysis on the Roles of Social Media and Strategic Public Relations in Environmental Movement in Thailand",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2018,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/148722",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Allocating Responsibility for the Damage from Deceptive PR-Materials Disseminated by the Media: A Thought Experiment",
    "venue": "Tripodos",
    "year": 2018,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.51698/tripodos.2018.42.21-38",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Ordeix",
          "given": "Enric",
          "literal": ""
        }
      ],
      "containerTitle": "Tripodos",
      "volume": "",
      "issue": "42",
      "page": "21-38",
      "publisher": "Blanquerna - Universitat Ramon Llull",
      "year": 2018,
      "month": 6,
      "day": 1
    }
  },
  {
    "title": "Visual Merchandising in Sportswear Retail",
    "venue": "Communication and Media in Asia Pacific",
    "year": 2018,
    "type": "journal-article",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Utilization of dating apps by men who have sex with men for persuading other men toward substance use",
    "venue": "Psychology Research and Behavior Management",
    "year": 2017,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.2147/prbm.s121480",
    "citations": 25,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Kongchan",
          "given": "Watsayut",
          "literal": ""
        }
      ],
      "containerTitle": "Psychology Research and Behavior Management",
      "volume": "Volume 10",
      "issue": "",
      "page": "31-38",
      "publisher": "Informa UK Limited",
      "year": 2017,
      "month": 1,
      "day": 0
    }
  },
  {
    "title": "Longitudinal study of Thai people media exposure, knowledge, and behavior on dengue fever prevention and control",
    "venue": "Journal of Infection and Public Health",
    "year": 2017,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1016/j.jiph.2017.01.016",
    "citations": 23,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Kachentawa",
          "given": "Kirati",
          "literal": ""
        },
        {
          "family": "Limpavithayakul",
          "given": "Manasanun",
          "literal": ""
        },
        {
          "family": "Prachansri",
          "given": "Anan",
          "literal": ""
        }
      ],
      "containerTitle": "Journal of Infection and Public Health",
      "volume": "10",
      "issue": "6",
      "page": "836-841",
      "publisher": "Elsevier BV",
      "year": 2017,
      "month": 11,
      "day": 0
    }
  },
  {
    "title": "Educating Burmese migrants working in Thailand with HIV/AIDS public health knowledge – a perspective of public health officers",
    "venue": "HIV & AIDS Review",
    "year": 2017,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.5114/hivar.2017.72029",
    "citations": 3,
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        },
        {
          "family": "Sukonthasab",
          "given": "Suchitra",
          "literal": ""
        },
        {
          "family": "Sthapitanonda",
          "given": "Parichart",
          "literal": ""
        }
      ],
      "containerTitle": "HIV & AIDS Review",
      "volume": "16",
      "issue": "4",
      "page": "226-235",
      "publisher": "Termedia Sp. z.o.o.",
      "year": 2017,
      "month": 12,
      "day": 15
    }
  },
  {
    "title": "PR Evaluation: Efficiency Coefficient",
    "venue": "Vestnik of Saint Petersburg University. Language and Literature",
    "year": 2017,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.21638/11701/spbu09.2017.210",
    "citations": 2,
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "",
          "given": "",
          "literal": "St. Petersburg State University"
        },
        {
          "family": "Bykova",
          "given": "Elena V.",
          "literal": ""
        },
        {
          "family": "Gavra",
          "given": "Dmitrii P.",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "St. Petersburg State University"
        },
        {
          "family": "Slutskiy",
          "given": "Pavel A.",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Chulalongkorn University"
        }
      ],
      "containerTitle": "Vestnik of Saint Petersburg University. Language and Literature",
      "volume": "14",
      "issue": "2",
      "page": "275-284",
      "publisher": "Saint Petersburg State University",
      "year": 2017,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Bangkok 250: Role of PR in Urban Design and Development",
    "venue": "International Research Symposium, \"Future of Public Relations in the Asia Pacific: Sustainability, Social Responsibility and Social Media\"",
    "year": 2017,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Correlates of colorism: freedom of speech and discriminatory advertising in thailand",
    "venue": "International Journal of Social Sciences",
    "year": 2017,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.20472/ss2017.6.2.005",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        },
        {
          "family": "Hamilton",
          "given": "Mark",
          "literal": ""
        }
      ],
      "containerTitle": "International Journal of Social Sciences",
      "volume": "VI",
      "issue": "2",
      "page": "",
      "publisher": "European Research Center (EURREC)",
      "year": 2017,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Right to Clean Air\" but What Went Wrong? A Case Study on Opportunities and Obstacles to Communicating Climate Change on Social Media in Thailand",
    "venue": "Tenth International Conference on Climate Change: Impacts and Responses Research Network",
    "year": 2017,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Communication in Adopting Moral Norms",
    "venue": "MANUSYA",
    "year": 2016,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1163/26659077-01902005",
    "authors": [
      "pavel-slutskiy"
    ],
    "citation": {
      "authors": [
        {
          "family": "Slutskiy",
          "given": "Pavel",
          "literal": ""
        }
      ],
      "containerTitle": "MANUSYA",
      "volume": "19",
      "issue": "2",
      "page": "90-108",
      "publisher": "Walter de Gruyter GmbH",
      "year": 2016,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Gays dating applications: information disclosure and sexual behavior",
    "venue": "Journal of Health Research",
    "year": 2016,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.14456/jhr.2016.32",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "",
          "given": "",
          "literal": "Smith Boonchutima"
        },
        {
          "family": "",
          "given": "",
          "literal": "Sopon Sriwattana"
        },
        {
          "family": "",
          "given": "",
          "literal": "Rungroj Rungvimolsin"
        },
        {
          "family": "",
          "given": "",
          "literal": "Nattanop Palahan"
        }
      ],
      "containerTitle": "",
      "volume": "30",
      "issue": "",
      "page": "",
      "publisher": "Chulalongkorn University Press",
      "year": 2016,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Muslim Consumers in Thailand and Marketing Public Relations: Decision Making Factors in Purchasing Food, Products and Tourist Service",
    "venue": "Religion, Media and Marketing in a Complex Society",
    "year": 2016,
    "type": "book-chapter",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Thai-Muslim Consumer Behavior toward Marketing Public Relations of Tourism",
    "venue": "20th Annual International Conference of American Society of Business and Behavioral Science",
    "year": 2016,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "The Role of Social Media In Political Advertising: An Exploratory Investigation of the Bangkok’s Election",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2016,
    "type": "journal-article",
    "verified": "index",
    "indexUrl": "https://so03.tci-thaijo.org/index.php/jprad/article/view/132679",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Survey results of knowledge sharing preferences and practices in public health communication professionals in thailand's department of disease control: a descriptive study",
    "venue": "Journal of Health Research",
    "year": 2015,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.14456/jhr.2015.30",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "",
          "given": "",
          "literal": "Achara Bunchum"
        },
        {
          "family": "",
          "given": "",
          "literal": "Ornjaree Na Taguatung"
        },
        {
          "family": "Sukonthasab",
          "given": "Suchitra",
          "literal": ""
        },
        {
          "family": "",
          "given": "",
          "literal": "Smith Boonchutima"
        }
      ],
      "containerTitle": "",
      "volume": "29",
      "issue": "",
      "page": "",
      "publisher": "Chulalongkorn University Press",
      "year": 2015,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Key qualitative and quantitative indicators: towards an integrated evaluation framework for government websites in Thailand",
    "venue": "International Journal of Business and Systems Research",
    "year": 2014,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.1504/ijbsr.2014.060300",
    "authors": [
      "smith-boonchutima"
    ],
    "citation": {
      "authors": [
        {
          "family": "Boonchutima",
          "given": "Smith",
          "literal": ""
        }
      ],
      "containerTitle": "International Journal of Business and Systems Research",
      "volume": "8",
      "issue": "2",
      "page": "111",
      "publisher": "Inderscience Publishers",
      "year": 2014,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Thai Citizens' Utilization of Social Media Communications Devices during the Bangkok Governor Campaign in 2013",
    "venue": "American Society of Business and Behavioral Science",
    "year": 2014,
    "type": "conference-paper",
    "verified": "index",
    "indexUrl": "https://www.semanticscholar.org/paper/9bfa6a523337f70923e706cbfb2802f85bb57b76",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Mixed methods for public relations research: Environmental campaigns in Bangkok",
    "venue": "The International Graduate Conference 8",
    "year": 2013,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Global Warming Campaigns in Bangkok: Framing Analysis and Campaign Effectiveness",
    "venue": "The International Journal of Climate Change: Impacts and Responses",
    "year": 2012,
    "type": "journal-article",
    "verified": "doi",
    "doi": "10.18848/1835-7156/cgp/v03i04/37139",
    "authors": [
      "teerada-chongkolrattanaporn"
    ],
    "citation": {
      "authors": [
        {
          "family": "Chongkolrattanaporn",
          "given": "Teerada",
          "literal": ""
        }
      ],
      "containerTitle": "The International Journal of Climate Change: Impacts and Responses",
      "volume": "3",
      "issue": "4",
      "page": "53-70",
      "publisher": "Common Ground Research Networks",
      "year": 2012,
      "month": 0,
      "day": 0
    }
  },
  {
    "title": "Global warming in Bangkok: Framing analysis and campaign effectiveness",
    "venue": "The International Conference of Climate Change: Impacts & Responses",
    "year": 2012,
    "type": "conference-paper",
    "verified": "index",
    "indexUrl": "https://www.semanticscholar.org/paper/426eac9eaf89906eb87806330d66faf97945b336",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Green campaigns in Thailand: Use of mixed methods in environmental communication studies",
    "venue": "The International Graduate Conference 7",
    "year": 2011,
    "type": "conference-paper",
    "verified": "index",
    "indexUrl": "https://www.semanticscholar.org/paper/47734ec0f9fe2e60f9dfa7c90e6f837f712c3c5f",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Thai citizens and environmental myths: Public and private frames of global warming in Thailand",
    "venue": "The International Graduate Conference 6,",
    "year": 2010,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Global Warming in Bangkok: Environmental Network Communication",
    "venue": "Journal of Language and Culture",
    "year": 2009,
    "type": "journal-article",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Power and paradox: Global warming discourse in magazine advertisements",
    "venue": "The International Conference on Communication & Sustainable Development in the Next Decade",
    "year": 2009,
    "type": "conference-paper",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  },
  {
    "title": "Viral Communication through Forward E-mails and Audience Responses",
    "venue": "Journal of Public Relations and Advertising",
    "year": 2009,
    "type": "journal-article",
    "verified": "self",
    "authors": [
      "teerada-chongkolrattanaporn"
    ]
  }
];

/** รายการที่มีลิงก์ให้ผู้อ่านกดตรวจสอบเองได้ */
export const verifiablePublications = publications.filter((p) => p.verified !== "self");

export const publicationYears = [...new Set(publications.map((p) => p.year))].sort((a, b) => b - a);

export const publicationStats = {
  total: publications.length,
  verifiable: verifiablePublications.length,
  selfReported: publications.filter((p) => p.verified === "self").length,
  books: publications.filter((p) => p.type === "book").length,
  articles: publications.filter((p) => p.type === "journal-article").length,
  chapters:
    publications.filter((p) => p.type === "book-chapter").length +
    publications.reduce((sum, p) => sum + (p.chapters || 0), 0),
  conference: publications.filter((p) => p.type === "conference-paper").length,
  venues: new Set(publications.map((p) => p.venue).filter(Boolean)).size,
  since: Math.min(...publications.map((p) => p.year)),
};
