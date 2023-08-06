import { Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
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
    title: "Action",
    dataIndex: "action",
  },
];

const ColorList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");
  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };
  const hideModal = () => {
    setOpen(false);
  };
  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);
  const colorState = useSelector((state) => state?.color?.colors?.getallColor);

  const data = [];
  for (let i = 0; i < colorState?.length; i++) {
    data.push({
      key: i + 1,
      name: <span style={{color:`${colorState[i].title}`}} >{colorState[i].title}</span>,
      action: (
        <>
          <Link to={`/admin/color/${colorState[i]._id}`}>
            <BiEdit
              className="text-success fs-5 me-2"
              style={{ cursor: "pointer" }}
            />
          </Link>
          <button
            onClick={() => showModal(colorState[i]._id)}
            className="bg-transparent border-0 text-danger fs-5"
            style={{ cursor: "pointer" }}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const deletedColor = (id) => {
    dispatch(deleteColor(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 1000);
  };
  return (
    <section>
      <h3 className="mb-4 title">Color List</h3>
      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <CustomModal
        performAction={() => deletedColor(colorId)}
        hideModal={hideModal}
        open={open}
        title="Are you sure you want to delete this color?"
      />
    </section>
  );
};

export default ColorList;
