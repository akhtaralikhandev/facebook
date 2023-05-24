import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const allGroups = await prisma.userChatGroup.findMany({
        include: {
          chatGroup: {
            select: {
              title: true,
              chat_group_id: true,
            },
          },
          User: {
            select: {
              username: true,
            },
          },
          messages: true,
        },
      });
      if (!allGroups) return res.status(404).json("No group is formed yet");
      return res.status(200).json(allGroups);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
