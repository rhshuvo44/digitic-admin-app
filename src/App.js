import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";
import AddBrand from "./pages/AddBrand";
import AddCat from "./pages/AddCat";
import AddColor from "./pages/AddColor";
import AddProduct from "./pages/AddProduct";
import BlogCategoryList from "./pages/BlogCategoryList";
import BlogList from "./pages/BlogList";
import BrandList from "./pages/BrandList";
import CategoryList from "./pages/CategoryList";
import ColorList from "./pages/ColorList";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Enquiries from "./pages/Enquiries";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Order from "./pages/Order";
import ProductList from "./pages/ProductList";
import Resetpassword from "./pages/Resetpassword";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/reset-password" element={<Resetpassword />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
      <Route path="admin" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="customer" element={<Customer />} />
        <Route path="product" element={<AddProduct />} />
        <Route path="product-list" element={<ProductList />} />
        <Route path="brand" element={<AddBrand />} />
        <Route path="brand-list" element={<BrandList />} />
        <Route path="color" element={<AddColor />} />
        <Route path="color-list" element={<ColorList />} />
        <Route path="category" element={<AddCat />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="order" element={<Order />} />
        <Route path="blog" element={<AddBlog />} />
        <Route path="blog-list" element={<BlogList />} />
        <Route path="coupon" element={<AddCoupon />} />
        <Route path="coupon-list" element={<CouponList />} />
        <Route path="blog-category" element={<AddBlogCat />} />
        <Route path="blog-category-list" element={<BlogCategoryList />} />
      </Route>
    </Routes>
  );
}

export default App;
