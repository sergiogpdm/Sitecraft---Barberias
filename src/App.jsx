import { Routes, Route } from "react-router-dom";
import { SiteConfigProvider } from "./context/SiteConfigContext.jsx";
import Home from "./pages/Home.jsx";
import Customize from "./pages/Customize.jsx";

export default function App() {
  return (
    <SiteConfigProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customize" element={<Customize />} />
      </Routes>
    </SiteConfigProvider>
  );
}