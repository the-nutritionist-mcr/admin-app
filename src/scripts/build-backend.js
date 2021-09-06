/* eslint-disable no-console */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable promise/always-return */
const path = require("path");
const { build } = require("esbuild");
const { pnpPlugin } = require("@yarnpkg/esbuild-plugin-pnp");
const fs = require("fs");

const root = path.resolve(__dirname, "..", "..");
const src = path.resolve(root, "src");
const config = path.resolve(root, "app-config");
const dist = path.resolve(root, "dist");

const handlersDir = path.resolve(src, "backend", "handlers");

const inFiles = fs.readdirSync(handlersDir);

const originalHandler = path.resolve(src, "backend", "index.ts");
const outdir = path.resolve(dist, "bundles", "backend");

build({
  entryPoints: [
    originalHandler,
    ...inFiles.map((file) => path.resolve(handlersDir, file)),
  ],
  outdir,
  platform: "node",
  bundle: true,
  tsconfig: path.resolve(config, "tsconfig.backend.json"),
  sourcemap: true,
  plugins: [pnpPlugin()],
})
  .then(() => {
    console.log("Successfully built backend");
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
