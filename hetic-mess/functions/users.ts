import { pb } from "../db/pocket";

export const getUserById = async id => {
  const user = await pb.collection('users').getOne(id);
  return user;
};

export const getAllUsers = async () => {
  return await pb.collection('users').getFullList();
};

export const getVerifiedUsers = async () => {
  return await pb.collection('users').getFullList({
    filter: 'verified = true'
  });
}
