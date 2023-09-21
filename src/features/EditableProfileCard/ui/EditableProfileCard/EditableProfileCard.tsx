import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Country } from '@/entities/Country';
import { Currency } from '@/entities/Currency';
import { ProfileCard } from '@/entities/Profile';

import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { classNames } from '@/shared/lib/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect';
import { Text, TextTheme } from '@/shared/ui/deprecated/Text';

import { VStack } from '@/shared/ui/redesigned/Stack';

import { EditableProfilePageHeader } from '../EditableProfilePageHeader/EditableProfilePageHeader';

import { ValidateProfileError } from '../../model/consts/consts';

import { getProfileError } from '../../model/selectors/getProfileError/getProfileError';
import { getProfileForm } from '../../model/selectors/getProfileForm/getProfileForm';
import { getProfileIsLoading } from '../../model/selectors/getProfileIsLoading/getProfileIsLoading';
import { getProfileReadOnly } from '../../model/selectors/getProfileReadOnly/getProfileReadOnly';
import { getProfileValidateErrors } from '../../model/selectors/getProfileValidateErrors/getProfileValidateErrors';

import { fetchProfileData } from '../../model/services/fetchProfileData/fetchProfileData';

import { profileActions, profileReducer } from '../../model/slice/profileSlice';

interface EditableProfileCardProps {
  className?: string;
  id?: string;
}

const reducers: ReducersList = {
  profile: profileReducer,
};

export const EditableProfileCard = memo(({ className, id }: EditableProfileCardProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const error = useSelector(getProfileError);
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const readOnly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorsTranslates = {
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_AVATAR]: t('Некорректная ссылка для аватарки'),
    [ValidateProfileError.INCORRECT_CITY]: t('Некорректное название города'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректное название страны'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректный тип валюты'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Некорректное имя пользователя'),
    [ValidateProfileError.NO_DATA]: t('Данные профиля не указаны'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
  };

  useInitialEffect(() => {
    if (id) {
      dispatch(fetchProfileData(id));
    }
  });

  const onChangeAge = useCallback(
    (value?: string) => {
      // валидация только на числа и пустую строку
      if (!value?.length || /^\d+$/.test(value)) {
        dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
      }
    },
    [dispatch],
  );

  const onChangeAvatar = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ avatar: value || '' }));
    },
    [dispatch],
  );

  const onChangeCity = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ city: value || '' }));
    },
    [dispatch],
  );

  const onChangeCountry = useCallback(
    (country: Country) => {
      dispatch(profileActions.updateProfile({ country }));
    },
    [dispatch],
  );

  const onChangeCurrency = useCallback(
    (currency: Currency) => {
      dispatch(profileActions.updateProfile({ currency }));
    },
    [dispatch],
  );

  const onChangeFirstName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ first: value || '' }));
    },
    [dispatch],
  );

  const onChangeLastName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ lastname: value || '' }));
    },
    [dispatch],
  );

  const onChangeUserName = useCallback(
    (value?: string) => {
      dispatch(profileActions.updateProfile({ username: value || '' }));
    },
    [dispatch],
  );

  return (
    <DynamicModuleLoader reducers={reducers}>
      <VStack className={classNames('', {}, [className])} gap='16' max>
        <EditableProfilePageHeader />

        {validateErrors?.length &&
          validateErrors.map((validateError) => (
            <Text
              data-testid='EditableProfileCard.Error'
              key={validateError}
              text={validateErrorsTranslates[validateError]}
              theme={TextTheme.ERROR}
            />
          ))}

        <ProfileCard
          data={formData}
          error={error}
          isLoading={isLoading}
          onChangeAge={onChangeAge}
          onChangeAvatar={onChangeAvatar}
          onChangeCity={onChangeCity}
          onChangeCountry={onChangeCountry}
          onChangeCurrency={onChangeCurrency}
          onChangeFirstName={onChangeFirstName}
          onChangeLastName={onChangeLastName}
          onChangeUserName={onChangeUserName}
          readOnly={readOnly}
        />
      </VStack>
    </DynamicModuleLoader>
  );
});

EditableProfileCard.displayName = 'EditableProfileCard';
