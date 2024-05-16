const path = require('path');

// Для удобства использования корня проекта и папки 'src'

module.exports = (...segments) => path.resolve(__dirname, '..', '..', ...segments);
