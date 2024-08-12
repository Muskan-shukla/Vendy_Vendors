import React from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { LoginPage, HomePage, FAQPage, ProfilePage, ShopCreatePage } from "./routes/Routes.js";
import { SignupPage, ProductsPage, ProductDetailsPage,SellerActivationPage } from "./routes/Routes.js"
import { ActivationPage, BestSellingPage, EventsPage,ShopLoginPage } from "./routes/Routes.js"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
import CheckoutPage from "../src/pages/CheckoutPage"
// import ShopCreate from "../src/pages/ShopCreatePage"
import { useEffect } from "react";
import { useSelector } from "react-redux"
import Store from "./redux/store";
import { loadUser,loadSeller } from "./redux/actions/user";
// import { server } from "./server";
// import { toast } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import {ShopHomePage} from "./ShopRoutes"
import SellerProtectedRoute from './routes/SellerProtectedRoute.js';
import { ShopDashboardPage,ShopCreateProduct,ShopAllProducts } from './routes/ShopRoutes';

const App = () => {
  
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadSeller());

    // if(isSeller){
    //   return <Navigate to="/shop" replace/>
    // }
    // console.log(seller,isSeller)

  }, []);
  return (
    <>
     
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/sign-up" element={<SignupPage />} />
            <Route path="/activation/:activation_token" element={<ActivationPage />} />
            <Route path="/seller/activation/:activation_token" element={<SellerActivationPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/checkout" element={
              <ProtectedRoute >
                <CheckoutPage />
              </ProtectedRoute>
            } />
            <Route path="/product/:name" element={<ProductDetailsPage />} />
            <Route path="/profile" element={
              <ProtectedRoute >
                <ProfilePage />
              </ProtectedRoute>
            } />

            {/* shop route  */}
            <Route path="/shop-create" element={<ShopCreatePage />} />
            <Route path="/shop-login" element={<ShopLoginPage />} />
            <Route path="/shop/:id" element={
              <SellerProtectedRoute>
                <ShopHomePage/>
              </SellerProtectedRoute>} />
              <Route path="/dashboard" element={
              <SellerProtectedRoute>
                <ShopDashboardPage/>
              </SellerProtectedRoute>} />
              <Route path="/dashboard-create-product" element={
              <SellerProtectedRoute>
                <ShopCreateProduct/>
              </SellerProtectedRoute>} />

              <Route path="/dashboard-products" element={
              <SellerProtectedRoute>
                <ShopAllProducts/>
              </SellerProtectedRoute>} />

          </Routes>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      
    </>
  );
  
}
export default App;