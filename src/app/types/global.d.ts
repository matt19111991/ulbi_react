// Глобальная декларация типов

/*
  Типизация 'CSS-modules' для файлов вида '*.module.scss', иначе ошибка при импорте в компонентах:
  "Cannot find module './SidebarItem.module.scss' or its corresponding type declarations."

  Указываем, что 'classes' это объект со строковыми ключами и строковыми значениями
*/
declare module '*.module.scss' {
  interface IClassNames {
    [className: string]: string;
  }

  const classNames: IClassNames;

  export default classNames;
}

/*
  По умолчанию 'TypeScript' не понимает импортируемые 'SVG' изображения,
  в 'JSX' разметке для 'SVG' компонентов будут предлагаться 'SVG-props'
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
  'DeepPartial' из '@reduxjs/toolkit v.1' требует указания всех обязательных полей в редюсерах и
  добавляет 'undefined' к типам асинхронных редюсеров; из-за этого ломаются декораторы, тесты и 'stories':

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

// все необязательные поля будут удалены из типа объекта (взято из интернета)
type RequiredFieldsOnly<T> = {
  /*
    ключ: итерируясь по всем ключам типа 'keyof T' на каждой итерации берем ключ 'K in keyof T' и
      проверяем условие 'as ... extends ... ? ... : ... ', по которому определим значение ключа:
        если свойство 'T[K]' попадает под ограничение своего обязательного аналога 'T[K] extends Required<T>[K]'
        (здесь приводим тип 'T' к обязательному: 'Required<T>' и берем ключ 'Required<T>[K]'),
          то оставляем ключ,
          если нет - возвращаем 'never' (отбрасываем ключ)

    значение: берем из типа 'T' по ключу 'K'
 */
  [K in keyof T as T[K] extends Required<T>[K] ? K : never]: T[K];
};
