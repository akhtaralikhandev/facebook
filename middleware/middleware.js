import { getSession } from "next-auth/react";

const protectRoute = async (req, res, next) => {
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, { Location: "/login" });
    res.end();
    return;
  }

  return next();
};

export default protectRoute;
