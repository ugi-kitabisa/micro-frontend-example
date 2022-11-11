import React from "react";
import { Routes, Route, Outlet, BrowserRouter } from "react-router-dom";

import Pembayaran from "./components/Pembayaran";
import routes from "./router";

function App({ history }) {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes location={history.location}>
          <Route path="/app2" element={<Layout />}>
            {
              routes.map(({path, element}, i) => 
                <Route key={i} path={path} element={element} />
              )
            }
          </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
}

function Layout() {
  return <Outlet />;
}

export default App;
