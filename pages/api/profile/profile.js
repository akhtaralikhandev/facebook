import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const updateUserProfilePic = async (req, res) => {
  if (req.method === "PUT") {
    const { email } = req.query;
    const { username, profilePic } = req.body;
    console.log(req.body);
    try {
      const user = await prisma.users.findUnique({
        where: {
          email: email,
        },
      });
      if (!user) {
        throw new Error(`User with email ${email} not found.`);
      }
      const updatedData = {};
      if (username) {
        updatedData.username = username;
      }
      if (profilePic) {
        updatedData.profilePic = profilePic;
      }
      const updatedUser = await prisma.users.update({
        where: {
          user_id: user.user_id,
        },
        data: updatedData,
      });
      return res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Failed to update user." });
    }
  } else if (req.method === "GET") {
    const { email } = req.query;
    try {
      const user = await prisma.users.findFirst({
        where: {
          email: email,
        },
      });
      if (!user) return res.status(404).json("User not found");
      return res.status(200).json(user);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default updateUserProfilePic;
