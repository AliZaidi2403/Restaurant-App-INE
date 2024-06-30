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
    <nav className="flex items-center justify-between border-b-2 border-stone-400 bg-yellow-500 px-4 py-3 uppercase sm:px-6">
      <Link to="/" className="flex items-center gap-5">
        <img className="h-10 w-10 sm:h-12 sm:w-12" src={Logo} alt="logo" />
        <p className="text-lg sm:text-xl font-bold">Restaurant-INE</p>
      </Link>

      {user ? (
        <div className="flex gap-4 items-center">
          <button
            onClick={() => {
              navigate("/myCart");
            }}
            className="hidden sm:inline-block"
          >
            <Badge color="secondary" className="flex items-center gap-1">
              <ShoppingCartIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-sm sm:text-base">Cart</span>
            </Badge>
          </button>
          <button onClick={handleLogout} className="text-sm sm:text-base">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4 items-center">
          <Link to="/signIn" className="text-sm sm:text-base">
            SignIn
          </Link>
          <Link to="/login" className="text-sm sm:text-base">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
