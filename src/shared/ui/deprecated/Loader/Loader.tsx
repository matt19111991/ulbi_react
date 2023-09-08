import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import './Loader.scss'; // для упрощения используемых классов

interface LoaderProps {
  className?: string;
}

/**
 * Устарел, используем новые компоненты из папки 'redesigned'
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => (
  <div className={classNames('lds-ellipsis', {}, [className])}>
    <div />
    <div />
    <div />
    <div />
  </div>
));

Loader.displayName = 'Loader';
