import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import {sellerReducer} from "./reducers/seller"

const Store = configureStore({
    reducer: {
      user: userReducer,
      seller: sellerReducer,
    //   products: productReducer,
    //   events: eventReducer,
    //   cart: cartReducer,
    //   wishlist: wishlistReducer,
    //   order: orderReducer,
    },
  });
  
  export default Store;