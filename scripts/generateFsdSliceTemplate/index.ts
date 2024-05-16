/*
  скрипт для генерации шаблонной структуры компонентов по 'Feature Sliced Design' методологии

 'npm run generate:slice:template [slice_name] [component_name]' - запуск скрипта
*/

import { createTemplate } from './creators';

import type { Layer } from './types';

const layers = ['entities', 'features', 'pages'];

/*                  [0]              [1]                     [2], [3], [4], ...
  process.argv[путь_до_ts-node, путь_до_скрипта, ...все_аргументы_которые_сами_передадим]

 'ts-node scripts/generateFsdSliceTemplate/index.ts' => [0], [1]

 'ts-node scripts/generateFsdSliceTemplate/index.ts entities TestEntity' =>
    [0], [1], [2]: 'entities', [3]: 'TestEntity'
*/
const layerToCreate = process.argv[2] as Layer;
const sliceNameToCreate = process.argv[3];

if (!layerToCreate || !layers.includes(layerToCreate)) {
  throw new Error(`Укажите слой '${layers.join("' или '")}'`);
}

if (!sliceNameToCreate) {
  throw new Error('Укажите название слайса');
}

// можно просто вызвать 'createTemplate()', но линтер будет ругаться на необработанный промис
(async () => {
  await createTemplate(layerToCreate, sliceNameToCreate);
})();
