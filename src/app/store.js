import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import productReducer from "../features/product/productSlice";
import categoryReducer from "../features/category/categorySlice";
import brandReducer from "../features/brand/brandSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
  },
});
