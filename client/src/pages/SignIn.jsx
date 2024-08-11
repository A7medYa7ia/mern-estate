import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/sign-in", data).then(() => {
        setLoading(false);
        setError(null);
        navigate("/");
      });

      if (res?.success === false) {
        setError(res.message);
        setLoading(false);
        return;
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      setError(error.message);
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
          {loading ? "Loading..." : "SIGN In"}
        </button>
        <button></button>
      </form>
      <div className="flex gap-2 my-2">
        <p>dont have an accout? </p>
        <Link to={"/sign-up"}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
