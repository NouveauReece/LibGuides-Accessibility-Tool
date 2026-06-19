// scripts/remark-modified-time.js
import { execSync } from "node:child_process";
import { statSync } from "node:fs";

export function remarkModifiedTime() {
  return function (tree, file) {
    const filepath = file.history[0];
    let lastModified;

    try {
      const result = execSync(
        `git log -1 --pretty="format:%cI" "${filepath}"`
      ).toString().trim();

      lastModified = result || statSync(filepath).mtime.toISOString();
    } catch {
      // not a git repo, git not installed, or shallow clone — fall back to fs
      lastModified = statSync(filepath).mtime.toISOString();
    }

    file.data.astro.frontmatter.lastModified = lastModified;
  };
}