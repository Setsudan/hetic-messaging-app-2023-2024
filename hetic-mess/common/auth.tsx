import { pb } from '../db/pocket';

export const login = async (identity, password) => {
  try {
    const authData = await pb
      .collection('users')
      .authWithPassword(identity, password);

    if (authData) {
      return authData;
    }
  } catch (error) {
    return error;
  }
};

export interface RegisterData {
  username: string;
  email: string;
  emailVisibility: boolean;
  password: string;
  passwordConfirm: string;
  name: string;
}

export const register = async (props: RegisterData) => {
  const record = await pb.collection('users').create(props);
  return { record };
};