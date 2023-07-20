import { memo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import EyeIcon from 'shared/assets/icons/eye-20-20.svg';

import { RoutePath } from 'shared/config/routeConfig/routeConfig';

// import { useHover } from 'shared/lib/hooks/useHover/useHover';

import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Card } from 'shared/ui/Card/Card';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';

import {
  Article,
  ArticleBlockType,
  ArticleTextBlock,
  ArticleView,
} from '../../model/types/article';

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

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

  const navigate = useNavigate();
  const { t } = useTranslation();

  const onOpenArticle = useCallback((): void => {
    navigate(`${RoutePath.article_details}${article.id}`);
  }, [article.id, navigate]);

  if (view === ArticleView.LIST) {
    const firstTextBlock = article.blocks.find(
      (block) => block.type === ArticleBlockType.TEXT,
    ) as ArticleTextBlock;

    return (
      <div className={classNames('', {}, [className, classes[view]])}>
        <Card>
          <div className={classes.header}>
            <Avatar size={30} src={article.user.avatar} />

            <Text className={classes.username} text={article.user.username} />

            <Text className={classes.date} text={article.createdAt} />
          </div>

          <Text className={classes.title} title={article.title} />

          <Text className={classes.types} text={article.type.join(', ')} />

          <img
            alt={article.title}
            className={classes.image}
            src={article.img}
          />

          {firstTextBlock && (
            <ArticleTextBlockComponent
              block={firstTextBlock}
              className={classes.textBlock}
            />
          )}

          <div className={classes.footer}>
            <Button onClick={onOpenArticle} theme={ButtonTheme.OUTLINE}>
              {t('Читать далее')}...
            </Button>

            <Text className={classes.views} text={String(article.views)} />
            <Icon Svg={EyeIcon} />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames('', {}, [className, classes[view]])}
      /* {...hoverHandlers} */
    >
      <Card onClick={onOpenArticle}>
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
