import next from "next";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const server = () => {
  const server = express();
  server.get("/", (req, res) => {
    app.render(req, res, "/");
  });
  server.get("/item/:number", (req, res) => {
    app.render(req, res, "/item/[number]", { number: "1" });
  });
  server.get("/_next/static/*", (req, res) => {
    handle(req, res);
  });
  return server;
};

app.prepare().then(() => {
  const expressServer = server();
  const port = 3000;
  expressServer.listen(port, (err) => {
    if (err) throw err;
    console.warn(`> Ready on http://localhost:${port}`);
  });
});
