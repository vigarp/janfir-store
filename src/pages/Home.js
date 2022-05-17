import React, { useEffect, useState } from "react";
import { deleteItem, loadItems } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  CardMedia,
  Grid,
  TextField,
  Pagination,
  Stack,
} from "@mui/material";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";

const Home = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.data);

  const handleChangePage = (event, value) => {
    navigate(`/?page=${value}`);
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const querySearch = searchParams.get("search");
  const queryPage = searchParams.get("page");

  useEffect(() => {
    dispatch(loadItems(querySearch, queryPage));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [querySearch, queryPage]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      setSearchParams({ search: e.target.value });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteItem(id));
      dispatch(loadItems());
    }
  };

  const [modalAddOpen, setModalAddOpen] = useState(false);
  const handleModalAddOpen = () => setModalAddOpen(true);
  const handleModalAddClose = () => setModalAddOpen(false);

  const [modalEditOpen, setModalEditOpen] = useState(false);
  const [idItem, setIdItem] = useState({ data: "" });
  const handleModalEditOpen = (idItem) => {
    setModalEditOpen(true);
    setIdItem({ data: idItem });
  };
  const handleModalEditClose = () => {
    setModalEditOpen(false);
  };

  let pages = [];
  for (let i = 1; i <= items.message?.totalPage; i++) {
    pages.push(i);
  }
  return (
    <div>
      <Grid container justifyContent="center">
        <Button
          sx={{ my: 5 }}
          variant="contained"
          color="primary"
          onClick={handleModalAddOpen}
        >
          Add Item
        </Button>
      </Grid>
      <Grid container justifyContent="center">
        <TextField
          sx={{ my: 3 }}
          id="standard-basic"
          label="Search Here"
          variant="standard"
          onKeyUp={handleSearch}
        />
      </Grid>
      <Grid container justifyContent="center">
        {items &&
          items.data?.map((item) => (
            <Card sx={{ minWidth: 345, my: 10, mx: 5 }} key={item.id}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  width="150"
                  image={item.images}
                  alt={item.images}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Harga:{" "}
                    {item.price.toLocaleString("en-ID", {
                      style: "currency",
                      currency: "IDR",
                    })}
                    <br />
                    Stock: {item.stock} pcs
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleModalEditOpen(item.id)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))}
      </Grid>
      {modalAddOpen && (
        <ModalAdd
          handleModalAddOpen={handleModalAddOpen}
          handleModalAddClose={handleModalAddClose}
        />
      )}
      {modalEditOpen && (
        <ModalEdit
          handleModalEditOpen={handleModalEditOpen}
          handleModalEditClose={handleModalEditClose}
          idItem={idItem.data}
        />
      )}
      {!querySearch && (
        <Grid container justifyContent="center" sx={{ my: 5 }}>
          <Stack spacing={2}>
            <Pagination count={pages.length} onChange={handleChangePage} />
          </Stack>
        </Grid>
      )}
    </div>
  );
};

export default Home;
