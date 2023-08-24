// без одинарных кавычек будет ошибка: 'Syntax error, unrecognized expression: [data-testid=...]'
export const selectByTestId = (testId: string): string => `[data-testid='${testId}']`;
