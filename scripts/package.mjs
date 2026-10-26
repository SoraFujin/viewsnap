import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { execFileSync } from "node:child_process";
import { zipSync } from "fflate";

execFileSync("npx", ["eslint", "."], { stdio: "inherit" });

const src = "extension";
const files = {};
(function walk(dir, prefix = "") {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) walk(join(dir, e.name), `${prefix}${e.name}/`);
    else files[prefix + e.name] = readFileSync(join(dir, e.name));
  }
})(src);

const { version } = JSON.parse(files["manifest.json"]);
mkdirSync("dist", { recursive: true });
const out = `dist/viewsnap-${version}.zip`;
writeFileSync(out, zipSync(files));
console.log(`Wrote ${out}`);
