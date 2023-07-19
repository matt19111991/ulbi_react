import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';

import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';

import { sendComment } from '../../model/services/sendComment';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

interface AddCommentFormProps {
  className?: string;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = ({ className }: AddCommentFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const error = useSelector(getAddCommentFormError);
  console.log('error', error);

  const text = useSelector(getAddCommentFormText);

  const onCommentTextChange = useCallback((value: string) => {
    dispatch(addCommentFormActions.setText(value));
  }, [dispatch]);

  const onSendComment = useCallback(() => {
    dispatch(sendComment());
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <div className={classNames(classes.AddCommentForm, {}, [className])}>
        <Input
          className={classes.input}
          fullWidth
          onChange={onCommentTextChange}
          placeholder={t('Введите текст комментария')}
          value={text}
        />

        <Button onClick={onSendComment} theme={ButtonTheme.OUTLINE}>
          {t('Отправить')}
        </Button>
      </div>
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
