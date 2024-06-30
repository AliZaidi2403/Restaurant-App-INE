import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignIn from "./Pages/SignIn";
import Login from "./Pages/Login";
import HomePage from "./Pages/HomePage";
import { CartProvider } from "./context/cartContext";
import AuthProvider from "./context/authContext";
import CartPage from "./Pages/CartPage";
import ProtectedRoute from "./Pages/ProtectedRoute";
import Dashboard from "./Pages/Dashboard";
import OrderPage from "./Pages/OrderPage";
import { ItemProvider } from "./context/itemContext";
import OrderManegement from "./Pages/OrderManagement";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ItemProvider>
            <CartProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="login" element={<Login />} />
                <Route path="signIn" element={<SignIn />} />
                <Route path="myCart" element={<CartPage />} />
                <Route path="order/new" element={<OrderPage />} />

                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                ></Route>
                <Route
                  path="order/management"
                  element={
                    <ProtectedRoute>
                      <OrderManegement />
                    </ProtectedRoute>
                  }
                ></Route>
              </Routes>
            </CartProvider>
          </ItemProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
