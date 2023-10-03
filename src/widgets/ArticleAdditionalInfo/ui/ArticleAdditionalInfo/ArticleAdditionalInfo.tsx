import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { User } from '@/entities/User';

import { classNames } from '@/shared/lib/classNames/classNames';

import { Avatar } from '@/shared/ui/redesigned/Avatar';
import { Button } from '@/shared/ui/redesigned/Button';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

interface ArticleAdditionalInfoProps {
  /**
   * Автор статьи
   */
  author: User;

  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Дата создания
   */
  createdAt: string;

  /**
   * Компонент запущен из storybook
   */
  isStorybook?: boolean;

  /**
   * Обработчик редактирования статьи
   */
  onEdit: () => void;

  /**
   * Количество просмотров статьи
   */
  views: number;
}

export const ArticleAdditionalInfo = memo(
  ({
    author,
    className,
    createdAt,
    isStorybook = false,
    onEdit,
    views,
  }: ArticleAdditionalInfoProps) => {
    const { t } = useTranslation();

    return (
      <VStack align='start' className={classNames('', {}, [className])} gap='16'>
        <HStack gap='8'>
          <Avatar profileId={author.id} size={32} src={author.avatar} />

          <Text bold text={author.username} />

          <Text text={createdAt} />
        </HStack>

        <Button onClick={onEdit} size='s'>
          {t('Редактировать')}
        </Button>

        {/*
            Плюральные формы
            По умолчанию переменная должна называться 'count'

                 ru           en                     ru                                                   en
            0 просмотров | 0 views | "{{count}} просмотров_zero": "{{count}} просмотров" | "{{count}} просмотров_zero": "{{count}} views"
            1 просмотр   | 1 view  | "{{count}} просмотров_one": "{{count}} просмотр"    | "{{count}} просмотров_one": "{{count}} view"
            2 просмотра  | 2 views | "{{count}} просмотров_few": "{{count}} просмотра"   | "{{count}} просмотров_other": "{{count}} views"
            5 просмотров | 5 views | "{{count}} просмотров_many": "{{count}} просмотров" | "{{count}} просмотров_other": "{{count}} views"
        */}

        <Text text={isStorybook ? '9 просмотров' : t('{{count}} просмотров', { count: views })} />
      </VStack>
    );
  },
);

ArticleAdditionalInfo.displayName = 'ArticleAdditionalInfo';
