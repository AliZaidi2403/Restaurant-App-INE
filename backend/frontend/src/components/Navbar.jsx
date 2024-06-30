import { Link, useNavigate } from "react-router-dom";
import Logo from "./../assets/restimg.jpg";
import { useAuth } from "../context/authContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@chakra-ui/react";
function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userInfo");
    setUser();
  }
  return (
    <nav className=" flex items-center justify-between border-b-2 border-stone-400 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/">
        <div className="flex flex-row gap-5 items-center">
          <img height="100" width="100" src={Logo} alt="logo" />
          <p>Restaurant-INE</p>
        </div>
      </Link>
      {user ? (
        <div className="flex flex-row gap-4 items-center mr-5 ">
          <button
            onClick={() => {
              navigate("/myCart");
            }}
          >
            <Badge color="secondary">
              <ShoppingCartIcon />
              Cart
            </Badge>
          </button>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="flex flex-row gap-4 items-center mr-5">
          <Link to="/signIn">SignIn</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
