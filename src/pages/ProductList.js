import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import CustomModal from "../components/CustomModal";
const columns = [
  {
    title: "SNo",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Color",
    dataIndex: "color",
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

const ProductList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setProductId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
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
      color: productState[i].color + " ",
      action: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            onClick={() => showModal(productState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deleteProduct = (id) => {
    dispatch(deleteAProduct(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Product List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deleteProduct(productId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this product?"
      />
    </section>
  );
};

export default ProductList;
