export type SitePageSection = {
  title: string;
  description: string;
  items?: { title: string; description: string; href?: string; external?: boolean }[];
};

export type SitePageCopy = {
  eyebrow: string;
  title: string;
  description: string;
  sections: SitePageSection[];
  note?: string;
};

export const pageSlugs = [
  "about",
  "academics",
  "faculty",
  "laboratories",
  "research",
  "students",
  "quality",
  "news",
  "alumni",
  "contact",
] as const;

export type SitePageSlug = (typeof pageSlugs)[number];

export const sitePages: Record<SitePageSlug, { en: SitePageCopy; ar: SitePageCopy }> = {
  about: {
    en: {
      eyebrow: "THE PROGRAM / IAET",
      title: "Electronics & Communications Engineering",
      description: "A dedicated academic space for the Electronics & Communications Engineering Program at the Institute of Aviation Engineering & Technology — connected to the institute's official identity and academic ecosystem.",
      sections: [
        { title: "A program within IAET", description: "The program is part of the Institute of Aviation Engineering & Technology. The institute's official website describes IAET as an Egyptian educational institute established in 1997, with five years of study in English. Institute-wide details should be read in their institutional context.", items: [
          { title: "Institute profile", description: "Read the official institute overview, history and institutional information.", href: "https://www.iaet.edu.eg/" },
          { title: "Program page on IAET", description: "View the currently published Electronics & Communications program information.", href: "https://www.iaet.edu.eg/comm" }
        ]},
        { title: "Academic direction", description: "The currently published program page presents a vision focused on local and regional leadership, supported by quality in teaching, learning, research and community service. Its mission emphasizes an educational, training and research environment that keeps students connected to technological development and professional values." },
        { title: "What this website brings together", description: "Program identity, academic information, people, laboratories, research, student resources, quality information, news and contact channels — organized as one bilingual destination." }
      ],
      note: "Program-specific history, establishment date, enrollment figures and approved strategic statements require confirmation from the department before publication."
    },
    ar: {
      eyebrow: "البرنامج / معهد IAET",
      title: "برنامج هندسة الإلكترونيات والاتصالات",
      description: "مساحة أكاديمية مخصصة لبرنامج هندسة الإلكترونيات والاتصالات بمعهد هندسة وتكنولوجيا الطيران، مرتبطة بالهوية الرسمية للمعهد ومنظومته الأكاديمية.",
      sections: [
        { title: "برنامج داخل منظومة IAET", description: "البرنامج أحد البرامج العلمية بمعهد هندسة وتكنولوجيا الطيران. ويذكر الموقع الرسمي أن المعهد مؤسسة تعليمية مصرية تأسست عام 1997، وتقدم خمس سنوات دراسية باللغة الإنجليزية. وتظل هذه معلومات على مستوى المعهد وليست تفاصيل خاصة بالبرنامج وحده.", items: [
          { title: "عن المعهد", description: "الاطلاع على النبذة الرسمية والتاريخ والمعلومات المؤسسية.", href: "https://www.iaet.edu.eg/ar/" },
          { title: "صفحة البرنامج الرسمية", description: "الاطلاع على المعلومات المنشورة حاليًا عن برنامج الإلكترونيات والاتصالات.", href: "https://www.iaet.edu.eg/ar/comm" }
        ]},
        { title: "التوجه الأكاديمي", description: "تعرض صفحة البرنامج المنشورة رؤية تستهدف الريادة محليًا وإقليميًا، وفق معايير الجودة في التعليم والتعلم والبحث العلمي وخدمة المجتمع. كما تؤكد الرسالة على توفير بيئة تعليمية وتدريبية وبحثية تواكب التطور التكنولوجي وتلتزم بالقيم والأخلاق المهنية." },
        { title: "ماذا يجمع هذا الموقع؟", description: "هوية البرنامج، والمعلومات الأكاديمية، وأعضاء هيئة التدريس، والمعامل، والبحث العلمي، وخدمات الطلاب، والجودة، والأخبار، ووسائل التواصل؛ في وجهة واحدة ثنائية اللغة." }
      ],
      note: "تحتاج المعلومات الخاصة بتاريخ البرنامج وأعداد الطلاب والقبول والبيانات الاستراتيجية المعتمدة إلى تأكيد رسمي من القسم قبل النشر."
    }
  },
  academics: {
    en: {
      eyebrow: "ACADEMIC LIFE",
      title: "Academic program & study resources",
      description: "A structured place for the approved study plan, course information, regulations and academic documents. Only current, department-approved versions should be treated as authoritative.",
      sections: [
        { title: "Program framework", description: "The institute's public website describes a five-year study period in English. The current program-specific study plan, credit-hour structure, progression rules and graduation requirements must be supplied and approved by the department." },
        { title: "Program and course specifications", description: "The existing official program page links to program and course specifications. The latest accessible files, approval dates and version history are required before publishing a searchable catalogue.", items: [
          { title: "Current program resources", description: "Open the official program page and its published academic-resource links.", href: "https://www.iaet.edu.eg/comm" }
        ]},
        { title: "Academic documents to publish", description: "The website structure is ready to host approved documents and organize them by academic year and level.", items: [
          { title: "Internal regulations", description: "Approved current internal regulations and amendments." },
          { title: "Study plan", description: "Course sequence, credit hours, prerequisites and semester distribution." },
          { title: "Course catalogue", description: "Course codes, titles, descriptions, learning outcomes and assessment methods." },
          { title: "Academic calendar", description: "Approved term dates, registration windows and examination periods." }
        ]}
      ],
      note: "No course codes, credit hours, prerequisites, grading rules or study schedules have been invented. These require current approved source files."
    },
    ar: {
      eyebrow: "الحياة الأكاديمية",
      title: "البرنامج الأكاديمي ومصادر الدراسة",
      description: "مساحة منظمة للخطة الدراسية المعتمدة، ومعلومات المقررات، واللوائح، والمستندات الأكاديمية. ولا يُعتد بأي نسخة إلا بعد التأكد من حداثتها واعتمادها من القسم.",
      sections: [
        { title: "الإطار الأكاديمي", description: "يذكر الموقع الرسمي للمعهد أن مدة الدراسة خمس سنوات وباللغة الإنجليزية. أما الخطة الدراسية الخاصة بالبرنامج، ونظام الساعات، وقواعد الانتقال والتخرج، فيجب تزويدنا بنسختها الحالية المعتمدة من القسم." },
        { title: "مواصفات البرنامج والمقررات", description: "تتضمن صفحة البرنامج الرسمية رابطًا لمواصفات البرنامج والمقررات. ونحتاج أحدث الملفات المتاحة وتواريخ اعتمادها وإصداراتها قبل إنشاء دليل مقررات قابل للبحث.", items: [
          { title: "المصادر الأكاديمية الرسمية", description: "فتح صفحة البرنامج والروابط الأكاديمية المنشورة بها.", href: "https://www.iaet.edu.eg/ar/comm" }
        ]},
        { title: "المستندات الأكاديمية المطلوبة للنشر", description: "هيكل الموقع جاهز لاستضافة المستندات المعتمدة وتنظيمها حسب العام الدراسي والفرقة.", items: [
          { title: "اللائحة الداخلية", description: "اللائحة الحالية المعتمدة والتعديلات اللاحقة." },
          { title: "الخطة الدراسية", description: "تسلسل المقررات والساعات والمتطلبات السابقة وتوزيع الفصول." },
          { title: "دليل المقررات", description: "أكواد المقررات وأسماؤها ووصفها ومخرجاتها وطرق التقييم." },
          { title: "التقويم الأكاديمي", description: "مواعيد الفصول والتسجيل والامتحانات المعتمدة." }
        ]}
      ],
      note: "لم تتم إضافة أكواد مقررات أو ساعات معتمدة أو متطلبات سابقة أو قواعد درجات أو جداول دراسية من عندنا؛ كل ذلك يحتاج إلى ملفات رسمية حديثة."
    }
  },
  faculty: {
    en: {
      eyebrow: "PEOPLE / ACADEMIC STAFF",
      title: "Faculty & teaching assistants",
      description: "An academic directory designed to make the department's people, roles, expertise and approved contact channels easy to discover.",
      sections: [
        { title: "Published directory status", description: "The current IAET program page displays a head-of-department entry and a number of teaching staff and assistant staff. Some linked staff documents on that page appear to be from 2023–2024, so the displayed roster must be reconfirmed before it is carried into this new website.", items: [
          { title: "Existing public staff listing", description: "Review the names and roles currently shown by IAET.", href: "https://www.iaet.edu.eg/comm" }
        ]},
        { title: "Individual profile format", description: "Each approved profile can include the member's official name, academic title, department role, qualifications, research interests, courses taught, selected publications, official email and an approved portrait." },
        { title: "Academic and supporting staff", description: "Separate directories can be provided for faculty members, assistant lecturers, teaching assistants, demonstrators and administrative support, using the department's approved classifications." }
      ],
      note: "No personal contact details or biographies will be added without department approval and the individual's consent where required."
    },
    ar: {
      eyebrow: "الأشخاص / الكادر الأكاديمي",
      title: "أعضاء هيئة التدريس والهيئة المعاونة",
      description: "دليل أكاديمي يساعد الزائر على التعرف على أعضاء القسم وتخصصاتهم وأدوارهم ووسائل التواصل المعتمدة.",
      sections: [
        { title: "حالة البيانات المنشورة حاليًا", description: "تعرض صفحة البرنامج الحالية على موقع IAET اسمًا لمدير القسم وعددًا من أعضاء هيئة التدريس والهيئة المعاونة. وبعض الملفات المرتبطة بها تحمل تواريخ من العام 2023–2024؛ لذلك يجب مراجعة القائمة الحالية واعتمادها قبل نقلها إلى الموقع الجديد.", items: [
          { title: "القائمة المنشورة حاليًا", description: "مراجعة الأسماء والوظائف الظاهرة حاليًا على موقع المعهد.", href: "https://www.iaet.edu.eg/ar/comm" }
        ]},
        { title: "شكل الملف الشخصي", description: "يمكن أن يتضمن الملف المعتمد الاسم الرسمي والدرجة والوظيفة بالقسم والمؤهلات والاهتمامات البحثية والمقررات التي يدرسها والأبحاث المختارة والبريد الرسمي وصورة شخصية معتمدة." },
        { title: "هيئة التدريس والهيئة المعاونة", description: "يمكن تنظيم الدليل في قوائم منفصلة لأعضاء هيئة التدريس والمدرسين المساعدين والمعيدين والهيئة الإدارية، وفق التصنيفات التي يعتمدها القسم." }
      ],
      note: "لن نضيف بيانات تواصل شخصية أو سيرًا ذاتية دون اعتماد القسم وموافقة أصحاب البيانات عند الحاجة."
    }
  },
  laboratories: {
    en: {
      eyebrow: "FACILITIES / HANDS-ON LEARNING",
      title: "Laboratories & technical facilities",
      description: "A visual directory of the department's laboratories, practical learning spaces, equipment and technical capabilities — once the department provides an approved inventory.",
      sections: [
        { title: "Laboratory directory", description: "The current official program page contains a Labs link, but the accessible page does not provide a complete, verifiable laboratory inventory. This website will not invent laboratory names or equipment." },
        { title: "What each laboratory page can show", description: "Official lab name, purpose, related courses, responsible staff, equipment categories, safety guidance, opening or booking rules, photographs and student projects." },
        { title: "Facility gallery", description: "Approved photographs and short videos can document the real spaces, equipment and student practical work. Each asset should include a caption, date and permission status.", items: [
          { title: "Current official program page", description: "Access the existing Labs link from the official program page.", href: "https://www.iaet.edu.eg/comm" }
        ]}
      ],
      note: "Laboratory names, equipment lists, photographs, safety instructions and access rules are pending department confirmation."
    },
    ar: {
      eyebrow: "الإمكانات / التعلم العملي",
      title: "المعامل والتجهيزات الفنية",
      description: "دليل بصري لمعامل القسم ومساحات التدريب العملي والأجهزة والإمكانات الفنية، بعد تزويدنا بحصر معتمد من القسم.",
      sections: [
        { title: "دليل المعامل", description: "تحتوي صفحة البرنامج الرسمية الحالية على رابط للمعامل، لكن الصفحة المتاحة لا تعرض حصرًا كاملًا يمكن التحقق منه. لذلك لن نخترع أسماء معامل أو أجهزة." },
        { title: "ماذا تعرض صفحة كل معمل؟", description: "الاسم الرسمي للمعمل، والغرض منه، والمقررات المرتبطة به، والمسؤولون عنه، وفئات الأجهزة، وإرشادات السلامة، وقواعد الحضور أو الحجز، والصور ومشروعات الطلاب." },
        { title: "معرض الإمكانات", description: "يمكن عرض صور وفيديوهات معتمدة توثق المعامل والأجهزة والتطبيقات العملية، مع وصف وتاريخ وحالة حقوق الاستخدام.", items: [
          { title: "صفحة البرنامج الرسمية", description: "الوصول إلى رابط المعامل المنشور حاليًا.", href: "https://www.iaet.edu.eg/ar/comm" }
        ]}
      ],
      note: "أسماء المعامل وقوائم الأجهزة والصور وتعليمات السلامة وقواعد الاستخدام ما زالت في انتظار اعتماد القسم."
    }
  },
  research: {
    en: {
      eyebrow: "RESEARCH / INNOVATION",
      title: "Research & graduation projects",
      description: "A place to present the department's research priorities, academic outputs, student innovation and graduation projects using verified records.",
      sections: [
        { title: "Research direction", description: "The published program mission refers to research and keeping pace with technological development. The current approved departmental research plan, priority areas and review period are needed to describe the research strategy accurately." },
        { title: "Graduation projects", description: "Projects can be searchable by year, technical field, supervisor and project type. Each entry should have an approved title, short abstract, team members, supervisor, images or demo link, and publication permission.", items: [
          { title: "Official program resources", description: "The official program page currently links to research-plan and graduation-project resources.", href: "https://www.iaet.edu.eg/comm" }
        ]},
        { title: "Publications & partnerships", description: "The site can host selected publications, conference contributions, research groups, funded projects and verified partnerships after the department approves the records and links." }
      ],
      note: "No research projects, publication counts, funding figures or partner organizations are assumed."
    },
    ar: {
      eyebrow: "البحث العلمي / الابتكار",
      title: "البحث العلمي ومشروعات التخرج",
      description: "مساحة لعرض أولويات البحث بالقسم ومخرجاته العلمية وابتكارات الطلاب ومشروعات التخرج، بالاعتماد على بيانات موثقة.",
      sections: [
        { title: "التوجه البحثي", description: "تشير رسالة البرنامج المنشورة إلى البحث العلمي ومواكبة التطور التكنولوجي. ونحتاج الخطة البحثية الحالية المعتمدة للقسم، ومجالات الأولوية، والفترة الزمنية التي تغطيها؛ حتى نصف التوجه البحثي بدقة." },
        { title: "مشروعات التخرج", description: "يمكن البحث في المشروعات حسب العام والمجال الفني والمشرف ونوع المشروع. ويحتاج كل مشروع إلى عنوان معتمد وملخص وأسماء الفريق والمشرف وصور أو رابط عرض وموافقة على النشر.", items: [
          { title: "المصادر الرسمية للبرنامج", description: "تتضمن صفحة البرنامج الحالية روابط للخطة البحثية ومشروعات التخرج.", href: "https://www.iaet.edu.eg/ar/comm" }
        ]},
        { title: "الأبحاث والشراكات", description: "يمكن نشر أبحاث مختارة ومشاركات المؤتمرات والمجموعات البحثية والمشروعات الممولة والشراكات بعد اعتماد بياناتها وروابطها من القسم." }
      ],
      note: "لم نفترض وجود مشروعات أو أعداد أبحاث أو تمويل أو جهات شريكة دون مصدر معتمد."
    }
  },
  students: {
    en: {
      eyebrow: "STUDENT EXPERIENCE",
      title: "Student services & resources",
      description: "A practical student hub for current academic documents, announcements, schedules, forms, guidance and official service links.",
      sections: [
        { title: "Academic resources", description: "Students should be able to find the latest approved student guide, study regulations, course specifications, academic calendar and advising information in one place." },
        { title: "Schedules & announcements", description: "The department can publish current lecture, laboratory and examination schedules, along with dated announcements. Older schedules should be archived and clearly labelled by academic year.", items: [
          { title: "Current official program page", description: "The existing program page links to schedules and student resources; their latest versions need verification.", href: "https://www.iaet.edu.eg/comm" },
          { title: "IAET electronic services", description: "Visit the institute's official electronic services hub.", href: "https://www.iaet.edu.eg/electronic-services" }
        ]},
        { title: "Student support", description: "Approved information can cover academic advising, office hours, student activities, complaints and suggestions, practical training and department contacts." }
      ],
      note: "Personal student records, grades and account services should remain inside the institute's approved secure systems, not be recreated on this public website."
    },
    ar: {
      eyebrow: "تجربة الطالب",
      title: "الخدمات والمصادر الطلابية",
      description: "بوابة عملية للطلاب تجمع المستندات الأكاديمية والإعلانات والجداول والنماذج والإرشادات وروابط الخدمات الرسمية.",
      sections: [
        { title: "المصادر الأكاديمية", description: "يجب أن يجد الطالب أحدث دليل طالب معتمد، واللائحة الدراسية، ومواصفات المقررات، والتقويم الأكاديمي، ومعلومات الإرشاد في مكان واحد." },
        { title: "الجداول والإعلانات", description: "يمكن للقسم نشر جداول المحاضرات والمعامل والامتحانات الحالية، مع إعلانات مؤرخة. ويجب أرشفة الجداول القديمة وتمييزها بالعام الدراسي.", items: [
          { title: "صفحة البرنامج الرسمية", description: "تحتوي الصفحة الحالية على روابط للجداول والمصادر الطلابية، ونحتاج التحقق من أحدث نسخها.", href: "https://www.iaet.edu.eg/ar/comm" },
          { title: "الخدمات الإلكترونية للمعهد", description: "زيارة بوابة الخدمات الإلكترونية الرسمية للمعهد.", href: "https://www.iaet.edu.eg/ar/electronic-services" }
        ]},
        { title: "دعم الطلاب", description: "يمكن نشر معلومات معتمدة عن الإرشاد الأكاديمي والساعات المكتبية والأنشطة الطلابية والشكاوى والمقترحات والتدريب العملي ووسائل التواصل مع القسم." }
      ],
      note: "يجب أن تظل سجلات الطلاب الشخصية والدرجات والحسابات داخل الأنظمة الآمنة المعتمدة بالمعهد، ولا يعاد إنشاؤها على الموقع العام."
    }
  },
  quality: {
    en: {
      eyebrow: "QUALITY / ACCREDITATION",
      title: "Quality assurance & continuous improvement",
      description: "A transparent overview of the program's quality framework, assessment activities and continuous-improvement process, based on approved evidence.",
      sections: [
        { title: "Institutional context", description: "The IAET homepage states that its scientific departments are accredited by the National Authority for Quality Assurance and Accreditation of Education. The current official page also refers to institute accreditation for academic year 2024/2025. The department must provide the exact current certificate, scope and validity before this is presented as a current status." },
        { title: "Program quality framework", description: "The site can explain program learning outcomes, course assessment, stakeholder feedback, annual monitoring, improvement plans and the responsibilities of the quality team once approved documents are available." },
        { title: "Evidence & documents", description: "Approved policies, reports, surveys, action plans, course reports and accreditation documents can be organized by academic year and document category.", items: [
          { title: "IAET official website", description: "Review the institute's public quality and declared-document sections.", href: "https://www.iaet.edu.eg/" }
        ]}
      ],
      note: "Accreditation statements, dates, certificates, program status and quality metrics must be checked against current official documents before publication."
    },
    ar: {
      eyebrow: "الجودة / الاعتماد",
      title: "ضمان الجودة والتطوير المستمر",
      description: "عرض واضح لإطار الجودة في البرنامج وأنشطة التقييم والتطوير المستمر، بالاعتماد على مستندات وأدلة معتمدة.",
      sections: [
        { title: "السياق المؤسسي", description: "تذكر الصفحة الرئيسية للمعهد أن أقسامه العلمية معتمدة من الهيئة القومية لضمان جودة التعليم والاعتماد. كما تشير صفحة البرنامج الحالية إلى اعتماد المعهد للعام الأكاديمي 2024/2025. ويجب تزويدنا بالشهادة الحالية ونطاقها ومدتها قبل عرض ذلك باعتباره حالة اعتماد سارية." },
        { title: "إطار جودة البرنامج", description: "يمكن للموقع شرح مخرجات التعلم وتقييم المقررات وآراء الأطراف المعنية والمتابعة السنوية وخطط التحسين ومسؤوليات فريق الجودة بعد استلام المستندات المعتمدة." },
        { title: "الأدلة والمستندات", description: "يمكن تنظيم السياسات والتقارير والاستبيانات وخطط العمل وتقارير المقررات ومستندات الاعتماد حسب العام الدراسي ونوع المستند.", items: [
          { title: "الموقع الرسمي للمعهد", description: "مراجعة أقسام الجودة والمستندات المعلنة على موقع المعهد.", href: "https://www.iaet.edu.eg/ar/" }
        ]}
      ],
      note: "يجب مراجعة عبارات الاعتماد وتواريخه وشهاداته وحالة البرنامج ومؤشرات الجودة في مستندات رسمية حديثة قبل النشر."
    }
  },
  news: {
    en: {
      eyebrow: "NEWS / EVENTS",
      title: "Department news & events",
      description: "A dated record of academic announcements, seminars, workshops, student activities, visits, competitions and department achievements.",
      sections: [
        { title: "News publishing", description: "Each news item should include a verified title, publication date, event date when different, concise summary, approved photographs, category and an optional official source link." },
        { title: "Events calendar", description: "The department can publish upcoming seminars, guest lectures, workshops, academic events and student activities with confirmed dates, venues and registration instructions." },
        { title: "Existing institute news", description: "Institute-wide news should be clearly distinguished from department news and linked to its original official source.", items: [
          { title: "IAET news", description: "Browse news and announcements published by the institute.", href: "https://www.iaet.edu.eg/" }
        ]}
      ],
      note: "The page will not display invented dates, events, awards or announcements. It needs an approved editorial contact and current news archive."
    },
    ar: {
      eyebrow: "الأخبار / الفعاليات",
      title: "أخبار وفعاليات القسم",
      description: "سجل مؤرخ للإعلانات الأكاديمية والندوات وورش العمل والأنشطة الطلابية والزيارات والمسابقات وإنجازات القسم.",
      sections: [
        { title: "نشر الأخبار", description: "يحتوي كل خبر على عنوان موثق وتاريخ النشر وتاريخ الفعالية عند اختلافه وملخص موجز وصور معتمدة وتصنيف ورابط للمصدر الرسمي عند وجوده." },
        { title: "تقويم الفعاليات", description: "يمكن للقسم نشر الندوات والمحاضرات وورش العمل والفعاليات الأكاديمية والأنشطة الطلابية القادمة، مع المواعيد والأماكن وتعليمات التسجيل المؤكدة." },
        { title: "أخبار المعهد", description: "يجب تمييز أخبار المعهد العامة عن أخبار القسم وربطها بمصدرها الرسمي الأصلي.", items: [
          { title: "أخبار IAET", description: "تصفح الأخبار والإعلانات المنشورة من المعهد.", href: "https://www.iaet.edu.eg/ar/" }
        ]}
      ],
      note: "لن نعرض تواريخ أو فعاليات أو جوائز أو إعلانات غير مؤكدة. نحتاج مسؤولًا معتمدًا عن المحتوى وأرشيف الأخبار الحالي."
    }
  },
  alumni: {
    en: {
      eyebrow: "GRADUATES / COMMUNITY",
      title: "Alumni & professional connections",
      description: "A space to keep graduates connected to the department, celebrate verified achievements and support professional engagement.",
      sections: [
        { title: "Alumni profiles", description: "With permission, the department can feature graduate stories, current professional roles, projects and career journeys. Every profile should be reviewed by the graduate before publication." },
        { title: "Career and industry connections", description: "Verified training opportunities, employer partnerships, career events, job announcements and professional-development activities can be listed with dates and official contact details." },
        { title: "Alumni engagement", description: "A future alumni directory or survey can be linked to an institute-approved form or platform. Personal information should only be collected with a clear purpose and appropriate consent." }
      ],
      note: "Graduate numbers, employment rates, employer names and success stories require documented evidence and approval."
    },
    ar: {
      eyebrow: "الخريجون / المجتمع المهني",
      title: "الخريجون والتواصل المهني",
      description: "مساحة للحفاظ على ارتباط الخريجين بالقسم، وإبراز إنجازاتهم الموثقة، ودعم التواصل المهني.",
      sections: [
        { title: "ملفات الخريجين", description: "يمكن للقسم نشر قصص الخريجين ومساراتهم المهنية ومشروعاتهم بعد الحصول على موافقتهم ومراجعة كل ملف قبل النشر." },
        { title: "التواصل مع سوق العمل", description: "يمكن عرض فرص التدريب المعتمدة وشراكات جهات التوظيف والفعاليات المهنية وإعلانات الوظائف وأنشطة التطوير المهني، مع التواريخ ووسائل التواصل الرسمية." },
        { title: "التواصل مع الخريجين", description: "يمكن ربط دليل الخريجين أو الاستبيانات المستقبلية بنموذج أو منصة معتمدة من المعهد، مع توضيح الغرض من جمع البيانات والحصول على الموافقات اللازمة." }
      ],
      note: "أعداد الخريجين ومعدلات التوظيف وأسماء جهات العمل وقصص النجاح تحتاج إلى أدلة موثقة واعتماد رسمي."
    }
  },
  contact: {
    en: {
      eyebrow: "CONTACT / IAET",
      title: "Contact the department",
      description: "Find the institute's published contact channels and the official route for department enquiries.",
      sections: [
        { title: "Institute contact details", description: "The official IAET website currently publishes the following institute-wide contact information.", items: [
          { title: "Email", description: "info@iaet.edu.eg", href: "mailto:info@iaet.edu.eg" },
          { title: "Telephone", description: "02 33594060", href: "tel:+20233594060" },
          { title: "Address", description: "IAET, Al Matar, Imbaba, Giza Governorate, Egypt." },
          { title: "Official website", description: "Open the institute's official website.", href: "https://www.iaet.edu.eg/" }
        ]},
        { title: "Department enquiries", description: "A dedicated department email, office location, office hours and escalation contact will be displayed after the department confirms the correct public channels." },
        { title: "Location & directions", description: "The official institute website identifies the location as Al Matar, Imbaba, Giza Governorate. A verified map pin and visitor instructions should be supplied by the institute." }
      ],
      note: "The email and telephone above are institute-wide details published on IAET's website, not a confirmed dedicated department contact."
    },
    ar: {
      eyebrow: "التواصل / IAET",
      title: "تواصل مع القسم",
      description: "اعثر على وسائل التواصل المنشورة للمعهد والطريقة الرسمية للاستفسار عن البرنامج.",
      sections: [
        { title: "بيانات التواصل المنشورة للمعهد", description: "ينشر الموقع الرسمي للمعهد حاليًا بيانات التواصل العامة التالية.", items: [
          { title: "البريد الإلكتروني", description: "info@iaet.edu.eg", href: "mailto:info@iaet.edu.eg" },
          { title: "الهاتف", description: "02 33594060", href: "tel:+20233594060" },
          { title: "العنوان", description: "معهد هندسة وتكنولوجيا الطيران، المطار، إمبابة، محافظة الجيزة، مصر." },
          { title: "الموقع الرسمي", description: "زيارة الموقع الرسمي للمعهد.", href: "https://www.iaet.edu.eg/ar/" }
        ]},
        { title: "استفسارات القسم", description: "سيتم نشر بريد القسم ومقر المكتب ومواعيد استقبال الطلاب وجهة التواصل المختصة بعد تأكيد القنوات العامة الصحيحة من القسم." },
        { title: "الموقع والاتجاهات", description: "يحدد الموقع الرسمي موقع المعهد في المطار بإمبابة بمحافظة الجيزة. ونحتاج رابط موقع جغرافي معتمد وتعليمات الزيارة من المعهد." }
      ],
      note: "البريد والهاتف المذكوران بيانات عامة للمعهد منشورة على موقع IAET، وليسا وسيلة تواصل مستقلة مؤكدة للقسم."
    }
  }
};
