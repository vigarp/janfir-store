import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { AddItem } from "../redux/actions";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalAdd = (props) => {
  const { handleModalAddOpen, handleModalAddClose } = props;
  let dispatch = useDispatch();

  const { items } = useSelector((state) => state.data);

  const [formAddItem, setFormAddItem] = useState({
    name: "",
    price: "",
    stock: "",
    images: "",
  });

  const [validateError, setValidateError] = useState("");

  const fileSelectedHandler = (e) => {
    setFormAddItem({
      ...formAddItem,
      images: e.currentTarget.files,
    });
  };

  const formData = new FormData();
  formData.append("name", formAddItem.name);
  formData.append("price", formAddItem.price);
  formData.append("stock", formAddItem.stock);
  formData.append("images", formAddItem.images[0]);

  const handleChange = (e) => {
    setFormAddItem({
      ...formAddItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formAddItem.name ||
      !formAddItem.price ||
      !formAddItem.stock ||
      !formAddItem.images
    ) {
      setValidateError("Please input all input field");
    } else {
      const [dataImage] = formAddItem.images;
      const picSize = dataImage.size;
      const picTypeJPG = dataImage.name.endsWith(".jpg");
      const picTypePNG = dataImage.name.endsWith(".png");
      console.log(picTypeJPG);
      console.log(picTypePNG);
      const checkItem = items.data.find((x) => x.name === formAddItem.name);
      if (picSize > 100000) {
        setValidateError("error, maximum file atleast 100Kb");
      } else if (picTypeJPG === false && picTypePNG === false) {
        setValidateError("error file type support only .png or .jpg");
      } else if (checkItem) {
        setValidateError("Item already listed");
      } else {
        dispatch(AddItem(formData));
        handleModalAddClose(true);
        setValidateError("");
      }
    }
  };
  return (
    <div>
      <Modal
        open={handleModalAddOpen}
        onClose={handleModalAddClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography>Add Item</Typography>
          {validateError && <h3 style={{ color: "red" }}>{validateError}</h3>}
          <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <input type="file" onChange={(e) => fileSelectedHandler(e)} />
            <br />
            <TextField
              id="standard-basic"
              label="Item Name"
              variant="standard"
              name="name"
              type="text"
              value={formAddItem.name}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Item Price"
              variant="standard"
              name="price"
              type="number"
              value={formAddItem.price}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Item Stock"
              variant="standard"
              name="stock"
              type="number"
              value={formAddItem.stock}
              onChange={handleChange}
            />
            <br />
            <button>Add</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalAdd;
