CREATE TABLE "users"(
    "uid" UUID NOT NULL,
    "profile_picture" VARCHAR(255) NOT NULL,
    "display_name" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "password" VARCHAR NOT NULL,
    "phone_number" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "about" VARCHAR(255) NOT NULL
);

CREATE TABLE "chats"(
    "uid" UUID NOT NULL,
    "messageUID" UUID NOT NULL
);
ALTER TABLE
    "chats" ADD PRIMARY KEY("uid");
CREATE TABLE "groups"(
    "id" UUID NOT NULL,
    "messageUID" UUID NOT NULL
);
ALTER TABLE
    "groups" ADD PRIMARY KEY("id");
CREATE TABLE "users_group"(
    "uid" UUID NOT NULL,
    "user_UID" UUID NOT NULL,
    "groupUID" UUID NOT NULL
);
ALTER TABLE
    "users_group" ADD PRIMARY KEY("uid");
CREATE TABLE "users_chats"(
    "uuid" UUID NOT NULL,
    "userUID" UUID NOT NULL,
    "chatUID" UUID NOT NULL
);
ALTER TABLE
    "users_chats" ADD PRIMARY KEY("uuid");
CREATE TABLE "messages"(
    "uid" UUID NOT NULL,
    "sender_uid" UUID NOT NULL,
    "chat_uid" UUID NULL,
    "group_uid" UUID NULL,
    "type" VARCHAR(255) CHECK
        ("type" IN('text', 'image', 'video', 'audio', 'file')) NOT NULL,
    "content" VARCHAR(255) NOT NULL,
    "sent_at" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "seen_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL,
    "delivered_at" TIMESTAMP(0) WITHOUT TIME ZONE NULL
);

ALTER TABLE
    "messages" ADD PRIMARY KEY("uid");

ALTER TABLE
    "users" ADD PRIMARY KEY("uid");
ALTER TABLE
    "users" ADD CONSTRAINT "users_username_unique" UNIQUE("username");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_group_uid_foreign" FOREIGN KEY("group_uid") REFERENCES "groups"("id");
ALTER TABLE
    "users_group" ADD CONSTRAINT "users_group_user_uid_foreign" FOREIGN KEY("user_UID") REFERENCES "users"("uid");
ALTER TABLE
    "chats" ADD CONSTRAINT "chats_messageuid_foreign" FOREIGN KEY("messageUID") REFERENCES "messages"("uid");
ALTER TABLE
    "users_group" ADD CONSTRAINT "users_group_groupuid_foreign" FOREIGN KEY("groupUID") REFERENCES "groups"("id");
ALTER TABLE
    "users_chats" ADD CONSTRAINT "users_chats_chatuid_foreign" FOREIGN KEY("chatUID") REFERENCES "chats"("uid");
ALTER TABLE
    "users_chats" ADD CONSTRAINT "users_chats_useruid_foreign" FOREIGN KEY("userUID") REFERENCES "users"("uid");
ALTER TABLE
    "groups" ADD CONSTRAINT "groups_messageuid_foreign" FOREIGN KEY("messageUID") REFERENCES "messages"("uid");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_chat_uid_foreign" FOREIGN KEY("chat_uid") REFERENCES "chats"("uid");
ALTER TABLE
    "messages" ADD CONSTRAINT "messages_sender_uid_foreign" FOREIGN KEY("sender_uid") REFERENCES "users"("uid");