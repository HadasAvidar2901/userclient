import { configureStore } from "@reduxjs/toolkit";
//import orderSlice from "../features/order/orderSlice";
import userSlice from "../features/user/userSlice";



export const store = configureStore({
    reducer: {
       user :userSlice,
      // order:orderSlice,
       
       
    }
})