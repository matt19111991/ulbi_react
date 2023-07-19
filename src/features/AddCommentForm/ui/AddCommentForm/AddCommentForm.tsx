import { memo } from 'react';

import { classNames } from 'shared/lib/classNames/classNames';

import classes from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  className?: string;
}

export const AddCommentForm = memo(({ className }: AddCommentFormProps) => (
  // eslint-disable-next-line i18next/no-literal-string
  <div className={classNames(classes.AddCommentForm, {}, [className])}>
    Add comment form
  </div>
));

AddCommentForm.displayName = 'AddCommentForm';
