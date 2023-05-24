import React, { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { deleteCookie } from "cookies-next";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const profilePic = session?.user?.profilePic;
  const user = useSelector((state) => state?.user?.user);
  const handleSignOut = () => {
    signOut();
    deleteCookie("name", "akhtar");
    router.replace("/");
  };
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleProfileToggle = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href={"/"}>
              {" "}
              <h1 className="text-white font-bold text-lg">we share</h1>
            </Link>
          </div>
          <div className="flex items-center">
            <div className="flex sm:hidden">
              <button
                type="button"
                onClick={handleToggle}
                className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
              >
                <svg
                  className="h-6 w-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {isOpen ? (
                    <path
                      className="fill-current text-white"
                      d="M18 6L6 18M6 6l12 12"
                    />
                  ) : (
                    <path
                      className="fill-current text-white"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
            <div className="hidden sm:block">
              <ul className="ml-6 flex space-x-4">
                <Link href={"/"}>
                  <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Home
                  </li>
                </Link>
                <Link href={"/profile/profile"}>
                  <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    Profile
                  </li>
                </Link>
                <Link href={"/messages/home/home"}>
                  <li className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                    messages
                  </li>
                </Link>
              </ul>
            </div>
          </div>
          <div className="relative">
            <button
              type="button"
              onClick={handleProfileToggle}
              className="text-gray-400 hover:text-white focus:outline-none focus:text-white"
            >
              <img
                className="h-12 w-12 object-cover rounded-full"
                src={user?.profilePic}
                alt="profile"
              />
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
                <div className="py-2">
                  <Link href={"/profile/profile"}>
                    {" "}
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Change Picture
                    </a>
                  </Link>
                  <Link href={"/profile/profile"}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Account Settings
                    </a>{" "}
                  </Link>
                  <a
                    onClick={() => handleSignOut()}
                    href="#"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                  >
                    Sign Out
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden">
          <ul className="px-2 pt-2 pb-3 space-y-1">
            <li>
              <a
                href="#home"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
