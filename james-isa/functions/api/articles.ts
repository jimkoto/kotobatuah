/**
 * Cloudflare Pages Functions - /api/articles & /api/cms/articles
 * Edge Headless CMS proxy for jimkoto.my.id
 * Exact Column Mapping for Google Sheet 1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM:
 * Col A: ID, Col B: TIMESTAMP, Col C: DOMAIN, Col D: SCHEMA, Col E: KATEGORI,
 * Col F: TITLE, Col G: CONTENT (HTML), Col H: IMAGE, Col I: URL_SLUG, Col J: METADESC, Col K: STATUS
 */

type PagesFunction<T = any> = (context: {
  env: T;
  request: Request;
  params?: any;
  next?: () => Promise<Response>;
  data?: any;
}) => Promise<Response> | Response;

interface Env {
  GOOGLE_SHEET_ID?: string;
  GOOGLE_SHEET_TAB?: string;
  GOOGLE_SHEET_GID?: string;
  GEMINI_API_KEY?: string;
}

function stripHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").replace(/\s+/g, " ").trim();
}

function getFallbackArticles() {
  return [
    {
      id: 'pillar-01',
      slug: 'kesadaran-adalah-anugerah-arsitektur-kolam-akomoda',
      title: 'Kesadaran Adalah Anugerah: Membangun Kolam Terawat di Tengah Samudera Meta 3.2B',
      category: 'Filosofi & Pilar Utama',
      author: 'Jim Koto (James Isa)',
      publishDate: '21 Apr 2024',
      readTime: '7 min read',
      tags: ['Akomoda', 'Filosofi', 'UMKM Indonesia', 'Evolusi 20 Tahun'],
      summary: 'Di tengah badai inflasi, kita tidak butuh samudera baru. Kita butuh kolam yang terawat. Menghubungkan 4 Lapisan Kesadaran dari Tanah Microsoft, Benih Google, Samudera Meta, hingga Kolam Akomoda.',
      content: `Kesadaran adalah anugerah. Bukan untuk dimonopoli, melainkan untuk dibagikan guna memberdayakan masyarakat dan UMKM Indonesia.\n\n4 Lapisan Evolusi Kesadaran:\n1. Layer 1: Microsoft (Tanah) - Fondasi komputasi dan struktur logika.\n2. Layer 2: Google (Benih) - Workspace, Drive, Cloud, dan ekosistem pengetahuan terbuka.\n3. Layer 3: Meta 3.2B (Samudera) - Lautan audiens tanpa batas yang perlu diarahkan.\n4. Layer 4: Akomoda (Kolam) - Tempat berlindung yang aman, efisien, dan mandiri bagi pebisnis lokal.`,
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_sample/s1600/akomoda-kolam.jpg',
      source: 'Curated Cache',
      isPillar: true
    },
    {
      id: 'pillar-02',
      slug: 'berolahragalah-agar-badan-sehat-pikiran',
      title: 'Berolahragalah Agar Badan Sehat dan Pikiran Jernih',
      category: 'Kesehatan & Pola Hidup',
      author: 'Jim Koto (James Isa)',
      publishDate: '21 Apr 2024',
      readTime: '5 min read',
      tags: ['Kesehatan', 'Mindset', 'Produktivitas'],
      summary: 'Berolahragalah Agar Badan Sehat, Pikiran Tenang, dan Siap Menghadapi Tantangan Setiap Hari.',
      content: `<p>Berolahraga secara teratur bukan hanya tentang kebugaran fisik, melainkan fondasi utama kejernihan pikiran dalam merancang arsitektur sistem dan kehidupan yang seimbang.</p><p>Kesehatan fisik memberikan energi dan fokus mental yang prima untuk menyelesaikan berbagai tantangan teknis maupun manajerial dalam ekosistem digital.</p>`,
      imageUrl: 'https://img.youtube.com/vi/jQUxqcnQrok/hqdefault.jpg',
      source: 'Google Sheet Live',
      isPillar: true
    },
    {
      id: 'pillar-03',
      slug: 'tips-yang-bisa-anda-ikuti-jika-ingin',
      title: 'Tips yang Bisa Anda Ikuti Jika Ingin Membangun Bisnis Digital yang Berkelanjutan',
      category: 'Bisnis Digital & UMKM',
      author: 'Jim Koto (James Isa)',
      publishDate: '15 Mei 2024',
      readTime: '6 min read',
      tags: ['BisnisDigital', 'UMKM', 'Akomoda', 'TipsSukses'],
      summary: 'Langkah praktis dan teruji membangun pondasi bisnis digital: Dari pemanfaatan Google Sheet sebagai CRM awal hingga integrasi chat closing tanpa biaya platform.',
      content: `<h2>Langkah Memulai Bisnis Digital Mandiri</h2><p>Banyak pelaku usaha terjebak dalam biaya langganan software yang mahal di awal perintisan. Dengan memanfaatkan prinsip efisiensi arsitektur, Anda dapat memulai dengan alat yang sudah Anda miliki:</p><ul><li><strong>Gunakan Spreadsheet sebagai Database:</strong> Catat inventaris dan pesanan secara terpusat.</li><li><strong>Buka Kanal Chat Langsung:</strong> Hilangkan friksi pembeli dengan direct chat WhatsApp.</li><li><strong>Amankan Identitas Digital:</strong> Miliki domain sendiri untuk membangun kepercayaan jangka panjang.</li></ul>`,
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
      source: 'Google Sheet Live',
      isPillar: true
    },
    {
      id: 'pillar-04',
      slug: 'jual-property-komersial-raih-peluang',
      title: 'Jual Property Komersial: Raih Peluang Investasi dan Pertumbuhan Nilai Aset',
      category: 'Properti & Investasi',
      author: 'Jim Koto (James Isa)',
      publishDate: '10 Mei 2024',
      readTime: '8 min read',
      tags: ['Properti', 'Investasi', 'Komersial', 'Aset'],
      summary: 'Analisis mendalam mengenai strategi pemasaran properti komersial di era digital, pemanfaatan visual virtual tour, dan penargetan investor yang tepat.',
      content: `<h2>Mengoptimalkan Nilai Jual Properti Komersial</h2><p>Pemasaran properti komersial membutuhkan pendekatan berbasis data dan presentasi visual yang meyakinkan. Melalui integrasi portal digital berkecepatan tinggi, calon investor dapat meninjau ROI dan spesifikasi unit secara transparan.</p>`,
      imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80',
      source: 'Google Sheet Live',
      isPillar: true
    },
    {
      id: 'pillar-05',
      slug: 'hot-mine-dari-near-coin_3',
      title: 'Hot Mine dari Near Coin: Analisis Ekosistem Web3 dan Efisiensi Konsensus',
      category: 'Crypto & Web3',
      author: 'Jim Koto (James Isa)',
      publishDate: '02 Mei 2024',
      readTime: '6 min read',
      tags: ['Web3', 'Crypto', 'NearProtocol', 'Blockchain'],
      summary: 'Eksplorasi ekosistem Near Protocol, mekanika smart contract berbasis Rust, dan efisiensi sharding untuk aplikasi desentralisasi berskala besar.',
      content: `<h2>Efisiensi Protokol Web3 Masa Depan</h2><p>Near Protocol menghadirkan pendekatan inovatif terhadap skalabilitas sharding (Nightshade) dan kemudahan onboarding pengguna dengan akun berbasis nama yang mudah diingat.</p>`,
      imageUrl: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?w=800&auto=format&fit=crop&q=80',
      source: 'Google Sheet Live',
      isPillar: true
    },
    {
      id: 'pillar-06',
      slug: 'maraknya-cryptocurrency-baru',
      title: 'Maraknya Cryptocurrency Baru: Cara Menyaring Fundamental Kuat dari Hype Sesaat',
      category: 'Crypto & Keuangan',
      author: 'Jim Koto (James Isa)',
      publishDate: '28 Apr 2024',
      readTime: '7 min read',
      tags: ['Cryptocurrency', 'AnalisisFundamental', 'Keuangan'],
      summary: 'Panduan navigasi di tengah ribuan aset kripto baru: Tokenomics, utilitas jaringan riil, audit keamanan kode, dan manajemen risiko modal.',
      content: `<h2>Menilai Kualitas Proyek Aset Digital</h2><p>Jangan terjebak FOMO. Pelajari whitepaper, periksa verifikasi kontrak di explorer, dan pastikan proyek memiliki tim developer aktif serta utilitas yang memecahkan masalah nyata.</p>`,
      imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=800&auto=format&fit=crop&q=80',
      source: 'Google Sheet Live',
      isPillar: true
    },
    {
      id: 'pillar-07',
      slug: 'arsitektur-secure-core-service-account-isolation',
      title: 'Arsitektur Secure Core: Isolasi Private Drive dengan Public Mirror Menggunakan Service Account',
      category: 'Keamanan Data & Cloud',
      author: 'Jim Koto (James Isa)',
      publishDate: '07 Mar 2024',
      readTime: '9 min read',
      tags: ['SecureCore', 'GoogleCloud', 'Privasi', 'UMKM'],
      summary: 'Bagaimana UMKM dapat menampilkan produk ke website publik tanpa takut data spreadsheet atau folder Google Drive pribadinya bocor ke publik.',
      content: `Pemisahan lapisan akses (Zero Trust Access Boundary) memastikan bahwa data sensitif tetap berada di vault privat internal, sementara antarmuka publik hanya menerima data yang telah disanitasi secara read-only.`,
      imageUrl: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj_secure/s1600/secure-core.jpg',
      source: 'Curated Cache',
      isPillar: true
    }
  ];
}

