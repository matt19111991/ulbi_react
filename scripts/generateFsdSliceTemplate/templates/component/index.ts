export const componentTemplate = (componentName: string) =>
  // начало шаблона
  `import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import classes from './${componentName}.module.scss';

interface ${componentName}Props {
  /**
   * Внешний класс
   */
  className?: string;
}

export const ${componentName} = memo(({ className }: ${componentName}Props) => (
  <div className={classNames(classes.${componentName}, {}, [className])}>
    ${componentName}
  </div>
));

${componentName}.displayName = '${componentName}';
`; // конец шаблона
