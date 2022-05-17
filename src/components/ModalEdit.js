import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

import { useDispatch, useSelector } from "react-redux";
import { editItem, loadItems } from "../redux/actions";

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

const ModalEdit = (props) => {
  const { handleModalEditOpen, handleModalEditClose } = props;
  let dispatch = useDispatch();

  const { items } = useSelector((state) => state.data);

  useEffect(() => {
    dispatch(loadItems());
    const validateProduct = items.data.find((x) => x.id === props.idItem);
    setFormEditItem({
      name: validateProduct.name,
      price: validateProduct.price,
      stock: validateProduct.stock,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formEditItem, setFormEditItem] = useState({
    name: "",
    price: "",
    stock: "",
  });

  const formData = new FormData();
  formData.append("name", formEditItem.name);
  formData.append("price", formEditItem.price);
  formData.append("stock", formEditItem.stock);

  const handleChange = (e) => {
    setFormEditItem({
      ...formEditItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editItem(props.idItem, formData));
    handleModalEditClose(true);
  };

  return (
    <div>
      <Modal
        open={handleModalEditOpen}
        onClose={handleModalEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography>Edit an Item</Typography>
          <form encType="multipart/form-data" onSubmit={(e) => handleSubmit(e)}>
            <TextField
              id="standard-basic"
              label="Item Name"
              variant="standard"
              name="name"
              type="text"
              value={formEditItem.name || ""}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Item Price"
              variant="standard"
              name="price"
              type="number"
              value={formEditItem.price || ""}
              onChange={handleChange}
            />
            <TextField
              id="standard-basic"
              label="Item Stock"
              variant="standard"
              name="stock"
              type="number"
              value={formEditItem.stock || ""}
              onChange={handleChange}
            />
            <br />
            <button>Update</button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalEdit;
