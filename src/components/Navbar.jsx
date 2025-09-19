// src/components/Navbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Germplasm Conservation
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/methods">
            Methods
          </Button>
          <Button color="inherit" component={Link} to="/global-efforts">
            Global Efforts
          </Button>
          <Button color="inherit" component={Link} to="/india-strategy">
            India's Strategy
          </Button>
          <Button color="inherit" component={Link} to="/biotech-role">
            Biotechnologist's Role
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
