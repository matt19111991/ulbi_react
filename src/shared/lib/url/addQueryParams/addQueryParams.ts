export const getQueryParams = (params: OptionalRecord<string, string>): string => {
  // получаем все параметры из URL в адресной строке
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (typeof value !== 'undefined') {
      // добавляем параметры к уже существующим в адресной строке
      searchParams.set(name, value);
    }
  });

  // конкатенируем все параметры: и старые, и новые
  return `?${searchParams.toString()}`;
};

/**
 * Функция добавления параметров строки запроса в URL
 *
 * @param params
 */

export const addQueryParams = (params: OptionalRecord<string, string>): void => {
  // программно устанавливаем свой 'url' в адресной строке;
  window.history.pushState(null, '', getQueryParams(params));
};
