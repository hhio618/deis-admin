export interface IUser {
  email?: string;
  password?: string;
  username: string;
}

export class User implements IUser {
  email?: string = '';
  password?: string = '';
  username: string = '';
}
