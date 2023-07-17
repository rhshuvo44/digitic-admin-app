import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";
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
];

const ColorList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state?.color?.colors?.getallColor);
  console.log(colorState);
  const data = [];
  for (let i = 0; i < colorState?.length; i++) {
    data.push({
      key: i + 1,
      name: colorState[i].title,
    });
  }
  return (
    <section>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
    </section>
  );
};

export default ColorList;
