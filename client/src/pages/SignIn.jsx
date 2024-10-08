import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/userSlice.js";
import OAuth from "../components/OAuth.jsx";
export default function SignIn() {
  const [formData, setData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className=" p-3 max-w-xl mx-auto">
      <p className="text-3xl font-semibold text-center m-7">Sign In</p>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="email"
          placeholder="email"
          className=" shadow-md p-4 border-2 rounded-lg placeholder:text-lg"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className=" shadow-md p-4 border-2 rounded-lg placeholder:text-lg "
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="w-full  bg-slate-800 text-white p-4 rounded-lg text-md  text-xl hover:opacity-90  disabled:opacity-80"
        >
          {loading ? "Loading..." : "Sing In"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 my-2">
        <p>dont have an accout? </p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
