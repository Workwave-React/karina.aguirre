import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import PokemonDetail from "../pages/PokemonDetail";
import Compare from "../pages/Compare";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pokemon/:name" element={<PokemonDetail />} />
      <Route path="/compare" element={<Compare />} />
    </Routes>
  );
}

export default AppRoutes;
