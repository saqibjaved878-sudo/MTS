const fs = require('fs');
const h = fs.readFileSync('mts-system-v10.html', 'utf8');

// Extract all script blocks
const regex = /<script[^>]*>([\s\S]*?)<\/script>/g;
let match;
let i = 0;
while ((match = regex.exec(h)) !== null) {
  i++;
  const code = match[1];
  if (code.trim().length > 100) {
    try {
      new Function(code);
    } catch(e) {
      console.log('Script ' + i + ' ERROR at position ~' + match.index + ': ' + e.message.substring(0, 200));
    }
  }
}
console.log('Total scripts checked: ' + i);
