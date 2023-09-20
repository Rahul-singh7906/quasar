const fs = require('fs');
const path = require('path');
const JavaScriptObfuscator = require('javascript-obfuscator');

const DIST_DIR = path.join(__dirname, 'dist/spa'); // Adjust if you're using a different mode like PWA or SSR

fs.readdir(DIST_DIR, (err, files) => {
  if (err) throw err;

  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const filePath = path.join(DIST_DIR, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');

      const obfuscationResult = JavaScriptObfuscator.obfuscate(fileContent, {
        // Add any obfuscation options you want here
        compact: true,
        controlFlowFlattening: true,
      });

      fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode());
    }
  });
});
