export function applyThemeVars(config) {
  const root = document.documentElement;
  const overrides = config?.theme?.overrides || {};

  Object.entries(overrides).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
}