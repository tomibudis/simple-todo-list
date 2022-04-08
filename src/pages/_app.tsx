import "../styles/global.css";

import React from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Store } from "redux";

import makeStore from "../modules/redux-store";
import withRedux from "../hocs/with-redux";
interface MyAppContext extends AppProps {
  store: Store;
  isServer: boolean;
}

function App({ Component, pageProps, store }: MyAppContext) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default withRedux(makeStore)(App);
