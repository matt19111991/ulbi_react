// Глобальная декларация типов

// Типизация CSS-modules для файлов вида '*.module.scss'

declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;

  export default classNames;
}

/*
  По умолчанию TypeScript не понимает импортируемые SVG изображения
  в JSX разметке для SVG компонентов будут предлагаться SVG-props
*/
declare module '*.svg' {
  import React from 'react';

  const SVG: React.FC<React.SVGProps<SVGSVGElement>>;

  export default SVG;
}

// для следующих типов достаточно заглушек

declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';

declare const __API__: string;
declare const __IS_DEV__: boolean;
declare const __PROJECT__: 'front-end' | 'jest' | 'storybook';

/*
  'DeepPartial' из '@reduxjs/toolkit' требует указания всех обязательных полей в редюсерах и добавляет
  'undefined' к типам асинхронных редюсеров; из-за этого ломаются декораторы, тесты и 'stories':

  type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
  };

   нужна возможность задавать частичный 'store' (взято из интернета)
*/
type DeepPartial<T> = T extends object ? { [K in keyof T]?: DeepPartial<T[K]> } : T;

// Аналог 'Record', но с необязательными полями
type OptionalRecord<K extends string | number | symbol, V> = {
  [P in K]?: V;
};
