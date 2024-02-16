//                         ключ         возможные значения
//                          v                 v
export type Mods = Record<string, boolean | string | undefined>;

// 'classNames()' позволяет избежать '<div className={`${isOpened ? '.opened' : ''}`} />'

/*
  Пример преобразований:
    classNames('remove-btn', { hovered: true, red: false, selectable: true }, ['pdg']);
      => 'remove-btn hovered selectable pdg';
*/

/**
 * Функция для установки классов
 * @param rootClass - основной класс
 * @param mods - объект с модами
 * @param additionalClasses - массив дополнительных классов
 */
export function classNames(
  rootClass: string,
  mods: Mods = {},
  additionalClasses: Array<string | undefined> = [],
): string {
  const classesArray = [
    rootClass,

    ...Object.entries(mods)
      // оставляем только 'true' значения и непустые строки в 'mods'
      .filter(([, value]) => Boolean(value))
      // возвращаем только названия ключей/классов (которые 'true' или непустые строки)
      .map(([cls]) => cls),

    // отфильтровываем 'undefined' и другие 'falsy' значения классов
    ...additionalClasses.filter(Boolean),
  ];

  return classesArray.join(' ');
}
