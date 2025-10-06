import { useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";

function App() {
  useEffect(() => {
    const backgrounds = [
      '/pokemon-bg.jpg',
      '/pokemon-bg2.jpg',
    ];
    
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AppRoutes />
    </>
  );
}

export default App;