import { HTMLAttributeAnchorTarget, memo } from 'react';

import { ToggleFeatures } from '@/shared/lib/features';

import { ArticleView } from '../../model/consts/articleConsts';

import { Article } from '../../model/types/article';

import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated';
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned';

export interface ArticleListItemProps {
  article: Article;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  view: ArticleView;
}

export const ArticleListItem = memo((props: ArticleListItemProps) => (
  <ToggleFeatures
    feature='isAppRedesigned'
    on={<ArticleListItemRedesigned {...props} />}
    off={<ArticleListItemDeprecated {...props} />}
  />
));

ArticleListItem.displayName = 'ArticleListItem';
