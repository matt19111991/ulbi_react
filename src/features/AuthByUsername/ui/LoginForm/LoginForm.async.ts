import { FC, lazy } from 'react';

import { LoginFormProps } from './LoginForm';

// без <FC<LoginFormProps>> TS может ругаться на типы 'props' для компонента при использовании 'lazy'

export const LoginFormAsync = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
