import { useState } from "react";
import Navbar from "../navbar/navbar";
import "../../app/globals.css";
import axios from "axios";
import { useRouter } from "next/router";
import Sidebar from "./sidebar";
import { useSelector, useDispatch } from "react-redux";
import { createGroup } from "../../redux/features/message/messageSlice";
import { Puff } from "react-loader-spinner";
const HomeComponentMessages = () => {
  const [title, setTitle] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [createLoading, setCreateLoading] = useState(false);
  const handleFriendSelection = (friendValue) => {
    if (selectedFriends.includes(friendValue)) {
      setSelectedFriends(
        selectedFriends.filter((friend) => friend !== friendValue)
      );
    } else {
      setSelectedFriends([...selectedFriends, friendValue]);
    }
  };
  const user_id = useSelector((state) => state?.user?.user?.user_id);
  const handleCreateGroup = async (e, user_id) => {
    if (title) {
      e.preventDefault();
      try {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_API}/messenger/group/create?user_id=${user_id}`,
          { title: title }
        );
        setCreateLoading(true);
        console.log(resp);
        if (resp.status === 200) {
          console.log(resp.data);
          setCreateLoading(false);
          router.push(`/messages/groups/${resp.data?.user_chat_group_id}`);
        } else {
          console.log(resp);
          setCreateLoading(false);
        }
      } catch (error) {
        console.log(error);
        setCreateLoading(false);
      }
    }
  };

  console.log(selectedFriends);
  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>

      <div className="flex pt-16">
        <div className="leftSideHome  w-56 fixed border border-black h-full ">
          <Sidebar />
        </div>
        <div className="rightSideHomeCreateGroup w-full flex bg-lime-100  justify-center p-8  ml-52 ">
          {createLoading ? (
            <Puff
              height="180"
              width="180"
              radius={1}
              color="#4fa94d"
              ariaLabel="puff-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          ) : (
            <div className="createGRoupSection w-96 flex gap-7 flex-col bg-white  shadow-lg p-3">
              <label className="text-2xl text-blue-900" htmlFor="">
                Title
              </label>
              <input
                placeholder="write title here"
                type="text"
                className="p-2 border-2 border-blue-500 outline-blue-700 "
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <select
                className="p-2 border-2 border-blue-500 outline-blue-700"
                id=""
              >
                <option value="" disabled selected hidden>
                  Choose category
                </option>
                <option value="friends">Friends</option>
                <option value="family">Family</option>
                <option value="college">College</option>
                <option value="business">Business</option>
              </select>
              <div className="flex flex-col items-center text-xl gap-2 h-80 overflow-y-auto">
                <p className="text-lg text-blue-900">
                  Choose friends to invite:
                </p>
                <input
                  type="text"
                  className="p-2 border-2 border-blue-500 outline-blue-700 "
                  placeholder="search here for friends"
                />
                <div>
                  <label className="flex gap-4 items-center" htmlFor="friend1">
                    <input
                      type="checkbox"
                      className="transform scale-150"
                      id="friend1"
                      value="friend1"
                      checked={selectedFriends.includes("friend1")}
                      onChange={() => handleFriendSelection("friend1")}
                    />
                    Friend 1
                  </label>
                </div>
                <div>
                  <label className="flex gap-4 items-center" htmlFor="friend2">
                    <input
                      className="transform scale-150"
                      type="checkbox"
                      id="friend2"
                      value="friend2"
                      checked={selectedFriends.includes("friend2")}
                      onChange={() => handleFriendSelection("friend2")}
                    />
                    Friend 2
                  </label>
                </div>

                <div>
                  <label className="flex gap-4 items-center" htmlFor="friend3">
                    <input
                      className="transform scale-150"
                      type="checkbox"
                      id="friend3"
                      value="friend3"
                      checked={selectedFriends.includes("friend3")}
                      onChange={() => handleFriendSelection("friend3")}
                    />
                    Friend 3
                  </label>
                </div>
              </div>
              <button
                onClick={(e) => handleCreateGroup(e, user_id)}
                className="p-2 hover:bg-blue-500 hover:text-white rounded-lg border border-blue-500 "
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeComponentMessages;
