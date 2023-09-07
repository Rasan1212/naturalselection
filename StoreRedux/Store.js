import { configureStore } from "@reduxjs/toolkit";
import slice from "./Slice";

 const store =configureStore({
  reducer: {
    cart: slice,
    
  },
});
export default store