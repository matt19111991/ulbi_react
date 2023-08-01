const interfaceConst = 'interface';

module.exports = (componentName) => `import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './${componentName}.module.scss';

${interfaceConst} ${componentName}Props {
  className?: string;
}

export const ${componentName} = memo(({ className }: ${componentName}Props) => (
  <div className={classNames(classes.${componentName}, {}, [className])}>
    ${componentName}
  </div>
));

${componentName}.displayName = '${componentName}';
`;
