import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
const Register = () => {
  const [loading, setLoading] = useState(false);
  console.log(process.env);
  console.log(process.env.DATABASE_URL);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .max(50, "must be 50 characters or less")
        .required("Required"),

      email: Yup.string().max(40, "must be less than 40").required("Required"),

      password: Yup.string()
        .max(25, "must be less than 25")
        .min(8, "must be greater than 8 character")
        .required("Required"),
    }),
    onSubmit: (e) => {
      handleSubmit(e);
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/user/register`,
        formik.values
      );
      console.log(resp);
      setLoading(true);
      if (resp.statusText === "OK") {
        setLoading(false);
        router.push("/");
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className="bg-white login_form flex  items-center justify-center">
      {loading ? (
        <h1>Loading </h1>
      ) : (
        <form
          className="flex flex-col gap-8 p-2  m-8  shadow-lg rounded-lg items-center"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="flex flex-col gap-2 items-center justify-center">
            <span className="text-3xl font-bold text-blue-900">Sign up</span>
            <span>Fill in the fields below to create your account</span>{" "}
          </div>
          <div className="flex flex-col flex-1 w-full">
            <input
              type="text"
              id="username"
              name="username"
              className="p-2 w-full  outline-blue-500 border-blue-400 rounded-lg border"
              placeholder="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500">{formik.errors.username}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col flex-1 w-full ">
            <input
              type="email"
              id="email"
              name="email"
              className="p-2 w-full outline-blue-500 border-blue-400 rounded-lg border"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-col flex-1 w-full">
            <input
              type="password"
              id="password"
              name="password"
              className="p-2 w-full outline-blue-500 border-blue-400 rounded-lg border"
              placeholder="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : (
              ""
            )}
          </div>
          <button
            className="p-2 hover:bg-blue-400 bg-blue-600 text-white w-72 text-xl rounded-lg"
            type="submit"
          >
            sign in
          </button>{" "}
          <div className="flex flex-col    ">
            <span className="text-xl ">having account ? Login here</span>
            <div className="flex flex-col ">
              <span
                onClick={() => router.push("/")}
                className=" text-blue-800 hover:underline cursor-pointer p-2 rounded-xl"
              >
                Login Here
              </span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
export default Register;
