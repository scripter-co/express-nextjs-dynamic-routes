# Differing behaviour between development mode and production and dynamic routes

This repo is a minimum reproducable example of differing behaviour in dynamic routing between dev mode and production.

The issue is present when using a custom express server and setting `useFileSystemPublicRoutes: false`. The two behaviours are displayed bellow

## Running in development

When running the application in dev mode, dynamic routes are loaded and we can load the dynamic page directly:

```
npm run dev
```

**Result of curl: HTTP/1.1 200 OK**

```
➜  custom-server-app git:(main) ✗ curl -I http://localhost:3000/item/1
HTTP/1.1 200 OK
X-Powered-By: Next.js
Cache-Control: no-store, must-revalidate
Content-Type: text/html; charset=utf-8
Vary: Accept-Encoding
Date: Fri, 23 Dec 2022 01:56:40 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### How?

This is because in development all routes are pushed into the `routedPages` array which is then set as `this.dynamicRoutes`.

The code for this is: https://github.com/vercel/next.js/blob/fd9ec646acc26e746822cff903981ca7d7d366e1/packages/next/server/dev/next-dev-server.ts#L458

## Running in production

When running in production (and with `useFileSystemPublicRoutes` disabled), dyanmic routes are not loaded and therefore will not resolve:

```
npm run build
npm start
```

**Result of curl: HTTP/1.1 404 Not Found**

```
➜  custom-server-app git:(main) ✗ curl -I http://localhost:3000/item/1
HTTP/1.1 404 Not Found
X-Powered-By: Next.js
ETag: "unbb0155q81tc"
Content-Type: text/html; charset=utf-8
Content-Length: 2352
Vary: Accept-Encoding
Date: Fri, 23 Dec 2022 01:58:06 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

### How?

This is because in production mode, `this.dynamicRoutes` is not set when `useFileSystemPublicRoutes: false`.

The code for this behaviour is here: https://github.com/vercel/next.js/blob/fd9ec646acc26e746822cff903981ca7d7d366e1/packages/next/server/web-server.ts#L333
