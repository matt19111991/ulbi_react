import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { getArticleCommentsAreLoading } from '@/pages/ArticleDetailsPage';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Input } from '@/shared/ui/Input/Input';
import { HStack } from '@/shared/ui/Stack';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className, onSendComment }: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const isLoading = useSelector(getArticleCommentsAreLoading);
  const text = useSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');

    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack
        className={
          classNames(
            classes.AddCommentForm,
            { [classes.loading]: isLoading },
            [className],
          )
        }
        justify='between'
        max
      >
        <Input
          className={classes.input}
          fullWidth
          onChange={onCommentTextChange}
          placeholder={t('Введите текст комментария')}
          value={text}
        />

        <Button onClick={onSendHandler} theme={ButtonTheme.OUTLINE}>
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
