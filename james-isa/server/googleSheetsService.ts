// Server-side isolated Google Sheets Headless CMS Service
// Protected on server/edge tier - Zero client-side ID exposure
// Sheet ID: 1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM
// Structure:
// Col A: ID, Col B: TIMESTAMP, Col C: DOMAIN, Col D: SCHEMA, Col E: KATEGORI,
// Col F: TITLE, Col G: CONTENT (HTML), Col H: IMAGE, Col I: URL_SLUG, Col J: METADESC, Col K: STATUS

export interface ServerArticle {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  publishDate: string;
  readTime: string;
  tags: string[];
  summary: string;
  content: string;
  imageUrl?: string;
  codeSnippet?: string;
  domain?: string;
  status?: string;
  source: string;
}

const DEFAULT_SERVER_SHEET_ID = "1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM";

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

/**
 * Safely fetches and parses Google Sheet data on the server side.
 * The spreadsheet ID is resolved from server environment variables.
 */
export async function getArticlesFromSheetServer(): Promise<{
  articles: ServerArticle[];
  source: string;
  status: 'online' | 'fallback';
  count: number;
  error?: string;
}> {
  const sheetId = process.env.GOOGLE_SHEET_ID || DEFAULT_SERVER_SHEET_ID;

  try {
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    const response = await fetch(gvizUrl);

    if (!response.ok) {
      throw new Error(`Google Sheets responded with HTTP status ${response.status}`);
    }

    const rawText = await response.text();
    const jsonMatch = rawText.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);

    if (!jsonMatch || !jsonMatch[1]) {
      throw new Error("Invalid Google Sheets visualization response format");
    }

    const sheetData = JSON.parse(jsonMatch[1]);
    const cols = sheetData.table?.cols || [];
    const rows = sheetData.table?.rows || [];

    const colNames = cols.map((c: any, i: number) => (c?.label || `col_${i}`).trim().toUpperCase());

    const articles: ServerArticle[] = rows.map((r: any, idx: number) => {
      const getVal = (colIndex: number) => {
        const cell = r?.c?.[colIndex];
        if (!cell) return "";
        return cell?.f ?? cell?.v ?? "";
      };
      
      const findCol = (keys: string[]) => {
        const index = colNames.findIndex((name: string) => keys.some(k => name.includes(k)));
        return index !== -1 ? String(getVal(index)) : "";
      };

      const rowId = findCol(["ID"]) || String(getVal(0)) || `art-${idx + 1}`;
      const timestamp = findCol(["TIMESTAMP", "DATE", "TANGGAL"]) || String(getVal(1)) || "2024-2026";
      const domain = findCol(["DOMAIN"]) || String(getVal(2)) || "jimkoto.my.id";
      const kategoriRaw = findCol(["KATEGORI", "CATEGORY", "TOPIC"]) || String(getVal(4));
      const title = findCol(["TITLE", "JUDUL", "NAME"]) || String(getVal(5)) || `Artikel #${idx + 1}`;
      const rawContent = findCol(["CONTENT", "KONTEN", "BODY"]) || String(getVal(6)) || "";
      const imageUrl = findCol(["IMAGE", "GAMBAR", "FOTO"]) || String(getVal(7)) || "";
      const slugRaw = findCol(["URL_SLUG", "SLUG", "URL"]) || String(getVal(8));
      const metadesc = findCol(["METADESC", "SUMMARY", "RINGKASAN", "DESC"]) || String(getVal(9));
      const status = findCol(["STATUS"]) || String(getVal(10)) || "PUBLISHED";

      const cleanSummary = metadesc.trim() || stripHtml(rawContent).slice(0, 180) || "Artikel pilar oleh Jim Koto.";
      const slug = slugRaw.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const category = kategoriRaw.trim() || "Artikel & Analisis";
      const wordCount = stripHtml(rawContent).split(/\s+/).length;
      const readMins = Math.max(3, Math.round(wordCount / 180));

      return {
        id: `sheet-${rowId}-${idx}`,
        slug,
        title: title.trim(),
        category,
        author: "Jim Koto (James Isa)",
        publishDate: String(timestamp).trim(),
        readTime: `${readMins} min read`,
        tags: [category, "JimKoto", "Ecosystem", "Artikel"].filter(Boolean),
        summary: cleanSummary,
        content: rawContent,
        imageUrl: imageUrl.trim() || undefined,
        domain,
        status,
        source: "Google Sheets Server API"
      };
    }).filter((a: ServerArticle) => {
      const hasTitle = Boolean(a.title && a.title.trim() !== "" && !a.title.toUpperCase().includes("TITLE"));
      const isPublished = !a.status || a.status.toUpperCase().includes("PUBLISH") || a.status.toUpperCase() === "TRUE";
      return hasTitle && isPublished;
    });

    const sortedArticles = [...articles].reverse();

    return {
      articles: sortedArticles,
      source: "Secure Server-Side Google Sheets CMS",
      status: "online",
      count: sortedArticles.length
    };
  } catch (error: any) {
    console.warn("Server-side Google Sheets fetch warning, serving local fallback:", error.message);
    const fallbackArticles: ServerArticle[] = [
      {
        id: "gs-01",
        slug: "kesadaran-adalah-anugerah-arsitektur-kolam-akomoda",
        title: "Kesadaran Adalah Anugerah: Membangun Kolam Terawat di Tengah Samudera Meta 3.2B",
        category: "Filosofi & Pilar Utama",
        author: "Jim Koto (James Isa)",
        publishDate: "21 Apr 2024",
        readTime: "7 min read",
        tags: ["Akomoda", "Filosofi", "UMKM Indonesia"],
        summary: "Di tengah badai inflasi, kita tidak butuh samudera baru. Kita butuh kolam yang terawat. 4 Lapisan Evolusi Kesadaran dari Tanah ke Kolam.",
        content: "Kesadaran adalah anugerah. Bukan untuk dikuasai, tapi untuk dibagi. Akomoda Network menghadirkan kolam yang terawat di dalam samudera Meta untuk memajukan UMKM Indonesia.",
        imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_sample/s1600/akomoda-kolam.jpg",
        source: "server-fallback"
      }
    ];

    return {
      articles: fallbackArticles,
      source: "Local Secure Server Fallback",
      status: "fallback",
      count: fallbackArticles.length,
      error: error.message
    };
  }
}
