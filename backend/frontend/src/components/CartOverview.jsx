import { Link } from "react-router-dom";
import { useCart } from "./../context/cartContext";
function CartOverview() {
  const { totalPrice, totalItems } = useCart();

  return (
    <div className="flex items-center justify-between bg-stone-700 px-4 py-4  text-sm text-stone-200 sm:px-6 md:text-base ">
      <p className="space-x-4 font-semibold uppercase text-stone-300">
        <span>Total Items : {totalItems}</span>
        <span>Total Price : ₨{totalPrice}</span>
      </p>
      <Link to="myCart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
