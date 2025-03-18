export type CSRFToken = {
  csrfToken: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
};

export type DataPassword = Pick<User, 'password'> & CSRFToken;
export type DataProfile = Omit<User, 'password' | 'id'> & CSRFToken;
export type DataLogin = Omit<User, 'name' | 'id'>;
export type DataUser = Omit<User, 'password'>;
