// eslint-disable-next-line import/extensions,import/no-unresolved
const firstCharUpperCase = require('../firstCharUpperCase');

module.exports = (sliceName) => `export interface ${firstCharUpperCase(sliceName)}Schema {
  
}
`;
