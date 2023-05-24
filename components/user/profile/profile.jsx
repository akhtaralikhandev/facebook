import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { InfinitySpin } from "react-loader-spinner";
import Navbar from "../../navbar/navbar";

const ProfileCompOfUser = ({ user }) => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="profileCard relative mt-32 w-96 p-8 m-8 shadow-lg  flex flex-col items-center justify-center gap-8">
          <div className="relative">
            <img
              src={user?.profilePic}
              alt="Profile"
              className="w-48 h-48 object-cover rounded-full"
            />
          </div>
          <span className="text-xl  mb-4">
            <p> {user?.username}</p>
            <p className="mb-4">{user?.email}</p>
          </span>
          <button className="p-2 rounded-lg border border-blue-500 hover:bg-blue-500 hover:text-white">
            Add Friend
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompOfUser;
