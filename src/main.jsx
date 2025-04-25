import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Fixed import
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./stores/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import Home from "./pages/home";
import Kelas from "./pages/kelas";
import Anggota from "./pages/anggota";
import ChatPage from "./components/MainContent/ChatPage";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            {/* Main layout route */}
            <Route path="/" element={<Home />}>
              {/* Nested routes that appear in Home's Outlet */}
              <Route path="k/:kelasId" element={<Kelas />}>
                <Route path="a/:anggotaId" element={<Anggota />} />
              </Route>
              <Route path="chat/:chatID" element={<ChatPage />} />
            </Route>
            
            {/* Add a catch-all route for 404s */}
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </PersistGate>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);