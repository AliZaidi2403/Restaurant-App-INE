import { useState } from "react";
import { useCart } from "./../context/cartContext";
import { Button, useToast } from "@chakra-ui/react";
import { useAuth } from "./../context/authContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OrderPage() {
  const { state: cart, emptyCart, totalPrice } = useCart();
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const items = cart.map((item) => ({
    item: item.id,
    quantity: item.quantity,
  }));
  const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      str
    );
  async function handleSubmit(e) {
    e.preventDefault();

    if (!address || !isValidPhone(phoneNumber)) {
      toast({
        title: "Enter the correct Details",
        duration: 3000,
        status: "warning",
        position: "bottom",
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        "http://127.0.0.1:8000/api/orders",
        {
          amount: totalPrice,
          address,
          phoneNumber,
          items,
        },
        config
      );
      console.log(data);
      toast({
        title: "Order Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      emptyCart();
      setAddress("");
      setPhoneNumber("");
      navigate("/");
    } catch (error) {
      toast({
        title: "Error creating order",
        status: "success",
        description: error.response.data.message,
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 md:p-12 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-8">
          Enter Your Details
        </h1>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Address</label>
            <input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-bold mb-2">Phone Number</label>
            <input
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="tel"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>

          <div className="border-t border-gray-300 pt-6 mt-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li
                  key={index}
                  className="py-2 flex justify-between items-center"
                >
                  <span>{item.name}</span>
                  <span>
                    {item.price} x {item.quantity}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal:</span>
                <span>₨{totalPrice}</span>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            width="100%"
            marginTop="20px"
            colorScheme="blue"
            isLoading={loading}
            className="bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}

export default OrderPage;
