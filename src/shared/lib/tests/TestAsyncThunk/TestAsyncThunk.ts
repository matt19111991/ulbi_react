import axios, { AxiosStatic } from 'axios';
import { AsyncThunkAction, Dispatch } from '@reduxjs/toolkit';

import { StateSchema } from 'app/providers/StoreProvider';

/* Return        - ЧТО_ВЕРНЕТСЯ_ИЗ_THUNKA_ТИП
   Arg           - ЧТО_ПРИХОДИТ_В_КОНСТРУКТОР_ТИП
   RejectedValue - ЧТО_ВЕРНЕТСЯ_ИЗ_THUNKA_В_СЛУЧАЕ_ОШИБКИ_ТИП
 */

type ActionCreatorType<Return, Arg, RejectedValue> =
  (arg: Arg) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios'); // при помощи Jest делаем заглушку для 'axios'

/* shallow: true  (неглубокое копирование вложенных элементов)
   shallow: false (глубокое копирование вложенных элементов); по умолчанию
*/
const mockedAxios = jest.mocked(axios, { shallow: false }); // 'jest.mocked', чтобы TS работал корректно

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;
  api: jest.MockedFunctionDeep<AxiosStatic>;
  dispatch: Dispatch;
  getState: () => StateSchema;
  navigate: jest.MockedFn<any>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>, // есть возможность прокинуть 'default state' в отдельных случаях
  ) {
    this.actionCreator = actionCreator;

    this.api = mockedAxios;

    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateSchema);
    this.navigate = jest.fn();
  }

  async callThunk(arg?: Arg) {
//  'this.actionCreator' это 'createAsyncThunk', возвращает 'action' после вызова
    const action = this.actionCreator(arg!);

    const extra = {
      api: this.api,
      navigate: this.navigate,
    };

    const result = await action(this.dispatch, this.getState, extra);

    return result;
  }
}
