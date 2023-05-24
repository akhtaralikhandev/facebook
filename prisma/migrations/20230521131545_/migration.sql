-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postId_fkey";

-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "postsPost_id" TEXT;

-- CreateTable
CREATE TABLE "ChatGroup" (
    "chat_group_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "ChatGroup_pkey" PRIMARY KEY ("chat_group_id")
);

-- CreateTable
CREATE TABLE "userChatGroup" (
    "user_chat_group_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_group_id" TEXT NOT NULL,

    CONSTRAINT "userChatGroup_pkey" PRIMARY KEY ("user_chat_group_id")
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "user_chat_group_id" TEXT NOT NULL,

    CONSTRAINT "message_pkey" PRIMARY KEY ("message_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ChatGroup_chat_group_id_key" ON "ChatGroup"("chat_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "userChatGroup_user_chat_group_id_key" ON "userChatGroup"("user_chat_group_id");

-- CreateIndex
CREATE UNIQUE INDEX "message_message_id_key" ON "message"("message_id");

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postsPost_id_fkey" FOREIGN KEY ("postsPost_id") REFERENCES "Posts"("post_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userChatGroup" ADD CONSTRAINT "userChatGroup_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userChatGroup" ADD CONSTRAINT "userChatGroup_chat_group_id_fkey" FOREIGN KEY ("chat_group_id") REFERENCES "ChatGroup"("chat_group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_user_chat_group_id_fkey" FOREIGN KEY ("user_chat_group_id") REFERENCES "userChatGroup"("user_chat_group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
