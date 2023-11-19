import { People } from "./people.type";

export interface Conversation {
  collectionId: string;
  collectionName: string;
  conversation_image: string;
  created: string;
  id: string;
  is_group: boolean;
  messages: string[];
  name: string;
  updated: string;
  username: string;
  verified: boolean;
}

interface LastMessage {
  content: string;
  sender: string;
  senderId: string;
  sentAt: string;
}

export interface UpdatedConversation extends Conversation {
  last_message?: LastMessage;
  participants: People[];
}