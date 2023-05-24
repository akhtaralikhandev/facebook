import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { user_chat_group_id } = req.query;
    const { message } = req.body;
    try {
      const newMessage = await prisma.message.create({
        data: {
          user_chat_group_id: user_chat_group_id,
          message: message,
        },
      });
      return res.status(200).json(newMessage);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  } else if (req.method === "GET") {
    const { chat_group_id } = req.query;
    try {
      const messagesWithUsernames = await prisma.message.findMany({
        where: {
          userChatGroup: {
            chatGroup: {
              chat_group_id: chat_group_id,
            },
          },
        },
        include: {
          userChatGroup: {
            include: {
              User: {
                select: {
                  username: true,
                },
              },
            },
          },
        },
      });

      const response = messagesWithUsernames.map((message) => {
        const username = message.userChatGroup.User.username;
        const messageContent = message.message;
        return {
          message: messageContent,
          username: username,
        };
      });

      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};
export default handler;
