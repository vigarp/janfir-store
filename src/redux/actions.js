import * as types from "./actionType";
import axios from "axios";

const getItems = (items) => ({
  type: types.GET_ITEMS,
  payload: items,
});

const itemDeleted = () => ({
  type: types.DELETE_ITEM,
});

const itemAdded = () => ({
  type: types.ADD_ITEM,
});

const itemEdited = () => ({
  type: types.EDIT_ITEM,
});

const itemDetailed = (items) => ({
  type: types.DETAIL_ITEM,
  payload: items,
});

export const loadItems = (querySearch, queryPage) => {
  if (querySearch) {
    return function (dispatch) {
      axios
        .get(`${process.env.REACT_APP_API}?limit=10&name=${querySearch}`)
        .then((res) => {
          dispatch(getItems(res.data));
        })
        .catch((err) => console.log(err));
    };
  } else {
    return function (dispatch) {
      axios
        .get(`${process.env.REACT_APP_API}?page=${queryPage}`)
        .then((res) => {
          dispatch(getItems(res.data));
        })
        .catch((err) => console.log(err));
    };
  }
};

export const deleteItem = (id) => {
  return function (dispatch) {
    axios
      .delete(`${process.env.REACT_APP_API}/${id}`)
      .then(() => {
        dispatch(itemDeleted());
        dispatch(loadItems());
      })
      .catch((err) => console.log(err));
  };
};

export const AddItem = (item) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return function (dispatch) {
    axios
      .post(`${process.env.REACT_APP_API}`, item, config)
      .then(() => {
        dispatch(itemAdded());
        dispatch(loadItems());
      })
      .catch((err) => console.log(err));
  };
};

export const editItem = (idItem, dataItem) => {
  const config = {
    headers: { "content-type": "multipart/form-data" },
  };
  return function (dispatch) {
    axios
      .put(`${process.env.REACT_APP_API}/${idItem}`, dataItem, config)
      .then(() => {
        dispatch(itemEdited());
        dispatch(loadItems());
      })
      .catch((err) => console.log(err));
  };
};

export const detailItem = (idItem) => {
  return function (dispatch) {
    axios
      .get(`${process.env.REACT_APP_API}/${idItem}`)
      .then((res) => {
        dispatch(itemDetailed(res.data));
      })
      .catch((err) => console.log(err));
  };
};
