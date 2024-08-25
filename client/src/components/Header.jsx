import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-around px-5 p-3 items-center ">
        <Link to={"/"}>
          <p className="font-bold text-sm md:text-2xl lg:text-3xl flex flex-wrap ">
            <span className="text-slate-500">Ahmed</span>
            <span className="text-slate-700">Estate</span>
          </p>
        </Link>

        <form
          action=""
          onSubmit={handleSubmit}
          className=" bg-slate-100 px-3 rounded-lg flex items-centerr "
        >
          <input
            type="text"
            placeholder="search..."
            className="bg-transparent p-3 focus:outline-none w-24 sm:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button>
            <FaSearch className="text-slate-600" />
          </button>
        </form>
        <ul className="flex gap-12 text-sm sm:text-lg font-semibold text-slate-600 ">
          <NavLink to={"/"}>
            <li className="hidden md:inline hover:text-black">Home</li>
          </NavLink>

          <NavLink to={"/about"}>
            <li className="hidden md:inline hover:text-black">About</li>
          </NavLink>

          <NavLink to={"/profile"}>
            {currentUser ? (
              <img
                className="rounded-full h-7 min-w-7 object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className=" hover:text-black">Sign In</li>
            )}
          </NavLink>
        </ul>
      </div>
    </header>
  );
}
