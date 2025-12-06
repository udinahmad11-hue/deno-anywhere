// cors_anywhere.ts — CORS Anywhere style proxy for Deno Deploy
Deno.serve(async (req) => {
  const url = new URL(req.url);

  // Contoh:
  // /https://example.com/test
  // /proxy/https://example.com/test

  let target = url.pathname;

  // hilangkan prefix /proxy/ jika ada
  if (target.startsWith("/proxy/")) {
    target = target.replace("/proxy/", "");
  }

  // hilangkan "/" paling depan
  if (target.startsWith("/")) {
    target = target.slice(1);
  }

  // kalau kosong → error
  if (!target.startsWith("http://") && !target.startsWith("https://")) {
    return new Response(
      "Format salah.\nGunakan:\n/proxy/https://example.com\natau\n/https://example.com",
      { status: 400 }
    );
  }

  try {
    // Proxy request
    const response = await fetch(target, {
      method: req.method,
      headers: req.headers,
      body: req.body,
    });

    // Clone headers & inject CORS
    const headers = new Headers(response.headers);
    headers.set("Access-Control-Allow-Origin", "*");
    headers.set("Access-Control-Allow-Headers", "*");
    headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");

    return new Response(response.body, {
      status: response.status,
      headers,
    });

  } catch (err) {
    return new Response("Error proxy: " + err.message, {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
});
