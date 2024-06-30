import { useEffect, useState } from "react";
import { useAuth } from "./../context/authContext";
import { useToast, Button } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  async function changeStatus(id) {
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.patch(
        `${window.location.origin}/api/orders/${id}`,
        {},
        config
      );
      const updatedOrder = data.order;
      let filteredOrders = orders.filter((order) => order._id !== id);
      setOrders([...filteredOrders, updatedOrder]);
      setLoading(false);
      toast({
        title: "Order Completed",
        duration: 3000,
        status: "success",
        position: "bottom",
      });
    } catch (error) {
      toast({
        title: "Error fetching Data",
        description: error.response.data.message,
        duration: 3000,
        status: "warning",
        position: "bottom",
      });
      setLoading(false);
    }
  }
  useEffect(function () {
    setLoading(true);
    const getOrders = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.get(
          `${window.location.origin}/api/orders`,
          config
        );
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error fetching Data",
          description: error.response.data.message,
          duration: 3000,
          status: "warning",
          position: "bottom",
        });
        setLoading(false);
      }
    };
    getOrders();
  }, []);
  console.log(orders);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <Button
        marginBottom="10px"
        colorScheme="blue"
        onClick={() => navigate("/dashboard")}
      >
        Back To DashBoard
      </Button>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((order) => {
            return (
              <div
                key={order._id}
                className="bg-white shadow-md rounded-lg p-6 w-full"
              >
                <h2 className="text-xl font-bold mb-4">Order Details</h2>

                <div className="mb-4">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>
                  <p>
                    <strong>User ID:</strong> {order.userId._id}
                  </p>
                  <p>
                    <strong>User Name:</strong> {order.userId.name}
                  </p>
                  <p>
                    <strong>Amount:</strong> {order.amount}
                  </p>
                  <p>
                    <strong>CreatedAt:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {order.status ? "Complete" : "Incomplete"}
                  </p>
                </div>

                <h3 className="text-lg font-bold mb-2">Items:</h3>
                <ul className="divide-y divide-gray-200 mb-4">
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      className="py-2 flex justify-between items-center"
                    >
                      <span>{item.item.name}</span>
                      <span>Quantity: {item.quantity}</span>
                    </li>
                  ))}
                </ul>

                {order.status ? (
                  ""
                ) : (
                  <button
                    onClick={() => changeStatus(order._id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
                  >
                    Change Status
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default OrderManagement;
