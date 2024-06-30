import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useAuth } from "./authContext";
const ItemContext = createContext();

export const ItemProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const toast = useToast();
  const { user } = useAuth();
  async function handleDelete(id) {
    let confirmed = window.confirm("Are you sure you want to delete this item");
    if (!confirmed) {
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      await axios.delete(`http://127.0.0.1:8000/api/items/${id}`, config);
      setItems((items) => items.filter((item) => item._id !== id));
    } catch (err) {
      toast({
        title: "Error occured!",
        description: err.message,
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  }
  useEffect(() => {
    setLoading(true);
    async function getData() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await axios.get(
          "http://127.0.0.1:8000/api/items",
          config
        );
        console.log(data.items);
        setItems(data.items);
        setLoading(false);
      } catch (error) {
        toast({
          title: "Error Occured",
          description: error.response.data.message,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
        console.log(error);
      }
    }
    getData();
  }, [toast]);
  return (
    <ItemContext.Provider value={{ items, setItems, handleDelete }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => {
  const context = useContext(ItemContext);
  return context;
};
