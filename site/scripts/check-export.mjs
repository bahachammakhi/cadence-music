// Check real generated files, including metadata URLs: project subpaths must resolve.
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const html = readFileSync("out/index.html", "utf8");
const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";
const origin = "https://cadence.bmerce.com";
let checked = 0;
function check(value) {
  const url = new URL(value, origin);
  if (url.origin !== origin) return;
  let path = decodeURIComponent(url.pathname);
  if (path.startsWith(`${prefix}/`)) path = path.slice(prefix.length);
  const file = join("out", path.replace(/^\//, ""));
  if (!existsSync(file)) throw new Error(`Missing exported resource: ${value}`);
  checked++;
}
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
  if (!match[1].startsWith("#")) check(match[1]);
}
for (const match of html.matchAll(
  /<meta (?:property|name)="(?:og:image|twitter:image)" content="([^"]+)"/g,
))
  check(match[1]);
if (!existsSync("out/404.html")) throw new Error("Missing branded 404 page");
console.log(
  `Passed ${checked} exported resource and social metadata checks; 404 exists.`,
);
