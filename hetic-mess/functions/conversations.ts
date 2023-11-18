import { pb } from '../db/pocket';
import { getUserById } from './users';

const conversationCollection = pb.collection('conversations');

export const createConversation = async data => {
  const conversation = await conversationCollection.create(data);
  return conversation;
};

export const getConversations = async () => {
  const records = await conversationCollection.getFullList({
    sort: '-created',
  });
  return records;
};

export const filterConversationsByCurrentUser = conversations => {
  const currentUserID = pb.authStore.model.id;
  return conversations.filter(conversation =>
    conversation.participants.includes(currentUserID),
  );
};

export const extractParticipantsUsernames = async participants => {
  const usernames = await Promise.all(participants.map(getUserById));
  return usernames.filter(username => username !== pb.authStore.model.id);
};
