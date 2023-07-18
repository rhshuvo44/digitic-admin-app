import { Table } from "antd";
import React, { useEffect } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/auth/authSlice";
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
    title: "Poroduct",
    dataIndex: "poroduct",
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Amoutn",
    dataIndex: "amoutn",
    sorter: (a, b) => a.amoutn - b.amoutn,
  },
  {
    title: "Date",
    dataIndex: "date",
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];
const Order = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);
  const orderState = useSelector((state) => state?.auth?.orders);
  const data = [];
  for (let i = 0; i < orderState?.length; i++) {
    data.push({
      key: i + 1,
      name: orderState[i].orderby.firstname,
      product: orderState[i].products.map((i, j) => {
        return (
          <ul key={j}>
            <li>{i.product.title}</li>
          </ul>
        );
      }),
      amoutn: orderState[i].paymentIntent.amoutn,
      date: new Date(orderState[i].createdAt).toLocaleString,

      action: (
        <AiFillDelete
          className="text-danger fs-5"
          style={{ cursor: "pointer" }}
        />
      ),
    });
  }
  return (
    <section>
      <h3 className="mb-4 title">Orders</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default Order;
