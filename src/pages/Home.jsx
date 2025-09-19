// src/pages/Home.jsx
import React from "react";
import "./Home.css"; // Your CSS file is linked here
import { Typography, Box, Grid, Card, CardContent, Paper } from "@mui/material";
import { TypeAnimation } from "react-type-animation";
import GrainIcon from "@mui/icons-material/Grain";

// This component remains the same
const GeneticErosionVisual = () => {
  const totalIcons = 100;
  const lostIcons = 75;
  return (
    <Paper elevation={3} sx={{ p: 2, backgroundColor: "#f5f5f5" }}>
      <Typography variant="h6" gutterBottom align="center">
        An Estimated 75% of Crop Diversity is Already Lost
      </Typography>
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="erosion-visual-container"
      >
        {Array.from({ length: totalIcons }).map((_, index) => (
          <Grid item key={index}>
            <GrainIcon
              sx={{ color: index < lostIcons ? "lightgray" : "green" }}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const Home = () => {
  // We've moved the styles to Home.css, so we can delete the style objects here.
  return (
    // Add the main container class for the fade-in animation
    <Box className="home-container">
      {/* 1. Hero Section using CSS classes */}
      <Box className="hero-section">
        <Box className="hero-background" />
        <Box className="hero-text">
          <Typography variant="h2" component="h1" gutterBottom>
            <TypeAnimation
              sequence={[
                "Securing Our Food's Future.",
                2000,
                "The Library of Life.",
                2000,
                "Protecting Genetic Diversity.",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </Typography>
          <Typography variant="h5">
            Understanding Germplasm Conservation.
          </Typography>
        </Box>
      </Box>

      {/* Section 1: What is Germplasm? */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        What is Germplasm? The Blueprint of Agriculture
      </Typography>
      <Typography variant="body1" paragraph>
        Germplasm is the living genetic material that carries hereditary
        information, essential for breeding new and improved crop varieties.
      </Typography>

      {/* 2. Interactive Cards using CSS class */}
      <Grid container spacing={3} sx={{ my: 2 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="interactive-card">
            <CardContent>
              <Typography variant="h6">Landraces</Typography>
              <Typography variant="body2">
                Traditional varieties developed by farmers over centuries.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="interactive-card">
            <CardContent>
              <Typography variant="h6">Crop Wild Relatives</Typography>
              <Typography variant="body2">
                Wild relatives of domesticated plants, holding key traits for
                stress resistance.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="interactive-card">
            <CardContent>
              <Typography variant="h6">Modern Cultivars</Typography>
              <Typography variant="body2">
                High-yielding varieties from scientific breeding programs.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="interactive-card">
            <CardContent>
              <Typography variant="h6">DNA Sequences</Typography>
              <Typography variant="body2">
                The purest form of genetic information stored digitally.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 3. Visualizing Genetic Erosion */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        The Threat of Genetic Erosion
      </Typography>
      <GeneticErosionVisual />
      <Typography variant="body1" paragraph sx={{ mt: 2 }}>
        <strong>Primary Causes:</strong> Widespread adoption of uniform
        varieties, habitat destruction, climate change, and market pressures.
      </Typography>

      {/* Section 4: Why Conservation is Crucial */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Why Conservation is Crucial for Food Security
      </Typography>
      <Typography variant="body1" paragraph>
        The core objective is to maintain a deep reservoir of genetic traits to
        address future challenges. This allows us to develop crops that can
        withstand climate change, resist new pests, and improve nutrition for a
        growing global population.
      </Typography>
    </Box>
  );
};

export default Home;
