import { NextResponse } from "next/server";
import { content, sourceUrl } from "@/data/program-content";
import { leadershipProfile } from "@/data/leadership";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const allowedLinks = [
  { label: "IAET official website", url: "https://www.iaet.edu.eg/" },
  { label: "Electronics & Communications program", url: "https://www.iaet.edu.eg/comm" },
  { label: "Contact IAET", url: "https://iaet.edu.eg/contactus" },
  { label: "Arabic program page", url: "https://iaet.edu.eg/ar/comm" },
];

function knowledgeBase() {
  return JSON.stringify({
    institute: {
      name: "Institute of Aviation Engineering & Technology (IAET)",
      established: 1997,
      affiliation: "Egyptian Academy of Aviation Sciences – Ministry of Civil Aviation",
      study: "Five years of study in English",
      academicSupervision: "The official website states that Cairo University develops the study regulations and participates in teaching and supervision under an agreement signed on 12/10/1997.",
      oversight: "The official website states that the institute is under the supervision of the Ministry of Higher Education under Decree No. 925 for 2000.",
      accreditation: "The official website states that all scientific departments are accredited by the National Authority for Quality Assurance and Accreditation of Education.",
      address: "Al Matar, Imbaba, Giza Governorate, Egypt",
      email: "info@iaet.edu.eg",
      phone: "02 33594060"
    },
    programs: [
      "Aeronautical Engineering",
      "Electronics and Communications Engineering",
      "Mechanical Engineering",
      "Electrical Power and Machines Engineering",
      "Architectural Engineering",
      "Civil Engineering"
    ],
    department: {
      english: content.en,
      arabic: content.ar,
      leadership: leadershipProfile,
      officialUrls: sourceUrl
    },
    navigation: allowedLinks
  });
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "The assistant is not configured yet. Add GEMINI_API_KEY to the server environment." },
        { status: 503 }
      );
    }

    const body = await request.json();
    const question = typeof body.question === "string" ? body.question.trim() : "";
    const locale = body.locale === "ar" ? "ar" : "en";
    if (!question || question.length > 1200) {
      return NextResponse.json({ error: "Please enter a question (up to 1,200 characters)." }, { status: 400 });
    }

    const systemInstruction = `You are the official-style digital information assistant for the Institute of Aviation Engineering & Technology (IAET), with special depth in the Electronics & Communications Engineering program.
Answer in the same language as the user's question (Arabic Egyptian-friendly Modern Standard Arabic, or English). Be warm, concise, accurate, and helpful.
Use ONLY the supplied knowledge base for institute-specific factual claims. Never invent fees, admission dates, staff details, schedules, regulations, course plans, room numbers, or page URLs. If information is missing or may change, say so clearly and direct the user to contact IAET or ask the department.
Help users navigate. When a supplied link is relevant, return its exact URL in links. Only use URLs from the navigation allowlist. Do not fabricate deep links. You may link to the official institute homepage, official ECE page, contact page, or Arabic ECE page.
For department questions, use the supplied vision, mission, objectives and leadership information. Make clear that the information reflects the current demo knowledge base and should be confirmed by the department before publication.
Return valid JSON only with this shape: {"answer":"...","links":[{"label":"...","url":"..."}]}. Return no more than 2 links. If no link is useful, return an empty array.
Knowledge base: ${knowledgeBase()}`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: systemInstruction }] },
          contents: [{ role: "user", parts: [{ text: question }] }],
          generationConfig: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                answer: { type: "STRING" },
                links: {
                  type: "ARRAY",
                  items: {
                    type: "OBJECT",
                    properties: {
                      label: { type: "STRING" },
                      url: { type: "STRING" }
                    },
                    required: ["label", "url"]
                  }
                }
              },
              required: ["answer", "links"]
            },
            temperature: 0.25,
            maxOutputTokens: 700
          }
        })
      }
    );

    if (!response.ok) {
      const detail = await response.text();
      console.error("Gemini API error:", response.status, detail.slice(0, 500));
      return NextResponse.json({ error: "The assistant is temporarily unavailable. Please try again shortly." }, { status: 502 });
    }

    const payload = await response.json();
    const raw = payload.candidates?.[0]?.content?.parts?.map((part: { text?: string }) => part.text ?? "").join("") ?? "";
    let parsed: { answer?: string; links?: { label?: string; url?: string }[] };
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: "I couldn't prepare a reliable answer. Please try rephrasing your question." }, { status: 502 });
    }

    const safeUrls = new Set(allowedLinks.map((item) => item.url));
    const links = (Array.isArray(parsed.links) ? parsed.links : [])
      .filter((item) => item && typeof item.url === "string" && safeUrls.has(item.url))
      .slice(0, 2)
      .map((item) => ({ label: String(item.label || "Official IAET page"), url: item.url! }));

    return NextResponse.json({
      answer: typeof parsed.answer === "string" && parsed.answer.trim()
        ? parsed.answer.trim()
        : (locale === "ar" ? "لم أتمكن من إعداد إجابة موثوقة. حاول صياغة السؤال بطريقة أخرى." : "I couldn't prepare a reliable answer. Please rephrase your question."),
      links
    });
  } catch (error) {
    console.error("IAET assistant route error:", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
