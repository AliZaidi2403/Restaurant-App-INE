import ItemCard from "../components/ItemCard";
import { useItems } from "./../context/itemContext";
import { useAuth } from "./../context/authContext";
import { useNavigate } from "react-router-dom";
import CartOverview from "../components/CartOverview";
import Navbar from "../components/Navbar";
function HomePage() {
  const { items } = useItems();
  const { user } = useAuth();
  const navigate = useNavigate();
  if (user?.role === "admin") {
    navigate("/dashboard");
  }
  const alcoholicItems = items.filter((item) => item.type === "Alcoholic");
  const nonAlcoholicItems = items.filter(
    (item) => item.type === "Non-Alcoholic"
  );
  const vegItems = items.filter((item) => item.type === "Veg");
  const nonVegItems = items.filter((item) => item.type === "Non-Veg");
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-flow-row">
          {vegItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold ml-8">Veg</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
                {vegItems.map((item) => (
                  <ItemCard item={item} key={item._id} />
                ))}
              </ul>
            </div>
          )}
          <hr className="border-t-2 border-gray-300 my-4" />
          {nonVegItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold ml-6">Non-Veg</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
                {nonVegItems.map((item) => (
                  <ItemCard item={item} key={item._id} />
                ))}
              </ul>
            </div>
          )}
          <hr className="border-t-2 border-gray-300 my-4" />
          {alcoholicItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold ml-5">Alcoholic</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
                {alcoholicItems.map((item) => (
                  <ItemCard item={item} key={item._id} />
                ))}
              </ul>
            </div>
          )}
          <hr className="border-t-2 border-gray-300 my-4" />
          {nonAlcoholicItems.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold ml-5">Non-Alcoholic</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-2">
                {nonAlcoholicItems.map((item) => (
                  <ItemCard item={item} key={item._id} />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {user && <CartOverview />}
    </div>
  );
}

export default HomePage;
