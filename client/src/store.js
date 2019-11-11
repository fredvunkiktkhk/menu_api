import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistState } from "redux-persist";
import StateLoader from "./StateLoader";

const initialState = {};

const middleWare = [thunk];

const stateLoader = new StateLoader();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  stateLoader.loadState(),
  composeEnhancers(applyMiddleware(...middleWare))
);

// store.subscribe(() => {
//   saveState({
//     item: store.getState().items
//   });
// });

store.subscribe(() => {
  stateLoader.saveState(store.getState());
});

// store.subscribe(() => {
//   localStorage.setItem("reduxState", JSON.stringify(store.getState()));
//   console.log(store.getState());
// });

// persistStore(store);

export default store;
