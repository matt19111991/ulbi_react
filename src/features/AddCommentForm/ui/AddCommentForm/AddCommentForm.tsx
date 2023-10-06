import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ToggleFeatures } from '@/shared/lib/features';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';

import { Button as ButtonRedesigned } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input as InputRedesigned } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import { getAddCommentFormText } from '../../model/selectors/addCommentFormSelectors';

import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import classes from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  /**
   * Внешний класс
   */
  className?: string;

  /**
   * Состояние загрузки
   */
  isLoading: boolean;

  /**
   * Обработчик отправки комментария
   */
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
      <ToggleFeatures
        feature='isAppRedesigned'
        on={
          <Card border='partial' max padding='24'>
            <HStack
              className={classNames(classes.stack, { [classes.loading]: isLoading }, [className])}
              data-testid='AddCommentForm'
              gap='16'
              justify='between'
              max
            >
              <InputRedesigned
                className={classes.input}
                data-testid='AddCommentForm.Input'
                fullWidth
                onChange={onCommentTextChange}
                placeholder={t('Введите текст комментария')}
                value={text}
              />

              <ButtonRedesigned
                data-testid='AddCommentForm.Button'
                onClick={onSendHandler}
                variant='outline'
              >
                {t('Отправить')}
              </ButtonRedesigned>
            </HStack>
          </Card>
        }
        off={
          <HStack
            className={classNames(classes.AddCommentForm, { [classes.loading]: isLoading }, [
              className,
            ])}
            data-testid='AddCommentForm'
            justify='between'
            max
          >
            <InputDeprecated
              className={classes.input}
              data-testid='AddCommentForm.Input'
              fullWidth
              onChange={onCommentTextChange}
              placeholder={t('Введите текст комментария')}
              value={text}
            />

            <ButtonDeprecated
              data-testid='AddCommentForm.Button'
              onClick={onSendHandler}
              theme={ButtonTheme.OUTLINE}
            >
              {t('Отправить')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
};

export default memo(AddCommentForm);
