import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";
const Sidebar = () => {
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [allGroups, setAllGroups] = useState("");
  useEffect(() => {
    const fetchAllGroups = async () => {
      try {
        setLoadingGroups(true);
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/messenger/group/all`
        );
        if (resp.status === 200) {
          setAllGroups(resp.data);
          console.log(resp);
          setLoadingGroups(false);
        } else {
          console.log(resp);
        }
      } catch (error) {
        console.log(error);
        console.log(error);
        setLoadingGroups(false);
      }
    };
    fetchAllGroups();
  }, []);
  return (
    <div className="flex h-screen w-full bg-gray-200 overflow-y-auto">
      <div className="w-full">
        <ul className="flex flex-col gap-4 items-center mt-8 justify-center w-full">
          <Link href={"/messages/groups/create"}>
            <li className="text-xl hover:bg-blue-500 p-2 hover:text-white rounded-lg cursor-pointer">
              create group
            </li>{" "}
          </Link>
          {allGroups?.length > 0
            ? allGroups?.map((x) => (
                <Link
                  href={`/messages/groups/${x?.user_chat_group_id}?chat_group_id=${x?.chat_group_id}`}
                >
                  <li className="text-xl hover:bg-blue-500 p-2 hover:text-white rounded-lg cursor-pointer">
                    {x?.chatGroup?.title}
                  </li>{" "}
                </Link>
              ))
            : ""}
        </ul>
      </div>
      <div className="flex-1">{/* Main content here */}</div>
    </div>
  );
};
export default Sidebar;
