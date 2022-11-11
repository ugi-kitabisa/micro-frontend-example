import React from "react";
import ReactDOM from "react-dom";
import { createMemoryRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import App from "./App";

import routes from "./router";

const mount = (el, { initialPath, defaultHistory }) => {
  const history =
    defaultHistory ||
    createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;

      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

/* Process Development in isolation */
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_App1");

  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}
/* End Process Development in isolation */

export { mount };