function inferArticleCategory(title: string, slug: string, content: string): string {
  const text = `${title} ${slug} ${content}`.toLowerCase();
  if (text.includes("crypto") || text.includes("near coin") || text.includes("blockchain") || text.includes("web3") || text.includes("bitcoin")) {
    return "Web3 & Crypto";
  }
  if (text.includes("properti") || text.includes("property") || text.includes("investasi") || text.includes("aset")) {
    return "Properti & Investasi";
  }
  if (text.includes("kesehatan") || text.includes("olahraga") || text.includes("puasa") || text.includes("ramadhan") || text.includes("detox") || text.includes("sehat")) {
    return "Kesehatan & Gaya Hidup";
  }
  if (text.includes("ekosistem") || text.includes("autopilot") || text.includes("ai") || text.includes("akomoda") || text.includes("sistem") || text.includes("rekayasa")) {
    return "Ekosistem & Sistem AI";
  }
  if (text.includes("bisnis") || text.includes("umkm") || text.includes("closing") || text.includes("digital marketing") || text.includes("crm")) {
    return "Bisnis & UMKM";
  }
  if (text.includes("filosofi") || text.includes("kesadaran") || text.includes("pikiran") || text.includes("motivasi") || text.includes("sukses") || text.includes("roma") || text.includes("kamu bisa")) {
    return "Inspirasi & Filosofi";
  }
  return "Artikel Pilar";
}

