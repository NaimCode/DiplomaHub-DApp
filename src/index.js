import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { MoralisProvider } from "react-moralis";
ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider
      appId="lcmpAa95lKyjpiRgf8IGHD6Kcnj5pLcw6iqKc1TS"
      serverUrl="https://auhfedu31e9f.usemoralis.com:2053/server"
    > */}
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={false} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
    {/* </MoralisProvider> */}
  </React.StrictMode>,

  document.getElementById("root")
);
