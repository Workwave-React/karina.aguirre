import { useEffect } from "react";
import "./App.css";
import { AppProvider, useApp } from "./context/AppContext";
import { lightTheme, darkTheme } from "./components/constants/theme";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { CompareProvider } from "./context/CompareContext";

function AppContent() {
  const { theme } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

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
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundAttachment = "fixed";

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % backgrounds.length;
      document.body.style.backgroundImage = `url('${backgrounds[currentIndex]}')`;
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (theme === "light") {
      document.body.style.setProperty(
        "--theme-overlay",
        "rgba(255, 255, 255, 0.1)"
      );
    } else {
      document.body.style.setProperty("--theme-overlay", "rgba(0, 0, 0, 0.4)");
    }
  }, [theme]);

  return <AppRoutes />;
}

function App() {
  return (
    <AppProvider>
      <CompareProvider>
        <Router>
          <AppContent />
        </Router>
      </CompareProvider>
    </AppProvider>
  );
}

export default App;
