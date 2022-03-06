const path = require('path');
const fs = require('fs');

function recursiveDir(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((dirent) => {
    const current = path.join(dir, dirent.name);
    return dirent.isFile() ? [current] : recursiveDir(current);
  });
}

recursiveDir(path.join('content', 'entries'))
  .filter((filePath) => {
    return ['.png'].includes(path.extname(filePath));
  })
  .forEach((srcPath) => {
    const destPath = srcPath.replace(/^content/, 'public');
    const destDir = path.dirname(destPath);
    fs.mkdirSync(destDir, { recursive: true });

    fs.copyFileSync(srcPath, destPath);
  });
