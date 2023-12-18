const firstCharUpperCase = require('../firstCharUpperCase.js');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {
  
}
`;
