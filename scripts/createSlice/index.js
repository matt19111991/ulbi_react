// eslint-disable-next-line import/extensions,import/no-unresolved
const createTemplate = require('./creators/createTemplate');

/*                [0]              [1]                     [2], [3], [4], ...
  process.argv[путь_до_ноды, путь_до_скрипта, ...все_аргументы_которые_сами_передадим]

  'node ./scripts/createSlice/index.js' => [0], [1]

  'node ./scripts/createSlice/index.js entities TestEntity' => [0], [1], [2]: 'entities', [3]: 'TestEntity'
*/

const layers = ['features', 'entities', 'pages'];

const [, , layer, sliceName] = process.argv;

if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`);
}

if (!sliceName) {
  throw new Error('Укажите название слайса');
}

createTemplate(layer, sliceName);
