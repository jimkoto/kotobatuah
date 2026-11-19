export const onRequestGet: PagesFunction = async (ctx) => {
  const { env } = ctx as any;
  // Static + dynamic from Sheets if available
  const today = new Date().toISOString().split('T')[0];
  const staticUrls = [
    {loc:'https://jimkoto.my.id/', changefreq:'daily', priority:'1.0'},
    {loc:'https://jimkoto.my.id/bio/', changefreq:'monthly', priority:'0.9'},
    {loc:'https://jimkoto.my.id/rekomendasi/', changefreq:'weekly', priority:'0.9'},
    {loc:'https://jimkoto.my.id/rekomendasi/hostinger/', changefreq:'monthly', priority:'0.8'},
  ];
  // TODO: fetch from Google Sheets for /a/ articles
  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${staticUrls.map(u=>`<url><loc>${u.loc}</loc><lastmod>${today}</lastmod><changefreq>${u.changefreq}</changefreq><priority>${u.priority}</priority></url>`).join('')}</urlset>`;
  return new Response(xml,{headers:{"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600"}});
}
