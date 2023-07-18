import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bCategoryReducer from "../features/bCategory/bCategorySlice";
import blogReducer from "../features/blog/blogSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customers/customerSlice";
import enduirieReducer from "../features/enquiries/enduirieSlice";
import productReducer from "../features/product/productSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    product: productReducer,
    category: categoryReducer,
    brand: brandReducer,
    color: colorReducer,
    blog: blogReducer,
    bCategory: bCategoryReducer,
    enduirie: enduirieReducer,
  },
});
