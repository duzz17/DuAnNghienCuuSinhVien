const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function run(cmd, opts = {}) {
  console.log(`> ${cmd}`);
  execSync(cmd, { stdio: "inherit", ...opts });
}

function runOut(cmd, opts = {}) {
  return execSync(cmd, {
    encoding: "utf8",
    stdio: ["pipe", "pipe", "inherit"],
    ...opts,
  }).trim();
}

const root = path.resolve(__dirname, "..", "..");
const buildDir = path.join(root, "frontend", "build");
const tempDir = path.join(root, "frontend", ".gh-pages-temp");

function rmDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function removeContents(dir) {
  for (const name of fs.readdirSync(dir)) {
    if (name === ".git") continue;
    const p = path.join(dir, name);
    fs.rmSync(p, { recursive: true, force: true });
  }
}

if (!fs.existsSync(buildDir)) {
  throw new Error("Build folder not found. Run npm run build first.");
}

const status = runOut("git status --porcelain", { cwd: root });
if (status) {
  throw new Error("Please commit or stash changes before deploying.");
}

rmDir(tempDir);
run(`git clone . "${tempDir}"`, { cwd: root });

let branch = "gh-pages";
const hasLocalBranch =
  runOut("git branch --list gh-pages", { cwd: root }) !== "";
const hasRemoteBranch =
  runOut("git ls-remote --heads origin gh-pages", { cwd: root }) !== "";

if (hasLocalBranch) {
  run(`git -C "${tempDir}" checkout gh-pages`);
} else if (hasRemoteBranch) {
  run(`git -C "${tempDir}" checkout -b gh-pages origin/gh-pages`);
} else {
  run(`git -C "${tempDir}" checkout --orphan gh-pages`);
  // Remove old working tree files after orphan branch creation
  removeContents(tempDir);
}

removeContents(tempDir);
fs.cpSync(buildDir, tempDir, { recursive: true });

run(`git -C "${tempDir}" add --all`);

try {
  runOut(`git -C "${tempDir}" diff --cached --quiet`);
  console.log("No changes to deploy.");
} catch {
  const message =
    process.env.GH_PAGES_COMMIT_MESSAGE || "Deploy to GitHub Pages";
  run(`git -C "${tempDir}" commit -m "${message}"`);
}

run(`git -C "${tempDir}" push origin ${branch} --force`);
rmDir(tempDir);
console.log("Deployment complete.");
