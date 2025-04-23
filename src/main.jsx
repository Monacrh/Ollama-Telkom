import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./stores/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./pages/home";
import Kelas from "./pages/kelas";
import Anggota from "./pages/anggota";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="k/:kelasId" element={<Kelas />}>
              <Route path="a/:anggotaId" element={<Anggota />} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
