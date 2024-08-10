import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios
        .post("/api/auth/sign-up", formData)
        .then((response) => {
          console.log(response);
        });
      if (res?.success === false) {
        setError(res.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };
  return (
    <div className=" p-3 max-w-xl mx-auto">
      <p className="text-3xl font-semibold text-center m-7">Sign Up</p>
      <form action="" onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        <input
          type="text"
          placeholder="username"
          className=" shadow-md p-4 border-2 rounded-lg  placeholder:text-lg"
          id="username"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "SIGN UP"}
        </button>
        <button></button>
      </form>
      <div className="flex gap-2 my-2">
        <p>have an accout? </p>
        <Link to={"/sign-in"}>
          <span className="text-blue-600">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
