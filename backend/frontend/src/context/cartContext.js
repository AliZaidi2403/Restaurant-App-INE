import React, { useReducer, useContext, createContext } from "react";
let newState;
const CartContext = createContext();
const reducer = (state, action) => {
  switch (action.type) {
    case "addItem":
      return [...state, action.payload];
    case "deleteItem":
      newState = state.filter((item) => item.id !== action.payload);
      return newState;
    case "clearCart":
      newState = [];
      return newState;
    case "increaseItemQty":
      return state.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    case "decreaseItemQty":
      return state
        .map((item) =>
          item.id === action.payload
            ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
            : item
        )
        .filter((item) => item.quantity > 0);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  const totalItems = state.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  function addItem(item) {
    dispatch({ type: "addItem", payload: item });
  }
  function deleteItem(id) {
    dispatch({ type: "deleteItem", payload: id });
  }
  function emptyCart() {
    dispatch({ type: "clearCart" });
  }
  function increaseItemQty(id) {
    console.log(id);
    dispatch({ type: "increaseItemQty", payload: id });
  }
  function decreaseItemQty(id) {
    dispatch({ type: "decreaseItemQty", payload: id });
  }
  function inCart(id) {
    return state.find((item) => item.id === id);
  }
  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        deleteItem,
        emptyCart,
        increaseItemQty,
        decreaseItemQty,
        totalPrice,
        totalItems,
        inCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context;
};
