import * as types from "./actionType";

const initialState = {
  items: [],
  item: {},
  loading: true,
};

const itemsReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case types.DELETE_ITEM:
    case types.ADD_ITEM:
      return {
        ...state,
        loading: false,
      };
    case types.EDIT_ITEM:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case types.DETAIL_ITEM:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default itemsReducers;
