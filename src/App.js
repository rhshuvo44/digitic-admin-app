import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Forgotpassword from "./pages/Forgotpassword";
import Login from "./pages/Login";
import Resetpassword from "./pages/Resetpassword";
import Enquiries from "./pages/Enquiries";
import BlogList from "./pages/BlogList";
import BlogCategoryList from "./pages/BlogCategoryList";
import Order from "./pages/Order";
import Customer from "./pages/Customer";
import ProductList from "./pages/ProductList";
import BrandList from "./pages/BrandList";
import ColorList from "./pages/ColorList";
import CategoryList from "./pages/CategoryList";
import AddBlog from "./pages/AddBlog";
import AddBlogCat from "./pages/AddBlogCat";

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
        <Route path="product-list" element={<ProductList />} />
        <Route path="brand-list" element={<BrandList />} />
        <Route path="color-list" element={<ColorList />} />
        <Route path="category-list" element={<CategoryList />} />
        <Route path="order" element={<Order />} />
        <Route path="blog" element={<AddBlog />} />
        <Route path="blog-list" element={<BlogList />} />
        <Route path="blog-category" element={<AddBlogCat />} />
        <Route path="blog-category-list" element={<BlogCategoryList />} />
      </Route>
    </Routes>
  );
}

export default App;
