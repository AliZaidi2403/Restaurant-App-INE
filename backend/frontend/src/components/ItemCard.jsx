import { useAuth } from "./../context/authContext";
import { useCart } from "./../context/cartContext";
import { Button } from "@chakra-ui/react";
import CreateModal from "./CreateModal";
import { useItems } from "../context/itemContext";

function ItemCard({ item, handleDelete }) {
  const { user } = useAuth();
  const { items, setItems } = useItems();
  const { addItem, deleteItem, inCart } = useCart();
  const role = user?.role;
  const { image, name, price, type, _id } = item;

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg border-2 border-gray-300 bg-amber-200 m-2">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-2">
        <div className="flex justify-center items-center">
          <img className="h-24 w-24" src={image} alt={name} />
        </div>
        <div className="col-span-2 flex flex-col justify-between mt-2 sm:mt-0">
          <div>
            <div className="text-lg font-bold">{name}</div>
            <div className="text-gray-700 text-base">Price: ₨ {price}</div>
            <div className="text-gray-700 text-base">Type: {type}</div>
          </div>
          <div>
            {role === "user" && (
              <button
                className={`mt-2 ${
                  inCart(_id)
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline`}
                onClick={() => {
                  if (inCart(_id)) {
                    deleteItem(_id);
                  } else {
                    addItem({ name, price, id: _id, quantity: 1 });
                  }
                }}
              >
                {inCart(_id) ? "Remove from cart" : "Add to cart"}
              </button>
            )}
            {role === "admin" && (
              <div className="flex justify-between mt-2">
                <CreateModal
                  user={user}
                  id={_id}
                  items={items}
                  setItems={setItems}
                >
                  Update
                </CreateModal>
                <Button colorScheme="red" onClick={() => handleDelete(_id)}>
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
