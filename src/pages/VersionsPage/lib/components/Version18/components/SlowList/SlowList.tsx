import { memo } from 'react';
import type { JSX } from 'react';

import { SlowPost } from '../SlowPost/SlowPost';

interface SlowListProps {
  /**
   * Использовать индексы при отображении элементов или передаваемый текст?
   */
  countable?: boolean;

  /**
   * Вводимый текст в инпут
   */
  text?: string;
}

export const SlowList = memo(({ countable = true, text = '' }: SlowListProps) => {
  const items: JSX.Element[] = [];

  for (let i = 0; i < 500; i++) {
    // генерация 500 элементов с задержкой рендера в 2 мс у каждого
    items.push(<SlowPost key={i} text={countable ? `#${i + 1}` : `Текст: ${text}`} />);
  }

  return <ul>{items}</ul>;
});

SlowList.displayName = 'SlowList';
