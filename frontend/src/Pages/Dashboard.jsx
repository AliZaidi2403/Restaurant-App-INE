import { useItems } from "../context/itemContext";
import { Button } from "@chakra-ui/react";
import ItemCard from "../components/ItemCard";
import CreateModal from "../components/CreateModal";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const { items, setItems, handleDelete } = useItems();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("userInfo");
    setUser();
    navigate("/");
  }
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center gap-8 mb-4">
        <CreateModal items={items} setItems={setItems} user={user} />
        <Button color="teal" onClick={() => navigate("/order/management")}>
          Orders
        </Button>
        <Button color="teal" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <div className="flex justify-center">
        <ul className="flex flex-wrap justify-center items-center gap-4">
          {items.map((item) => (
            <ItemCard item={item} key={item._id} handleDelete={handleDelete} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
