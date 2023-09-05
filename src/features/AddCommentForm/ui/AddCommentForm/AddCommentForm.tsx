import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  isLoading: boolean;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className, isLoading, onSendComment }: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const text = useSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');

    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <HStack
        className={classNames(classes.AddCommentForm, { [classes.loading]: isLoading }, [
          className,
        ])}
        data-testid='AddCommentForm'
        justify='between'
        max
      >
        <Input
          className={classes.input}
          data-testid='AddCommentForm.Input'
          fullWidth
          onChange={onCommentTextChange}
          placeholder={t('Введите текст комментария')}
          value={text}
        />

        <Button
          data-testid='AddCommentForm.Button'
          onClick={onSendHandler}
          theme={ButtonTheme.OUTLINE}
        >
          {t('Отправить')}
        </Button>
      </HStack>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
