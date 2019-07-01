import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { createStore, combineReducers } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

const INIT_STATE = {};

function countReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "INC":
      return {
        ...state,
        count: state.count + 1
      };
    case "DEC":
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

function nameReducer(state = { name: "" }, action) {
  switch (action.type) {
    case "UPDATE_NAME":
      return {
        ...state,
        name: action.payload
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  countReducer,
  nameReducer
});

const store = createStore(rootReducer, INIT_STATE);

function Counter() {
  const { count, name } = useSelector(state => ({
    ...state.countReducer,
    ...state.nameReducer
  }));
  const dispatch = useDispatch();

  function increment() {
    dispatch({
      type: "INC"
    });
  }

  function decrement() {
    dispatch({
      type: "DEC"
    });
  }

  return (
    <>
      <h2>Counter : {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <div>Your name is :{name}</div>
    </>
  );
}

function Name() {
  const dispatch = useDispatch();
  function handleUpdateName(event) {
    dispatch({
      type: "UPDATE_NAME",
      payload: event.target.value
    });
  }

  return (
    <div>
      <input placeholder="type your name !" onChange={handleUpdateName} />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Counter />
      <Name />
    </Provider>
  );
}

export default App;
