import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import bCategoryReducer from "../features/bCategory/bCategorySlice";
import blogReducer from "../features/blog/blogSlice";
import brandReducer from "../features/brand/brandSlice";
import categoryReducer from "../features/category/categorySlice";
import colorReducer from "../features/color/colorSlice";
import customerReducer from "../features/customers/customerSlice";
import enquirieReducer from "../features/enquiries/enquirieSlice";
import productReducer from "../features/product/productSlice";
import uploadReducer from "../features/upload/uploadSlice";
import couponReducer from "../features/coupon/couponSlice";
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
    enquirie: enquirieReducer,
    upload: uploadReducer,
    coupon: couponReducer,
  },
});
