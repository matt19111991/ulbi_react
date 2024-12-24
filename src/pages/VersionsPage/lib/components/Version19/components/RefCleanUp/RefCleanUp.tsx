export const RefCleanUp = () => (
  <input
    ref={(ref) => {
      // 'ref' создана

      // возврат функции очистки для сброса 'ref' при удалении элемента из 'DOM'
      return () => {
        // функция очистки 'ref'
      };
    }}
  />
);
