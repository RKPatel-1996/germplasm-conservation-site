// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar

// Import all your pages
import Home from "./pages/Home";
import Methods from "./pages/Methods";
import GlobalEfforts from "./pages/GlobalEfforts";
import IndiaStrategy from "./pages/IndiaStrategy";
import BiotechRole from "./pages/BiotechRole";

// Optional: Add a simple footer
import { Box, Typography, Container } from "@mui/material";

const Footer = () => (
  <Box sx={{ bgcolor: "primary.main", color: "white", p: 3, mt: 4 }}>
    <Container maxWidth="lg">
      <Typography variant="body2" align="center">
        Germplasm Conservation Project © 2025
      </Typography>
    </Container>
  </Box>
);

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Container sx={{ py: 4 }}>
          {" "}
          {/* Adds padding around page content */}
          <Routes>
            <Route path="/" element={<Home />} />
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
