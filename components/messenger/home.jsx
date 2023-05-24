import Navbar from "../navbar/navbar";
import ChatBox from "./chat";
import Sidebar from "./sidebar";
const randomMessages = [
  { username: "John", text: "Hello there!" },
  { username: "Alice", text: "Hi, how are you?" },
  { username: "Bob", text: "'I'm doing great, thanks!' " },
  { username: "Emma", text: "Hey, anyone up for a game tonight?" },
  { username: "John", text: "Sure, count me in!" },
  { username: "Alice", text: "Sounds fun, I'm in too!" },
  { username: "John", text: "Hello there!" },
  { username: "Alice", text: "Hi, how are you?" },
  { username: "Bob", text: "'I'm doing great, thanks!' " },
  { username: "Emma", text: "Hey, anyone up for a game tonight?" },
  { username: "John", text: "Sure, count me in!" },
  { username: "Alice", text: "Sounds fun, I'm in too!" },
];
const HomeComponentMessages = () => {
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
          <ChatBox messages={randomMessages} />
        </div>
      </div>
    </div>
  );
};
export default HomeComponentMessages;
