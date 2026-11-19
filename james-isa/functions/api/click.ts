export interface Env {
  AFFILIATE_CLICKS?: D1Database;
}

export const onRequestPost: PagesFunction<Env> = async (ctx) => {
  const { request, env } = ctx;
  try {
    const body:any = await request.json();
    const { aff, dest, source } = body;
    
    // Log to console for now, later to D1
    console.log(`AFF_CLICK: ${aff} -> ${dest} from ${source} at ${new Date().toISOString()} - IP: ${request.headers.get('CF-Connecting-IP')}`);
    
    // Jika D1 ada, simpan
    if(env.AFFILIATE_CLICKS){
      await env.AFFILIATE_CLICKS.prepare(
        "INSERT INTO clicks (aff, dest, source, ip, country, created_at) VALUES (?, ?, ?, ?, ?, datetime('now'))"
      ).bind(aff, dest, source, request.headers.get('CF-Connecting-IP')||'', request.cf?.country||'').run();
    }
    
    return new Response(JSON.stringify({ok:true}),{
      headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"https://jimkoto.my.id"}
    });
  } catch(e:any){
    return new Response(JSON.stringify({error:e.message}),{status:500});
  }
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null,{
    headers:{
      "Access-Control-Allow-Origin":"https://jimkoto.my.id",
      "Access-Control-Allow-Methods":"POST, OPTIONS",
      "Access-Control-Allow-Headers":"Content-Type"
    }
  });
}
