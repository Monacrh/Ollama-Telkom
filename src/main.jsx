import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./stores/store";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// Import your pages
import Home from "./pages/home";
import Kelas from "./pages/kelas";
import Anggota from "./pages/anggota";
import ChatPage from "./components/MainContent/ChatPage";
import Login from "./pages/auth/login";
import ProtectedRoute from "./protectedRoute";
import Register from "./pages/auth/register";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <Routes>
  {/* Public Route */}
  <Route path="/login" element={<Login />} />
  <Route path="/Register" element={<Register />} />

  {/* Protected Routes */}
  <Route element={<ProtectedRoute />}>
    <Route path="/" element={<Home />}>
      <Route path="k/:kelasId" element={<Kelas />}>
        <Route path="a/:anggotaId" element={<Anggota />} />
      </Route>
      <Route path="chat/:chatID" element={<ChatPage />} />
    </Route>
  </Route>

  {/* 404 Not Found */}
  <Route path="*" element={<div>404 Not Found</div>} />
</Routes>
        </PersistGate>
      </Provider>
    </StrictMode>
  </BrowserRouter>
);
