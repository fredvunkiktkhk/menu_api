import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_ITEM,
  UPDATE,
  DELETE_ITEM,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(items => items._id !== action.payload)
      };
    case EDIT_ITEM:
      return state.map(items =>
        items._id === action.id ? { ...items, editing: !items.editing } : items
      );
    case UPDATE:
      return state.map(items => {
        if (items._id === action.id) {
          return {
            ...items,
            name: action.data.newName,
            price: action.data.newPrice,
            editing: !items.editing
          };
        } else {
          return items;
        }
      });
    // case EDIT_ITEM:
    //   return {
    //     ...state,
    //     items: state.items.map(item => item._id !== action.payload
    //     ? action.payload : item
    //     )
    //   };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
