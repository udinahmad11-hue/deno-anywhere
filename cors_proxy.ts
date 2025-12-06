// cors_proxy.ts - Deno CORS Proxy ready for Deno Deploy
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";

serve(async (req) => {
  const url = new URL(req.url);
  const target = url.searchParams.get("url");

  if (!target) {
    return new Response("Usage: /proxy?url=https://example.com", { status: 400 });
  }

  try {
    const res = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    const headers = new Headers(res.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    headers.set("Access-Control-Allow-Headers", "*");

    return new Response(res.body, { status: res.status, headers });
  } catch (err) {
    return new Response("Proxy error: " + err.message, { status: 500 });
  }
}, { port: 8000 });

console.log("Running CORS Proxy on /proxy?url=...");
