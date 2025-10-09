import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PokemonDetail from "../pages/PokemonDetail";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
    </Routes>
  );
}

export default AppRoutes;
