import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, AuthLayout } from "./components";
import { Home } from "./pages/Home";
import { Niveles, NivelDetail } from "./pages/Niveles";
import { PruebaNivel } from "./pages/PruebaNivel";
import { Lecciones } from "./pages/Lecciones";
import { LeccionDetail } from "./pages/LeccionDetail";
import { Practica } from "./pages/Practica";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { RecuperarPassword } from "./pages/RecuperarPassword";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/niveles" element={<Niveles />} />
          <Route path="/niveles/:level" element={<NivelDetail />} />
          <Route path="/prueba-nivel" element={<PruebaNivel />} />
          <Route path="/lecciones" element={<Lecciones />} />
          <Route path="/lecciones/:id" element={<LeccionDetail />} />
          <Route path="/practica" element={<Practica />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/recuperar-password" element={<RecuperarPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
