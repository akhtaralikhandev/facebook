import NextAuth from "next-auth";
import { getSession } from "next-auth/react";

const options = {
  // Other options...
  callbacks: {
    async getSession(session) {
      // If the session exists, return it
      if (session) {
        return session;
      }

      // If the session doesn't exist, throw an error to prevent access to the page
      throw new Error("Unauthorized");
    },
  },
};

export default NextAuth(options);
