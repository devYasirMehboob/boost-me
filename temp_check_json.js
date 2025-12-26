const fs = require('fs');
try {
    const content = fs.readFileSync('app.json', 'utf8');
    JSON.parse(content);
    console.log('JSON is valid');
} catch (e) {
    console.error('JSON error:', e.message);
}
