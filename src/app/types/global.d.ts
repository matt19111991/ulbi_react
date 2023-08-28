// Глобальная декларация типов

// Типизация css-modules для файлов вида '*.module.scss'

declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;

  export = classNames;
}

// По умолчанию TypeScript не понимает импортируемые SVG изображения

declare module '*svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;

  export default SVG;
}

// для следующих типов достаточно заглушек

declare module '*gif';
declare module '*jpg';
declare module '*jpeg';
declare module '*png';

declare const __API__: string;
declare const __IS_DEV__: boolean;
declare const __PROJECT__: 'front-end' | 'jest' | 'storybook';

/* 'DeepPartial' из '@reduxjs/toolkit' подразумевает, что вся поля будут необязательными;
    нужна возможность задавать частичный 'store' с обязательными полями (взято из интернета)
*/
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;

// Аналог 'Record', но с необязательными полями
type OptionalRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
