import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    const { email, username, password } = req.body;
    try {
      const alreadyUser = await prisma.users.findFirst({
        where: { email: email },
      });
      if (alreadyUser)
        return res
          .status(401)
          .json({ message: "email has already been taken" });
      const user = await prisma.users.create({
        data: {
          username: username,
          password: password,
          email: email,
        },
      });
      return res.status(200).json({ message: "Account created", user });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
};
export default handler;
