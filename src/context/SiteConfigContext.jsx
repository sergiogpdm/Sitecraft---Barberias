import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { siteConfig as initialConfig } from "../config/site.config.js";
import { applyThemeVars } from "../utils/applyTheme.js";

const SiteConfigContext = createContext(null);

export function SiteConfigProvider({ children }) {
  const [config, setConfig] = useState(initialConfig);

  useEffect(() => {
    applyThemeVars(config);
  }, [config]);

  const value = useMemo(() => ({ config, setConfig }), [config]);

  return (
    <SiteConfigContext.Provider value={value}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const ctx = useContext(SiteConfigContext);
  if (!ctx) {
    throw new Error("useSiteConfig must be used within SiteConfigProvider");
  }
  return ctx;
}