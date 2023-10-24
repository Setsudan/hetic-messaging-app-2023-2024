export type Message = {
	uid: string;
	sender_uid: string;
	chat_uid?: string;
	group_uid?: string;
	type: 'text' | 'image' | 'video' | 'audio' | 'file';
	content: string;
	sent_at: Date;
	seen_at?: Date;
	delivered_at?: Date;
};
