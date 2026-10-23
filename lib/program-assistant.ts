import { content, sourceUrl, type Locale } from "@/data/program-content";

export function answerQuestion(question: string, locale: Locale) {
  const q = question.toLowerCase();
  const ar = locale === "ar";
  const official = sourceUrl[locale];

  if (/vision|رؤية|الرؤية/.test(q)) {
    return {
      text: content[locale].visionText,
      url: official,
    };
  }

  if (/mission|رسالة|الرسالة/.test(q)) {
    return {
      text: content[locale].missionText,
      url: official,
    };
  }

  if (/objective|objectives|هدف|أهداف|الاهداف|الأهداف/.test(q)) {
    return {
      text: content[locale].objectives.join("\n"),
      url: official,
    };
  }

  if (/resource|academic|regulation|course|guide|مصادر|أكاديمي|لائحة|مقررات|دليل/.test(q)) {
    return {
      text: ar
        ? "يمكنك الوصول إلى اللوائح ومواصفات البرنامج والمقررات ودليل الطالب من الصفحة الرسمية. تحقق من توفر كل مستند وحداثته."
        : "The official program page lists academic resources, including regulations, program and course specifications, and student resources. Check each document's availability and currency.",
      url: official,
    };
  }

  if (/contact|email|phone|address|تواصل|بريد|هاتف|عنوان/.test(q)) {
    return {
      text: ar
        ? "البريد الإلكتروني: info@iaet.edu.eg\nالهاتف: 02 33594060\nالعنوان: المطار، إمبابة، الجيزة، مصر."
        : "Email: info@iaet.edu.eg\nPhone: 02 33594060\nAddress: Al Matar, Imbaba, Giza Governorate, Egypt.",
      url: "https://iaet.edu.eg/",
    };
  }

  return {
    text: content[locale].unknown,
    url: official,
  };
}
