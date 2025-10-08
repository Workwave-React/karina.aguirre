import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const backgrounds = [
      "/pokemon-bg.jpg",
      "/pokemon-bg2.jpg",
      "/pokemon-bg3.jpg",
      "/pokemon-bg4.jpg",
    ];

    const preloaded = backgrounds.map((src) => {
      const img = new Image();
      img.src = src;
      return img;
    });

    let currentIndex = 0;
    document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return <AppRoutes />;
}

export default App;
