interface FakeLoginArgs {
  login?: string;
  password?: string;
}

export const fakeLogin = ({ login, password }: FakeLoginArgs) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      if (login && password) {
        resolve({ login, password });
      } else {
        reject({ message: 'Вы ввели неверный логин или пароль' });
      }
    }, 1000),
  );
