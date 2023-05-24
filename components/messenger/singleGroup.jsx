import Navbar from "../navbar/navbar";
import ChatBox from "./chat";
import Sidebar from "./sidebar";

const SingleGroupComp = ({ messages }) => {
  return (
    <div>
      <div className="fixed w-full">
        <Navbar />
      </div>

      <div className="flex pt-16">
        <div className="leftSideHome  w-56 fixed border border-black h-full ">
          <Sidebar />
        </div>
        <div className="rightSideHome w-full  ml-52 p-8">
          <ChatBox />
        </div>
      </div>
    </div>
  );
};
export default SingleGroupComp;
