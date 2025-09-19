// src/pages/GlobalEfforts.jsx
import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const GlobalEfforts = () => {
  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        Global and National Conservation Efforts
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Case Study 1: Svalbard Global Seed Vault */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://images.unsplash.com/photo-1629813131367-272d7b53945a?q=80&w=2071&auto=format&fit=crop"
              alt="Svalbard Global Seed Vault Entrance"
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Case Study 1: The Svalbard Global Seed Vault
              </Typography>
              <Typography variant="h6" color="text.secondary">
                The Ultimate Failsafe
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                <strong>Mission:</strong> To provide a secure backup storage
                facility for seed collections held in genebanks worldwide—an
                "insurance policy" against catastrophic loss.
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>Governance:</strong> A partnership between Norway,
                    the Crop Trust, and NordGen.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>The "Black Box" System:</strong> Depositing
                    genebanks retain exclusive ownership and control over their
                    seeds, building international trust.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Strategic Importance:</strong> Located in a remote,
                    geologically stable, and naturally frozen mountain
                    (permafrost) to ensure long-term security.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>

        {/* Case Study 2: India's NBPGR */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              height="200"
              image="https://nbpgr.icar.gov.in/DGR/Show_Image"
              alt="National Bureau of Plant Genetic Resources, New Delhi"
            />
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Case Study 2: India's NBPGR
              </Typography>
              <Typography variant="h6" color="text.secondary">
                National Bureau of Plant Genetic Resources
              </Typography>
              <Typography variant="body1" paragraph sx={{ mt: 2 }}>
                <strong>Mandate:</strong> India's central organization for
                managing all aspects of the nation's plant genetic
                resources—from collection and quarantine to conservation and
                distribution.
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>The National Genebank (NGB):</strong> The world's
                    second-largest, holding nearly half a million unique
                    accessions in New Delhi.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Integrated Strategy:</strong> Utilizes a combination
                    of a seed bank, an in vitro genebank, and a cryobank.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>National Impact:</strong> Serves as a vital resource
                    for India's agricultural scientists and breeders.
                  </Typography>
                </li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default GlobalEfforts;
