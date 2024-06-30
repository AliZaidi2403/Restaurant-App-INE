import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/authContext";
function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(
    function () {
      if (!user?.role === "admin") navigate("/");
    },
    [user, navigate]
  );
  return user?.role === "admin" ? children : null;
}

export default ProtectedRoute;
