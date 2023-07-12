import { Table } from "antd";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Product",
    dataIndex: "product",
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
const data = [];
for (let i = 0; i < 16; i++) {
  data.push({
    key: i + 1,
    name: `Edward King ${i}`,
    product: `London, Park Lane no. ${i}`,
    edit: <BiEdit className="text-success fs-5"/>,
    delete: <AiFillDelete className="text-danger fs-5"/>,
  });
}

const ProductList = () => {
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
