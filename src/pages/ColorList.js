import { Table } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getColors } from "../features/color/colorSlice";
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
    sorter: (a, b) => a.name.length - b.name.length,
  },
  {
    title: "Action",
    dataIndex: "action",
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
      action: (
        <>
          <BiEdit
            className="text-success fs-5 me-2"
            style={{ cursor: "pointer" }}
          />
          <AiFillDelete
            className="text-danger fs-5"
            style={{ cursor: "pointer" }}
          />
        </>
      ),
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
