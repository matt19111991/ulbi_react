// без одинарных кавычек будет ошибка: 'Syntax error, unrecognized expression: [data-testid=...]'

type DataTestIdSelector<T extends string> = `[data-testid='${T}']`;

export const getDataTestIdSelector = <T extends string>(testId: T): DataTestIdSelector<T> =>
  `[data-testid='${testId}']`;
