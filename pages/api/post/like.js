import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { user_id, post_id } = req.query;
    try {
      const post = await prisma.posts.findUnique({
        where: { post_id: post_id },
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      const existingLike = await prisma.likes.findFirst({
        where: { postId: post_id, userId: user_id },
      });

      if (existingLike) {
        // User already liked the post, so dislike it
        await prisma.likes.delete({
          where: { like_id: existingLike.like_id },
        });
        // Retrieve the updated post after disliking
        const updatedPost = await prisma.posts.findUnique({
          where: { post_id: post_id },
          include: {
            user: {
              select: {
                username: true,
                profilePic: true,
              },
            },
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
          },
        });
        return res
          .status(200)
          .json({ message: "Post disliked", updatedPost: updatedPost });
      } else {
        // User hasn't liked the post yet, so like it
        const newLike = await prisma.likes.create({
          data: {
            postId: post_id,
            userId: user_id,
          },
        });
        // Retrieve the updated post after liking
        const updatedPost = await prisma.posts.findUnique({
          where: { post_id: post_id },

          include: {
            user: {
              select: { username: true, profilePic: true },
            },
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
          },
        });
        return res
          .status(200)
          .json({ message: "Post liked", updatedPost: updatedPost });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
