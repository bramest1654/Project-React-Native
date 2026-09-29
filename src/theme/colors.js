/**
 * Anterin Design System — Color Palette
 * Sesi 5: Central color constants with Dark Mode support
 */

const coreColors = {
  navy: "#12233f",
  navyLight: "#1d3557",
  gold: "#c69a43",
  goldLight: "#e6c77b",
  goldSoft: "#f0d89a",
  danger: "#dc2626",
  success: "#16a34a",
};

export const lightTheme = {
  ...coreColors,
  isDark: false,
  paper: "#f7f4ed", // Light cream background
  card: "#ede8dd", // Slightly darker cream for cards
  white: "#fffdf8", // Purest light color
  text: "#12233f", // Navy text
  muted: "#6b7280", // Gray text
  line: "#cfd0cf", // Light border
  overlay: "rgba(18, 35, 63, 0.7)",
};

export const darkTheme = {
  ...coreColors,
  isDark: true,
  paper: "#0b1627", // Very dark navy background
  card: "#12233f", // Standard navy for cards
  white: "#0b1627", // Inverted white to dark navy (for some components)
  text: "#ffffff", // White text
  muted: "#9ca3af", // Lighter gray for dark mode
  line: "rgba(255, 255, 255, 0.15)", // Light translucent border
  overlay: "rgba(0, 0, 0, 0.7)",
};

// Default export for backward compatibility during refactor
const colors = lightTheme;
export default colors;
