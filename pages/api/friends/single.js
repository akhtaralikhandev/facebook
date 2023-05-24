import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { user_id } = req.query;
  try {
    const user = await prisma.users.findFirst({
      where: { user_id: user_id },
    });
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(error);
  }
};
export default handler;
