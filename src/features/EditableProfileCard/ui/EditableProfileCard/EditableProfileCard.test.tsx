import { screen } from '@testing-library/react';

// userEvent должен быть асинхронным: 'await userEvent.click(...);'
import userEvent from '@testing-library/user-event';

import { Country } from 'entities/Country';
import { Currency } from 'entities/Currency';
import { Profile } from 'entities/Profile';

import { $api } from 'shared/api/api';
import { componentTestRenderer } from 'shared/lib/tests/componentTestRenderer/componentTestRenderer';

import { profileReducer } from '../../model/slice/profileSlice';

import { EditableProfileCard } from './EditableProfileCard';

const profile: Profile = {
  age: 22,
  avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
  city: 'New-York',
  country: Country.USA,
  currency: Currency.USD,
  first: 'Jack',
  id: '1',
  lastname: 'White',
  username: 'jack_white',
};

const options = {
  asyncReducers: {
    profile: profileReducer,
  },
  initialState: {
    profile: {
      data: profile,
      form: profile,
      readonly: true,
    },
    user: {
      authData: {
        avatar: 'https://img.freepik.com/premium-vector/a-black-cat-with-a-red-eye-and-a-butterfly-on-the-front_890790-136.jpg',
        id: '1',
        username: 'jack_white',
      },
    },
  },
};

describe('EditableProfileCard', () => {
  test('should render component', () => {
    componentTestRenderer(<EditableProfileCard id='1' />);

    expect(screen.getByText('Профиль')).toBeInTheDocument();
  });

  test('should toggle editing mode to true', async () => {
    componentTestRenderer(<EditableProfileCard id='1' />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
  });

  test('should reset data after cancel', async () => {
    componentTestRenderer(<EditableProfileCard id='1' />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));
    await userEvent.clear(screen.getByTestId('ProfileCard.lastName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Mary');
    await userEvent.type(screen.getByTestId('ProfileCard.lastName'), 'Jane');

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Mary');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('Jane');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.CancelButton'));

    expect(screen.getByTestId('ProfileCard.firstName')).toHaveValue('Jack');
    expect(screen.getByTestId('ProfileCard.lastName')).toHaveValue('White');
  });

  test('should display error', async () => {
    componentTestRenderer(<EditableProfileCard id='1' />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(screen.getByTestId('EditableProfileCard.Error.Paragraph')).toBeInTheDocument();
  });

  test('should send PUT request without validation errors', async () => {
    // делаем 'mock' для объекта (инстанс 'axios') и метода 'PUT'
    const mockPutRequest = jest.spyOn($api, 'put');

    componentTestRenderer(<EditableProfileCard id='1' />, options);

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));

    await userEvent.clear(screen.getByTestId('ProfileCard.firstName'));

    await userEvent.type(screen.getByTestId('ProfileCard.firstName'), 'Mary');

    await userEvent.click(screen.getByTestId('EditableProfileCardHeader.SaveButton'));

    expect(mockPutRequest).toHaveBeenCalled();
  });
});
