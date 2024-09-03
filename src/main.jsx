// index.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { SearchProvider } from "./context/SearchContext";
import Layout from "./components/layout/layout.jsx";
import App from "./App.jsx";
import "./index.css";
import { MultiSelectProvider } from "./context/MultiSelectContext.jsx";
import { ReloadProvider } from "./context/ReloadContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ReloadProvider>
    <SearchProvider>
      <MultiSelectProvider>
      <Layout>
        <App />
      </Layout>
      </MultiSelectProvider>
    </SearchProvider>
    </ReloadProvider>
  </StrictMode>
);
