export const lightTheme = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  cardBackground: "#ffffff",
  textPrimary: "#333333",
  textSecondary: "#666666",
  textHint: "#999999",
  borderColor: "#e0e0e0",
  hoverShadow: "0 4px 20px rgba(0,0,0,0.15)",
};

export const darkTheme = {
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
  cardBackground: "#2a2a3e",
  textPrimary: "#ffffff",
  textSecondary: "#e6e3e3",
  textHint: "#888888",
  borderColor: "#3a3a4e",
  hoverShadow: "0 4px 20px rgba(255,255,255,0.1)",
};

export type ThemeColors = typeof lightTheme;
