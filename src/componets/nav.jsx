
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const Navbar = ({ isLoggedIn, setIsLoggedIn, setToken, setUser }) => {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-700 mx-auto text-white flex text-2xl justify-between w-full h-14 pt-2">
      {isLoggedIn ? (
        <div className="pl-5">
          <NavLink to={"/home"}>StrangeStuff - Home</NavLink>
        </div>
      ) : (
        <div className="pl-5">StrangeStuff</div>
      )}
      <div className="pr-5 gap-4">
        {isLoggedIn ? (
          <>
            <NavLink to={"/messages"}>Messages | </NavLink>
            <NavLink to={"/profile"}>Profile | </NavLink>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to log out?")) {
                  setIsLoggedIn(false);
                  setToken("");
                  setUser("");
                  navigate("/");
                }
              }}
            >
              Log Out
            </button>
          </>
        ) : (
          <NavLink to={"/"}>Login</NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;