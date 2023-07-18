import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import { Text } from 'shared/ui/Text/Text';

import { Comment } from '../../model/types/comment';

import { CommentCard } from '../CommentCard/CommentCard';

import classes from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[];
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();
  console.log('isLoading', isLoading);

  return (
    <div className={classNames(classes.CommentList, {}, [className])}>
      {comments?.length
        ? comments.map((comment) => <CommentCard comment={comment} key={comment.id} />)
        : <Text text={t('Комментарии отсутствуют')} />}
    </div>
  );
});

CommentList.displayName = 'CommentList';
