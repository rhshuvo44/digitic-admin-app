import { Table } from "antd";
import React, { useEffect } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
  },
  {
    title: "Category",
    dataIndex: "category",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Edit",
    dataIndex: "edit",
  },
  {
    title: "Delete",
    dataIndex: "delete",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  const productState = useSelector((state) => state.product.products);

  const data = [];
  for (let i = 0; i < productState.length; i++) {
    data.push({
      key: i + 1,
      name: productState[i].title,
      brand: productState[i].brand,
      category: productState[i].category,
      price: productState[i].price,

      edit: (
        <BiEdit className="text-success fs-5 " style={{ cursor: "pointer" }} />
      ),
      delete: (
        <AiFillDelete
          className="text-danger fs-5"
          style={{ cursor: "pointer" }}
        />
      ),
    });
  }
  console.log(data);
  return (
    <section>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default ProductList;
