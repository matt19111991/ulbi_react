import { firstCharUpperCase } from '../../utils';

export const schemaTypeTemplate = (
  sliceName: string,
) => `export interface ${firstCharUpperCase(sliceName)}Schema {
  
}\n`;
