export interface User {
  id: string;
  password: string;
  username: string;
}

export interface UserSchema {
  authData?: User;
}
