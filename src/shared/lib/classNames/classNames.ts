//                  ключ   возможные значения
//                   v        v         v
type Mods = Record<string, boolean | string>;

// classNames() позволяет избежать '<div className={`${isOpened ? '.opened' : ''}`} />'

export function classNames(
    rootClass: string,
    mods: Mods = {},
    additionalClasses: Array<string | undefined> = [],
): string {
    const classesArray = [
        rootClass,

        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value)) // оставляем только 'true' значения в 'mods'
            .map(([cls]) => cls), // возвращаем только названия ключей/классов (которые 'true')

//      отфильтровываем undefined и другие 'falsy' значения классов
        ...additionalClasses.filter(Boolean),
    ];

    return classesArray.join(' ');
}

/*
    classNames('remove-btn', { hovered: true, red: false, selectable: true }, ['pdg']);
=>
    'remove-btn hovered selectable pdg';
*/
