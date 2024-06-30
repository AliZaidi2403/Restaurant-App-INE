import { useCart } from "../context/cartContext";
function CartItem({ item }) {
  const { name, price, quantity, id } = item;
  const { increaseItemQty, decreaseItemQty } = useCart();

  return (
    <li className="py-3">
      <p className="mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">₨.{price * quantity}</p>
        <button
          className="bg-yellow-400 px-2.5 py-1 md:px-3.5 md:py-2 rounded-full  hover:bg-yellow-300 focus:outline-none hover:bg-yellow-300 focus:outline-none
  focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-yellow-100"
          onClick={() => increaseItemQty(id)}
        >
          +
        </button>
        <button
          className="bg-yellow-400 px-2.5 py-1 md:px-3.5 md:py-2 rounded-full  hover:bg-yellow-300 focus:outline-none hover:bg-yellow-300 focus:outline-none
  focus:ring focus:ring-yellow-300 focus:ring-offset-2 active:bg-yellow-100"
          onClick={() => decreaseItemQty(id)}
        >
          -
        </button>
      </div>
    </li>
  );
}

export default CartItem;
