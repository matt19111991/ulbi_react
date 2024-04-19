/**
 * Функция получения параметров строки запроса в 'URL'
 *
 * @param params
 */
export const getQueryParams = (params: Record<string, string | undefined>): string => {
  // получаем все параметры из 'URL' в адресной строке
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (value !== undefined) {
      /*
        добавляем параметры к уже существующим в адресной строке,
        если параметр уже был в 'searchParams' => метод '.set()' заменит старые данные
      */
      searchParams.set(name, value);
    }
  });

  // конкатенируем все параметры: и старые, и новые
  return `?${searchParams.toString()}`;
};

/**
 * Функция добавления параметров строки запроса в 'URL'
 *
 * @param params
 */
export const addQueryParams = (params: Record<string, string | undefined>): void => {
  // программно добавляем 'query' параметры к 'URL' в адресной строке
  window.history.pushState(
    // состояние (в текущем ситуации не важно)
    null, // https://developer.mozilla.org/ru/docs/Web/API/History/pushState#state

    // заголовок (безопасным решением является передача пустой строки)
    '', // https://developer.mozilla.org/ru/docs/Web/API/History/pushState#title

    // 'query' параметры
    getQueryParams(params),
  );
};
