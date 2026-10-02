import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Methods from "./pages/Methods";
import GlobalEfforts from "./pages/GlobalEfforts";
import IndiaStrategy from "./pages/IndiaStrategy";
import BiotechRole from "./pages/BiotechRole";

import { Box, Typography, Container } from "@mui/material";

const Footer = () => (
  <Box sx={{ bgcolor: "primary.main", color: "white", p: 3, mt: 4 }}>
    <Container maxWidth="lg">
      <Typography variant="body2" align="center">
        Germplasm Conservation Project © 2026
      </Typography>
    </Container>
  </Box>
);

function App() {
  const location = useLocation();
  const isPresentationHome = location.pathname === "/";

  if (isPresentationHome) {
    return <Home />;
  }

  return (
    <div>
      <Navbar />

      <main>
        <Container sx={{ py: 4 }}>
          <Routes>
            <Route path="/methods" element={<Methods />} />
            <Route path="/global-efforts" element={<GlobalEfforts />} />
            <Route path="/india-strategy" element={<IndiaStrategy />} />
            <Route path="/biotech-role" element={<BiotechRole />} />
          </Routes>
        </Container>
      </main>

      <Footer />
    </div>
  );
}

export default App;
