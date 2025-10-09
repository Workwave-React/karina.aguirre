import { Box, IconButton, Tooltip, Paper } from "@mui/material";
import { Brightness4, Brightness7, ViewModule, ViewList } from "@mui/icons-material";
import { useApp } from "../context/AppContext";
import { lightTheme, darkTheme } from "../components/constants/theme";

function ControlsBar() {
  const { theme, toggleTheme, viewMode, toggleViewMode } = useApp();
  const currentTheme = theme === "light" ? lightTheme : darkTheme;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 1000,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          gap: 1,
          padding: 1,
          backgroundColor: currentTheme.cardBackground,
          borderRadius: 2,
        }}
      >
        <Tooltip title={theme === "light" ? "Dark Mode" : "Light Mode"}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: currentTheme.textPrimary,
              "&:hover": {
                backgroundColor:
                  theme === "light"
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            {theme === "light" ? <Brightness4 /> : <Brightness7 />}
          </IconButton>
        </Tooltip>

        <Tooltip title={viewMode === "grid" ? "List View" : "Grid View"}>
          <IconButton
            onClick={toggleViewMode}
            sx={{
              color: currentTheme.textPrimary,
              "&:hover": {
                backgroundColor:
                  theme === "light"
                    ? "rgba(0,0,0,0.05)"
                    : "rgba(255,255,255,0.1)",
              },
            }}
          >
            {viewMode === "grid" ? <ViewList /> : <ViewModule />}
          </IconButton>
        </Tooltip>
      </Paper>
    </Box>
  );
}

export default ControlsBar;
