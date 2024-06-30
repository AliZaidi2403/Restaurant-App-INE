import { useCart } from "./../context/cartContext";
import EmptyCart from "./../components/EmptyCart";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { Button } from "@chakra-ui/react";
import CartItem from "../components/CartItem";
function CartPage() {
  const { state: cart, emptyCart, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <Link to="/">&larr; Back to menu</Link>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {user.name}</h2>
      <ul className="mt-3 divide-y divide-stone-300 border-b">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button colorScheme="blue" onClick={() => navigate("/order/new")}>
          Order items
        </Button>
        <Button colorScheme="red" onClick={emptyCart}>
          Clear cart
        </Button>
      </div>
      <div className="mt-6 space-x-2">Total : ₨. {totalPrice}</div>
    </div>
  );
}

export default CartPage;
