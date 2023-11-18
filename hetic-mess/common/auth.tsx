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
