/*
  Warnings:

  - You are about to drop the column `postsPost_id` on the `Comments` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comments" DROP CONSTRAINT "Comments_postsPost_id_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "postsPost_id";

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Posts"("post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
