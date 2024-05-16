module.exports = (sliceName, selector) => {
  return `import { StateSchema } from '@/app/providers/StoreProvider';

export const ${selector} = (state: StateSchema) => state.${sliceName}?.isLoading;
`;
};
