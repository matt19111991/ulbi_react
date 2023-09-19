import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import EyeIcon from '@/shared/assets/icons/eye-redesigned.svg';

import { getRouteArticleDetails } from '@/shared/const/router';

import { classNames } from '@/shared/lib/classNames/classNames';

import { AppImage } from '@/shared/ui/redesigned/AppImage';
import { AppLink } from '@/shared/ui/redesigned/AppLink';
import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Skeleton } from '@/shared/ui/redesigned/Skeleton';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { ArticleBlockType, ArticleView } from '../../../model/consts/articleConsts';

import { ArticleTextBlock } from '../../../model/types/article';

import { ArticleListItemProps } from '../ArticleListItem';

import classes from './ArticleListItemRedesigned.module.scss';

export const ArticleListItemRedesigned = memo(
  ({ article, className, target, view }: ArticleListItemProps) => {
    const { t } = useTranslation();

    const userInfo = (
      <>
        <Avatar size={32} src={article.user.avatar} />
        <Text bold text={article.user.username} />
      </>
    );

    const views = (
      <HStack gap='8'>
        <Icon Svg={EyeIcon} />
        <Text className={classes.views} text={String(article.views || 0)} />
      </HStack>
    );

    if (view === ArticleView.LIST) {
      const firstTextBlock = article.blocks.find(
        (block) => block.type === ArticleBlockType.TEXT,
      ) as ArticleTextBlock;

      return (
        <Card
          className={classNames('', {}, [className, classes[view]])}
          data-testid='ArticleListItem'
          max
          padding='24'
        >
          <VStack align='start' gap='16' max>
            <HStack gap='16' max>
              {userInfo}

              <Text text={article.createdAt} />
            </HStack>

            <Text bold title={article.title} />

            <Text className={classes.subtitle} size='s' title={article.subtitle} />

            <AppImage
              alt={article.title}
              className={classes.image}
              loadingFallback={<Skeleton height={250} width='100%' />}
              src={article.img}
            />

            {firstTextBlock?.paragraphs && (
              <Text
                className={classes.textBlock}
                text={firstTextBlock.paragraphs.slice(0, 2).join(' ')}
              />
            )}

            <HStack justify='between' max>
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
                <Button variant='outline'>{t('Читать далее')}...</Button>
              </AppLink>

              {views}
            </HStack>
          </VStack>
        </Card>
      );
    }

    return (
      <AppLink
        className={classNames('', {}, [className, classes[view]])}
        data-testid='ArticleListItem'
        target={target}
        to={getRouteArticleDetails(article.id)}
      >
        <Card border='round' className={classes.card}>
          <AppImage
            alt={article.title}
            className={classes.image}
            loadingFallback={<Skeleton height={200} width={200} />}
            src={article.img}
          />

          <VStack align='start' className={classes.info} gap='4' max>
            <Text className={classes.title} text={article.title} />

            <VStack className={classes.footer} gap='4' max>
              <HStack justify='between' max>
                <Text className={classes.date} text={article.createdAt} />

                {views}
              </HStack>

              <HStack gap='8' max>
                {userInfo}
              </HStack>
            </VStack>
          </VStack>
        </Card>
      </AppLink>
    );
  },
);

ArticleListItemRedesigned.displayName = 'ArticleListItemRedesigned';
