// part of the library
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
//style
import "./index.css";
//state
import store from "./components/state/reduxStore";
// component
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App

    />
  </Provider>
);

