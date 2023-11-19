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

export const formatSentAt = (sentAt: string): string => {
  const date = new Date(sentAt);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return 'now';
  } else if (hours < 1) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (days < 1) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    // Format date without the hour
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
};