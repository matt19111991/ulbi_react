import { lazy } from 'react';
import type { FC } from 'react';

import type { LoginFormProps } from './LoginForm';

// без '<FC<LoginFormProps>>' 'TS' может ругаться на типы 'props' при использовании 'lazy'

export const LoginForm = lazy<FC<LoginFormProps>>(() => import('./LoginForm'));
