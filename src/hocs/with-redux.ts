// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from "react";

const isServer = typeof window === "undefined";
const __NEXT_REDUX_STORE__ = "__NEXT_REDUX_STORE__";

const getOrCreateStore = ({ makeStore, initialState }) => {
  const createStore = () =>
    makeStore(initialState, {
      isServer,
    });

  if (isServer) {
    return createStore();
  }

  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = createStore();
  }

  return window[__NEXT_REDUX_STORE__];
};

const withRedux = (makeStore) => (App) => {
  return class ReduxEnhancer extends React.Component {
    static displayName = `withRedux(${App.displayName || App.name || "App"}`;

    static async getInitialProps(appCtx) {
      const store = getOrCreateStore({ makeStore });

      appCtx.ctx.store = store;
      appCtx.ctx.isServer = isServer;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appCtx);
      }

      return {
        ...appProps,
        initialState: store.getState(),
      };
    }

    constructor(props, context) {
      super(props, context);

      this.store = getOrCreateStore({
        makeStore,
        // eslint-disable-next-line react/prop-types
        initialState: props.initialState,
      });
    }

    render() {
      return React.createElement(App, {
        ...this.props,
        store: this.store,
      });
    }
  };
};

export default withRedux;
