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
  paper: "#f7f4ed",
  card: "#ede8dd",
  white: "#fffdf8",
  text: "#12233f",
  muted: "#6b7280",
  line: "#cfd0cf",
  overlay: "rgba(18, 35, 63, 0.7)",
};

export const darkTheme = {
  ...coreColors,
  isDark: true,
  paper: "#0b1627",
  card: "#12233f",
  white: "#0b1627",
  text: "#ffffff",
  muted: "#9ca3af",
  line: "rgba(255, 255, 255, 0.15)",
  overlay: "rgba(0, 0, 0, 0.7)",
};

const colors = lightTheme;
export default colors;
