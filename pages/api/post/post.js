import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.query;
    // const { email, ...postData } = req.body;
    try {
      const user = await prisma.users.findFirst({
        where: { email: email },
      });
      console.log(user);
      const post = await prisma.posts.create({
        data: {
          userId: user.user_id,
          ...req.body,
        },
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
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    if (req.method === "GET") {
      try {
        const posts = await prisma.posts.findMany({
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
        return res.status(200).json(posts);
      } catch (error) {
        console.log(error);
        return res.status(500).json(error);
      }
    }
  } else if (req.method === "DELETE") {
    console.log(req.body);
    console.log(req.query);
    const { user_id, post_id } = req.query;
    try {
      const post = await prisma.posts.findUnique({
        where: { post_id: post_id },
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      if (post.userId !== user_id) {
        return res
          .status(403)
          .json({ message: "Forbidden: Cannot delete other user's post" });
      }

      // Delete associated likes
      await prisma.likes.deleteMany({
        where: { postId: post_id },
      });

      // Delete associated comments
      await prisma.comments.deleteMany({
        where: { postId: post_id },
      });

      // Delete the post
      const deletedPost = await prisma.posts.delete({
        where: { post_id: post_id },
      });

      return res
        .status(200)
        .json({ message: "Delete successful", deletedPost: deletedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "PUT") {
    const { post_id } = req.query;
    try {
      const post = await prisma.posts.findUnique({
        where: { post_id: post_id },
      });

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      // Check if the authenticated user has permission to edit the post
      // You can implement your own authorization logic here

      // Update the post
      const updatedPost = await prisma.posts.update({
        where: { post_id: post_id },
        data: { ...req.body }, // Update the post with the new data from the request body
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
        .json({ message: "Post updated successfully", updatedPost });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
