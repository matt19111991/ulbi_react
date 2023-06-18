// Глобальная декларация типов

// Типизация css-modules для файлов вида '*.module.scss'

declare module '*.scss' {
    interface IClassNames {
        [className: string] : string;
    }

    const classNames: IClassNames;

    export = classNames;
}
