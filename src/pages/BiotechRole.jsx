// src/pages/BiotechRole.jsx
import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import BiotechIcon from "@mui/icons-material/Biotech";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import StorageIcon from "@mui/icons-material/Storage";

const BiotechRole = () => {
  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        The Role of the Biotechnologist
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
        Bridging Modern Science with Conservation
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <BiotechIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">
                Developing Preservation Protocols
              </Typography>
              <Typography variant="body2">
                Designing and optimizing the complex techniques for in vitro and
                cryopreservation, especially for difficult-to-conserve species.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <DonutLargeIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">Molecular Characterization</Typography>
              <Typography variant="body2">
                Using DNA analysis to understand genetic diversity, identify
                duplicate samples, and link specific genes to valuable traits
                like drought resistance.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <SettingsSuggestIcon
                color="primary"
                sx={{ fontSize: 40, mb: 1 }}
              />
              <Typography variant="h6">
                Genetic Engineering & Pre-Breeding
              </Typography>
              <Typography variant="body2">
                Transferring useful genes from wild relatives into cultivated
                crops, making novel traits accessible to breeders for developing
                improved varieties.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <StorageIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h6">
                PGR Informatics (Data Management)
              </Typography>
              <Typography variant="body2">
                Using bioinformatics, AI, and databases to manage and analyze
                the massive amounts of data from genomic studies, making
                collections more accessible.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BiotechRole;
