import esbuild from "esbuild";
import { createServer, request } from "http";
import { spawn } from "child_process";
import process from "process";
import { litCssPlugin } from 'esbuild-plugin-lit-css';
import litPlugin from 'esbuild-plugin-lit'
import Sass from 'sass'
const clients = [];
esbuild
  .build({
    entryPoints: ['./src/index.ts'],
    bundle: true,
    outfile: './public/build/bundle.js',
    plugins: [
        litPlugin(),
        litCssPlugin({
            filter: /.scss$/,
            transform: (data, { filePath }) =>
                Sass.renderSync({ data, file: filePath })
                    .css.toString(),
        })],
    watch: true
  })
  .catch(() => process.exit(1));
/* esbuild.serve({ servedir: "./public" }, {}).then(() => {
  createServer((req, res) => {
    const { url, method, headers } = req;
    if (req.url === "/esbuild")
      return clients.push(
        res.writeHead(200, {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        })
      );
    const path = ~url.split("/").pop().indexOf(".") ? url : `/index.html`; //for PWA with router
    req.pipe(
      request(
        { hostname: "0.0.0.0", port: 8000, path, method, headers },
        (prxRes) => {
          if (url === "/bundle.js") {

            const jsReloadCode =
              ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();';

            const newHeaders = {
              ...prxRes.headers,
              "content-length":
                parseInt(prxRes.headers["content-length"], 10) +
                jsReloadCode.length,
            };

            res.writeHead(prxRes.statusCode, newHeaders);
            res.write(jsReloadCode);
          } else {
            res.writeHead(prxRes.statusCode, prxRes.headers);
          }
          prxRes.pipe(res, { end: true });
        }
      ),
      { end: true }
    );
  }).listen(3000);

  setTimeout(() => {
    const op = {
      darwin: ["open"],
      linux: ["xdg-open"],
      win32: ["cmd", "/c", "start"],
    };
    const ptf = process.platform;
    if (clients.length === 0)
      spawn(op[ptf][0], [...[op[ptf].slice(1)], `http://localhost:3000`]);
  }, 1000); //open the default browser only if it is not opened yet
}); */