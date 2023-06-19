//                  ключ   возможные значения
//                   v        v         v
type Mods = Record<string, boolean | string>;

// classNames() позволяет избежать '<div className={`${isOpened ? '.opened' : ''}`} />'

export function classNames(rootClass: string, mods: Mods, additionalClasses: string[]): string {
    const classesArray = [
        rootClass,
        ...Object.entries(mods)
            .filter(([, value]) => Boolean(value)) // оставляем только 'true' значения в 'mods'
            .map(([cls]) => cls), // возвращаем только названия ключей/классов (которые 'true')
        ...additionalClasses
    ];

    return classesArray.join(' ');
}

/*
    classNames('remove-btn', { hovered: true, red: false, selectable: true }, ['pdg']);
=>
    'remove-btn hovered selectable pdg';
*/
