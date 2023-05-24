import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addEmail } from "../../redux/features/user/userSlice";
import Home from "../home/home";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { email, password });
    setCookie("name", "akhtar", {
      maxAge: 60 * 60 * 24,
    });
    console.log(result);
    console.log("this is the result ");
    if (!result?.error) {
      // Store user info in a cookie
      // Redirect to authenticated page
    }
  };
  const router = useRouter();
  const { data: session } = useSession();
  console.log("these are session");
  if (session) {
    dispatch(addEmail(session?.user?.email));
    return (
      <div>
        <Home />
      </div>
    );
  } else
    return (
      <div className="bg-white login_form flex  items-center justify-center">
        <form
          className="flex flex-col gap-8 p-2  m-8  shadow-lg rounded-lg items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-3xl font-bold text-blue-900">Sign in</span>
            <span>Fill in the fields below to sign into your account</span>
          </div>
          <input
            type="email"
            className="p-2 border-2 border-blue-600 w-72 text-xl rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            className="p-2 border-2 border-blue-600  w-72 text-xl rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button
            className="p-2 hover:bg-blue-400 bg-blue-600 text-white w-72 text-xl rounded-lg"
            type="submit"
          >
            sign in
          </button>{" "}
          <div className="flex flex-col    ">
            <span className="text-xl ">not having account ? click below</span>
            <div className="flex flex-col ">
              <span
                onClick={() => router.push("/register/register")}
                className=" text-blue-800 hover:underline cursor-pointer p-2 rounded-xl"
              >
                create account
              </span>
            </div>
          </div>
        </form>
      </div>
    );
}