function cleanArticleContent(rawHtml: string): string {
  if (!rawHtml) return "";
  // Strip LD-JSON script tags embedded inside content
  return rawHtml.replace(/<script[\s\S]*?<\/script>/gi, "").trim();
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  const sheetId = context.env.GOOGLE_SHEET_ID || "1n5kNGPAfAu8ov0gINi2fCPL79s3MANe-AAMIlRWvLsM";
  const sheetTab = context.env.GOOGLE_SHEET_TAB || "Blog";
  const sheetGid = context.env.GOOGLE_SHEET_GID;

  try {
    let gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;
    if (sheetTab) {
      gvizUrl += `&sheet=${encodeURIComponent(sheetTab)}`;
    } else if (sheetGid) {
      gvizUrl += `&gid=${encodeURIComponent(sheetGid)}`;
    }

    const res = await fetch(gvizUrl);
    const text = await res.text();
    const jsonMatch = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\);/);

    if (!jsonMatch) {
      throw new Error("Unable to parse Google Sheets GViz response");
    }

    const data = JSON.parse(jsonMatch[1]);
    const cols = (data.table?.cols || []).map((c: any, i: number) => (c?.label || `col_${i}`).trim().toUpperCase());
    const rows = data.table?.rows || [];

    const articles = rows.map((r: any, idx: number) => {
      const getVal = (colIndex: number) => {
        const cell = r?.c?.[colIndex];
        if (!cell) return "";
        return cell?.f ?? cell?.v ?? "";
      };

      const findCol = (keys: string[]) => {
        const index = cols.findIndex((name: string) => keys.some((k) => name === k || name.includes(k)));
        return index !== -1 ? String(getVal(index)) : "";
      };

      const hasNamedCols = cols.includes("TITLE") || cols.includes("SLUG");

      const rowId = findCol(["ID"]) || `art-${idx + 1}`;
      const timestamp = findCol(["DATE", "TIMESTAMP", "TANGGAL"]) || (hasNamedCols ? "" : String(getVal(1))) || "2026";
      const domain = findCol(["DOMAIN"]) || "jimkoto.my.id";
      const explicitCategory = findCol(["KATEGORI", "CATEGORY", "TOPIC"]);
      const title = findCol(["TITLE", "JUDUL", "NAME"]) || (hasNamedCols ? "" : String(getVal(5))) || `Artikel #${idx + 1}`;
      const rawContent = findCol(["CONTENT", "KONTEN", "BODY"]) || (hasNamedCols ? "" : String(getVal(6))) || "";
      const imageUrl = findCol(["IMAGE", "GAMBAR", "FOTO"]) || (hasNamedCols ? "" : String(getVal(7))) || "";
      const slugRaw = findCol(["SLUG", "URL_SLUG", "URL"]) || (hasNamedCols ? "" : String(getVal(8)));
      const metadesc = findCol(["METADESC", "SUMMARY", "RINGKASAN", "DESC"]) || (hasNamedCols ? "" : String(getVal(9)));
      const status = findCol(["STATUS"]) || "PUBLISHED";

      const cleanedContent = cleanArticleContent(rawContent);
      const cleanSummary = metadesc.trim() || stripHtml(cleanedContent).slice(0, 180) || "Artikel pilar oleh Jim Koto.";
      const rawSlugClean = slugRaw.trim().replace(/^https?:\/\/[^\/]+\/?/, '').replace(/^\/+|\/+$/g, '');
      const slug = rawSlugClean || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const category = explicitCategory.trim() || inferArticleCategory(title, slug, cleanedContent);
      const wordCount = stripHtml(cleanedContent).split(/\s+/).length;
      const readMins = Math.max(3, Math.round(wordCount / 180));

      return {
        id: `sheet-${rowId}-${idx}`,
        slug,
        title: title.trim(),
        category,
        author: "Jim Koto (James Isa)",
        publishDate: String(timestamp).trim() || "2026",
        readTime: `${readMins} min read`,
        tags: [category, "JimKoto", "Ecosystem", "Artikel"].filter(Boolean),
        summary: cleanSummary,
        content: cleanedContent,
        imageUrl: imageUrl.trim() || undefined,
        domain,
        status,
        source: "Cloudflare Pages Edge Function + Google Sheets CMS",
        isPillar: true
      };
    }).filter((a: any) => {
      const hasTitle = Boolean(a.title && a.title.trim() !== "" && !a.title.toUpperCase().includes("TITLE"));
      const isPublished = !a.status || a.status.toUpperCase().includes("PUBLISH") || a.status.toUpperCase() === "TRUE";
      return hasTitle && isPublished;
    });

    const activeList = articles.length > 0 ? articles : getFallbackArticles();

    // Reverse order so newest rows come first
    const sortedArticles = [...activeList].reverse();

    return new Response(JSON.stringify({
      status: "online",
      source: articles.length > 0 ? "Cloudflare Pages Edge Function + Google Sheets CMS" : "Cloudflare Edge Curated Pillar Cache",
      timestamp: new Date().toISOString(),
      count: sortedArticles.length,
      articles: sortedArticles
    }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=60, s-maxage=3600, stale-while-revalidate=86400"
      }
    });
  } catch (err: any) {
    const fallback = getFallbackArticles();
    return new Response(JSON.stringify({ 
      error: err.message, 
      status: "online_fallback",
      source: "Cloudflare Edge Curated Pillar Cache",
      count: fallback.length,
      articles: fallback
    }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" }
    });
  }
};
