import { memo } from 'react';

import EyeIcon from 'shared/assets/icons/eye-20-20.svg';

import { classNames } from 'shared/lib/classNames/classNames';

// import { useHover } from 'shared/lib/hooks/useHover/useHover';

import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';

import { Article, ArticleView } from '../../model/types/article';

import classes from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  article: Article;
  className?: string;
  view: ArticleView;
}

export const ArticleListItem = memo(({
  className,
  article,
  view,
}: ArticleListItemProps) => {
  // const [isHover, hoverHandlers] = useHover();

  if (view === ArticleView.LIST) {
    return (
      <div
        className={
          classNames(classes.ArticleListItem, {}, [className, classes[view]])
        }
      >
        {article.title}
      </div>
    );
  }

  return (
    <div
      className={
        classNames(classes.ArticleListItem, {}, [className, classes[view]])
      }
      /* {...hoverHandlers} */
    >
      <Card>
        <div className={classes.imageWrapper}>
          <img
            alt={article.title}
            className={classes.image}
            src={article.img}
          />

          <Text className={classes.date} text={article.createdAt} />
        </div>

        <div className={classes.infoWrapper}>
          <Text className={classes.types} text={article.type.join(', ')} />

          <Text className={classes.views} text={String(article.views)} />

          <Icon Svg={EyeIcon} />
        </div>

        <Text className={classes.title} text={article.title} />
      </Card>
    </div>
  );
});

ArticleListItem.displayName = 'ArticleListItem';
