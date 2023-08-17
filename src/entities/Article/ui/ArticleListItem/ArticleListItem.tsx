import { HTMLAttributeAnchorTarget, memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-20-20.svg';

import { RoutePath } from '@/shared/const/router';

// import { useHover } from 'shared/lib/hooks/useHover/useHover';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Avatar } from '@/shared/ui/Avatar';
import { AppLink } from '@/shared/ui/AppLink';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';

import { ArticleBlockType, ArticleView } from '../../model/consts/articleConsts';

import { Article, ArticleTextBlock } from '../../model/types/article';

import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent';

import classes from './ArticleListItem.module.scss';

interface ArticleListItemProps {
  article: Article;
  className?: string;
  target?: HTMLAttributeAnchorTarget;
  view: ArticleView;
}

export const ArticleListItem = memo(({
  article,
  className,
  target,
  view,
}: ArticleListItemProps) => {
  // const [isHover, hoverHandlers] = useHover();

  const { t } = useTranslation();

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
            {/*
              Для доступности лучше использовать 'AppLink' чем вешать 'onClick' на кнопку
              Если кликнуть средней кнопкой мыши на кнопку, то в случае с 'onClick' перехода
              по ссылке не будет. С 'AppLink' переход по ссылке отработает
            */}
            <AppLink
              target={target}
              to={`${RoutePath.article_details}${article.id}`}
            >
              <Button theme={ButtonTheme.OUTLINE}>
                {t('Читать далее')}...
              </Button>
            </AppLink>

            <Text className={classes.views} text={String(article.views || 0)} />
            <Icon Svg={EyeIcon} />
          </div>
        </Card>
      </div>
    );
  }

/*
  Для доступности лучше использовать 'AppLink' чем вешать 'onClick' на 'Card'
  Если кликнуть средней кнопкой мыши на карточку, то в случае с 'onClick' перехода
  по ссылке не будет. С 'AppLink' переход по ссылке отработает
*/

  return (
    <AppLink
      className={classNames('', {}, [className, classes[view]])}
      target={target}
      to={`${RoutePath.article_details}${article.id}`}
      /* {...hoverHandlers} */
    >
      <Card className={classes.card}>
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

          <Text className={classes.views} text={String(article.views || 0)} />

          <Icon Svg={EyeIcon} />
        </div>

        <Text className={classes.title} text={article.title} />
      </Card>
    </AppLink>
  );
});

ArticleListItem.displayName = 'ArticleListItem';
