import React from "react";
import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./styles/global";
import Footer from "./components/Footer";

import "./services/firebase";

import Routes from "./routes";
import AppProvider from "./hooks";

function App() {
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <BrowserRouter>
          <AppProvider>
            <Routes />
          </AppProvider>
        </BrowserRouter>
      </div>
      <Footer />
      <GlobalStyles />
    </div>
  );
}

export default App;
