import { screen } from '@testing-library/react';

// 'userEvent' должен быть асинхронным: 'await userEvent.click(...);'
import userEvent from '@testing-library/user-event';

import { Country } from '@/entities/Country/testing';
import { Currency } from '@/entities/Currency/testing';
import type { Profile } from '@/entities/Profile/testing';
import type { UserSchema } from '@/entities/User/testing';

import { $api } from '@/shared/api/api';

import type { ReducersList } from '@/shared/lib/components/DynamicModuleLoaderV2/DynamicModuleLoaderV2';

import { componentTestRenderer } from '@/shared/lib/tests';

import { profileReducer } from '../../model/slice/profileSlice';

import type { ProfileSchema } from '../../model/types/editableProfileCardSchema';

import { EditableProfileCard } from './EditableProfileCard';

// нужен 'mock' для 'axios', иначе ошибки в 'PUT' запросах при запуске теста
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: {
        use: jest.fn(),
      },
    },
    put: jest.fn(),
  })),
}));

const profile: Profile = {
  age: 22,
  avatar:
    'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  id: '1',
  lastname: 'Smith',
  username: 'Jack',
};

interface Options {
  asyncReducers: ReducersList;
  initialState: {
    profile: ProfileSchema;
    user: UserSchema;
  };
}

const options: Options = {
  asyncReducers: {
    profile: profileReducer,
  },
  initialState: {
    profile: {
      data: profile,
      form: profile,
      isLoading: false,
      readonly: true,
    },
    user: {
      authData: {
        avatar: profile.avatar,
        id: profile.id!,
        username: profile.username!,
      },
      mounted: true,
    },
  },
};

describe('EditableProfileCard', () => {
  test('should render component', () => {
    componentTestRenderer(<EditableProfileCard id={profile.id} />, options);

    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  test('should toggle editing mode to true', async () => {
    componentTestRenderer(<EditableProfileCard id={profile.id} />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('should reset data after cancel', async () => {
    componentTestRenderer(<EditableProfileCard id={profile.id} />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Mary');
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'Jane');

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Mary');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Jane');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Jack');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Smith');
  });

  test('should display error', async () => {
    componentTestRenderer(<EditableProfileCard id={profile.id} />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('should send PUT request without validation errors', async () => {
    // делаем 'mock' для объекта (инстанса 'axios') и метода 'PUT'
    const mockPutRequest = jest.spyOn($api, 'put');

    componentTestRenderer(<EditableProfileCard id={profile.id} />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Mary');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutRequest).toHaveBeenCalled();
  });
});
