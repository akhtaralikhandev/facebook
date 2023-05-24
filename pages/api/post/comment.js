import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      const { user_id, post_id } = req.query;
      const { comment } = req.body;
      const newComment = await prisma.comments.create({
        data: {
          userId: user_id,

          postId: post_id,
          comment: comment,
        },
      });
      const updatedPost = await prisma.posts.findFirst({
        where: {
          post_id: post_id,
        },
        include: {
          Likes: true,
          Comments: {
            include: {
              user: {
                select: {
                  username: true,
                  profilePic: true,
                },
              },
            },
          },
          user: {
            select: { username: true, profilePic: true },
          },
        },
      });
      return res
        .status(200)
        .json({ message: "updatedSucceslfuy", updatedPost: updatedPost });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
export default handler;
