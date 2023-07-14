import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';

import {
  fetchProfileData,
  getProfileError,
  getProfileForm,
  getProfileIsLoading,
  getProfileReadOnly,
  getProfileValidateErrors,
  profileActions,
  ProfileCard,
  profileReducer,
  ValidateProfileError,
} from 'entities/Profile';

import { classNames } from 'shared/lib/classNames/classNames';

import {
  DynamicModuleLoader,
  ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

import { Text, TextTheme } from 'shared/ui/Text/Text';

import { ProfilePageHeader } from './ProfilePageHeader/ProfilePageHeader';

interface ProfilePageProps {
  className?: string;
}

const initialReducers: ReducersList = {
  profile: profileReducer,
};

const ProfilePage = memo(({ className }: ProfilePageProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('profile');

  const error = useSelector(getProfileError);
  const formData = useSelector(getProfileForm);
  const isLoading = useSelector(getProfileIsLoading);
  const readOnly = useSelector(getProfileReadOnly);
  const validateErrors = useSelector(getProfileValidateErrors);

  const validateErrorsTranslates = {
    [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    [ValidateProfileError.INCORRECT_AVATAR]: t('Некорретная ссылка для аватара'),
    [ValidateProfileError.INCORRECT_CITY]: t('Некорректное название города'),
    [ValidateProfileError.INCORRECT_COUNTRY]: t('Некорректное название страны'),
    [ValidateProfileError.INCORRECT_CURRENCY]: t('Некорректный тип валюты'),
    [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и фамилия обязательны'),
    [ValidateProfileError.INCORRECT_USERNAME]: t('Некорректное имя пользователя'),
    [ValidateProfileError.NO_DATA]: t('Данные профиля не указаны'),
    [ValidateProfileError.SERVER_ERROR]: t('Серверная ошибка при сохранении'),
  };

  useEffect(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchProfileData());
    }
  }, [dispatch]);

  const onChangeAge = useCallback((value?: string) => {
    if (!value?.length || /^\d+$/.test(value)) { // валидация только на числа и пустую строку
      dispatch(profileActions.updateProfile({ age: Number(value || 0) }));
    }
  }, [dispatch]);

  const onChangeAvatar = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ avatar: value || '' }));
  }, [dispatch]);

  const onChangeCity = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ city: value || '' }));
  }, [dispatch]);

  const onChangeCountry = useCallback((country: Country) => {
    dispatch(profileActions.updateProfile({ country }));
  }, [dispatch]);

  const onChangeCurrency = useCallback((currency: Currency) => {
    dispatch(profileActions.updateProfile({ currency }));
  }, [dispatch]);

  const onChangeFirstName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ first: value || '' }));
  }, [dispatch]);

  const onChangeLastName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ lastname: value || '' }));
  }, [dispatch]);

  const onChangeUserName = useCallback((value?: string) => {
    dispatch(profileActions.updateProfile({ username: value || '' }));
  }, [dispatch]);

  return (
    <DynamicModuleLoader reducers={initialReducers} removeAfterUnmount>
      <div className={classNames('', {}, [className])}>
        <ProfilePageHeader />

        {validateErrors?.length && validateErrors.map((validateError) => (
          <Text
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
      </div>
    </DynamicModuleLoader>
  );
});

ProfilePage.displayName = 'ProfilePage';

export default ProfilePage;
