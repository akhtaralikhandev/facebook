import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { title } = req.body;
    const { user_id } = req.query;

    try {
      console.log(req.body);
      console.log(req.query);
      const createGroup = await prisma.chatGroup.create({
        data: {
          title: title,
        },
      });
      const userChatGroup = await prisma.userChatGroup.create({
        data: {
          chat_group_id: createGroup.chat_group_id,
          user_id: user_id,
        },
      });
      return res.status(200).json(userChatGroup);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
