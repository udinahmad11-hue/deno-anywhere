# Deno CORS Proxy (Ready for GitHub + Deno Deploy)

## Cara Deploy ke Deno Deploy
1. Upload repo ini ke GitHub.
2. Buka https://dash.deno.com
3. Klik **New Project → Deploy from GitHub**
4. Pilih repository Anda.
5. Set **entrypoint** ke: `cors_proxy.ts`
6. Deploy.

## Cara Pakai
```
https://your-project.deno.dev/proxy?url=https://example.com
```

## Menjalankan Lokal
```
deno run --allow-net cors_proxy.ts
```
