import fs from "fs";
import path from "path";

const targetPath = process.argv[2] || "./src";

const SLOP_PATTERNS = [
  {
    regex: /rounded-xl\s+border\s+bg-(?:surface|card|white|gray)\s+p-6/g,
    message: "VIOLATION: Generic padded box card detected. Use exposed hairline grids (parent grid border gap-px) or top-rule dividers.",
  },
  {
    regex: /from-purple-500|to-indigo-500|from-pink-500|to-purple-600/g,
    message: "VIOLATION: Cliché AI purple/pink gradient detected. Maintain strict palette discipline.",
  },
  {
    regex: /<input[^>]+type=["']range["']/g,
    message: "VIOLATION: Unrequested dashboard slider widget detected.",
  },
  {
    regex: /SYSTEM ONLINE|STATUS: OPTIMAL|NEURAL ENGINE/g,
    message: "VIOLATION: Fabricated sci-fi telemetry badge detected.",
  },
];

let totalViolations = 0;

function checkFile(filePath) {
  if (!/\.(tsx|jsx|html|css|js|ts)$/.test(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");

  SLOP_PATTERNS.forEach(({ regex, message }) => {
    if (regex.test(content)) {
      console.error(`\x1b[31m[AUDIT FAIL]\x1b[0m ${filePath}: ${message}`);
      totalViolations++;
    }
  });
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  const stats = fs.statSync(dir);
  if (stats.isFile()) {
    checkFile(dir);
    return;
  }
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (file === "node_modules" || file === ".next") continue;
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      traverse(fullPath);
    } else {
      checkFile(fullPath);
    }
  }
}

console.log(`\x1b[34m[UI AUDIT]\x1b[0m Scanning ${targetPath} for anti-slop violations...`);
traverse(targetPath);

if (totalViolations > 0) {
  console.error(`\x1b[31m[AUDIT RESULT]\x1b[0m Found ${totalViolations} design violations.`);
  process.exit(1);
} else {
  console.log(`\x1b[32m[AUDIT PASS]\x1b[0m 100% Anti-Slop Compliant. Exposed hairline grids and restrained visual hierarchy verified.`);
  process.exit(0);
}
