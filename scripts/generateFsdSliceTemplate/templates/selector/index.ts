export const selectorTemplate = (sliceName: string) =>
  `import type { StateSchema } from '@/app/providers/StoreProvider';

export const ${sliceName}Selector = (state: StateSchema) => state?.${sliceName}?.isLoading;
`;
