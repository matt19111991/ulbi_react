import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import { Comment } from '../../model/types/comment';

import classes from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment: Comment;
  isLoading?: boolean;
}

export const CommentCard = memo(({ className, comment, isLoading }: CommentCardProps) => (
  <div className={classNames(classes.CommentCard, {}, [className])}>
    {isLoading}
    {comment.text}
  </div>
));

CommentCard.displayName = 'CommentCard';
