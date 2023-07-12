import { Table } from "antd";
import React from "react";
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
    title: "Status",
    dataIndex: "status",
  },
];
const data = [];
for (let i = 0; i < 16; i++) {
  data.push({
    key: i + 1,
    name: `Edward King ${i}`,
    product: `London, Park Lane no. ${i}`,
    status: "Pandding",
  });
}
const Customer = () => {
  return (
    <div>
      <h3 className="mb-4">Customers List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Customer;
