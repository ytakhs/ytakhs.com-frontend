const path = require('path');
const fs = require('fs');

const contentDir = path.join(
  process.cwd(),
  process.env.CONTENT_DIR || 'content'
);

function recursiveDir(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const current = path.join(dir, dirent.name);
    return dirent.isFile() ? [current] : recursiveDir(current);
  });
}

fs.rmSync(path.join('public', 'entries'), { recursive: true, force: true });

recursiveDir(path.join(contentDir, 'entries'))
  .filter((filePath) => {
    return ['.png'].includes(path.extname(filePath));
  })
  .forEach((srcPath) => {
    const destPath = srcPath.replace(/^content/, 'public');
    const destDir = path.dirname(destPath);
    fs.mkdirSync(destDir, { recursive: true });

    fs.copyFileSync(srcPath, destPath);
  });
