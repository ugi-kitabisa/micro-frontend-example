import React from "react";
import "./style.css";
import logo from "./logo.svg?url";
import { Routes, Route, Outlet, Link, Router } from "react-router-dom";

import Dashboard from "./components/Dashboard";

const App2 = React.lazy(() => import("./components/App2"));
const App3 = React.lazy(() => import("./components/App3"));

function App() {
  return (
    <div>
      <div className="navbar">Navbar (App1)</div>
      <div className="wrap">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path="app2/*"
              element={
                <React.Suspense fallback="Loading...">
                  <App2 />
                </React.Suspense>
              }
            />
            <Route
              path="app3/*"
              element={
                <React.Suspense fallback="Loading...">
                  <App3 />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

function Layout() {
  return (
    <>
      <div className="sidebar">
        Sidebar (App1)
        <br />
        <ul className="menu">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/app2/pembayaran">Pembayaran</Link>
          </li>
          <li>
            <Link to="/app3/pembelian">Pembelian</Link>
          </li>
        </ul>
      </div>
      <div className="content">
        <Outlet />
      </div>
    </>
  );
}

function NoMatch() {
  return (
    <>
      <h1>Halaman tidak ditemukan!</h1>
    </>
  );
}

export default App;
