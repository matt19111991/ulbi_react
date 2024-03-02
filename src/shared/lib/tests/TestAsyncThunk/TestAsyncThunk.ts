import axios from 'axios';
import type { AxiosStatic } from 'axios';
import type { AsyncThunkAction } from '@reduxjs/toolkit';

import type { AppDispatch, StateSchema } from '@/app/providers/StoreProvider';

jest.mock('axios'); // при помощи 'Jest' делаем заглушку для 'axios'

/*
  shallow: true (неглубокое копирование вложенных элементов)
  shallow: false (глубокое копирование вложенных элементов); по умолчанию

 'jest.mocked' используем, чтобы 'TS' работал корректно с вложенными структурами
*/
const mockedTypedAxios = jest.mocked(axios, { shallow: false });

/*
  Return        - ЧТО_ВЕРНЕТСЯ_ИЗ_THUNKA_ТИП
  Arg           - ЧТО_ПРИХОДИТ_В_КОНСТРУКТОР_ТИП
  RejectedValue - ЧТО_ВЕРНЕТСЯ_ИЗ_THUNKA_В_СЛУЧАЕ_ОШИБКИ_ТИП
*/
type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  /**
   * Создатель действия ('initAuthData', 'saveJsonSettings',- то, что диспатчится)
   */
  private readonly actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  /**
   * 'API' инстанс
   */
  public api: jest.MockedFunctionDeep<AxiosStatic>;

  /**
   * Вызов асинхронных действий
   */
  public dispatch: AppDispatch;

  /**
   * Функция для получения объекта хранилища целиком
   */
  private readonly getState: () => StateSchema;

  /**
   * Функция для навигации
   */
  private readonly navigate: jest.MockedFn<typeof jest.fn>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>, // есть возможность прокинуть 'default state' в отдельных случаях
    unwrappedResult?: Return, // возвращаемые данные из метода '.unwrap()'
  ) {
    this.actionCreator = actionCreator;

    this.api = mockedTypedAxios;

    this.dispatch = jest.fn(() => ({
      // в типе 'AsyncThunkAction' поле 'unwrap()' возвращает 'Promise<Return>'
      unwrap: async (): Promise<Return | undefined> => unwrappedResult,
    }));

    this.getState = jest.fn(() => state as StateSchema);

    this.navigate = jest.fn();
  }

  async callThunk(arg?: Arg) {
    // 'this.actionCreator' это 'createAsyncThunk', возвращает 'action' после вызова
    const action = this.actionCreator(arg as Arg);

    const extra = {
      api: this.api,
      navigate: this.navigate,
    };

    const result = await action(this.dispatch, this.getState, extra);

    return result;
  }
}
