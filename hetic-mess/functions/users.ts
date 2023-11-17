import { pb } from '../db/pocket';

export const getUserById = async id => {
  const user = await pb.collection('users').getOne(id);
  return user;
};
