// src/pages/Methods.jsx
import React from "react";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Methods = () => {
  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        Methods of Preservation
      </Typography>

      {/* Section 1: In Situ vs. Ex Situ */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        Two Core Strategies: In Situ vs. Ex Situ
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              In Situ (On-site)
            </Typography>
            <Typography variant="body1">
              Conserving plants in their natural habitat or on farms. This
              allows for continued evolution and adaptation to changing
              environments.
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom>
              Ex Situ (Off-site)
            </Typography>
            <Typography variant="body1">
              Conserving genetic material outside its natural habitat, primarily
              in facilities like genebanks. This provides a secure backup.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography variant="body1" sx={{ mt: 2 }}>
        <strong>Integrated Approach:</strong> Using both strategies is the most
        robust way to conserve biodiversity.
      </Typography>

      {/* Section 2: The Architecture of Genebanks */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        The Architecture of Genebanks
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Seed Banks</Typography>
              <Typography variant="body2">
                The most common method. Stores dried seeds at low temperatures
                (-18°C) for long-term preservation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Field Genebanks</Typography>
              <Typography variant="body2">
                Living collections of plants (e.g., orchards). Essential for
                crops that don't produce storable seeds but are vulnerable.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">In Vitro Genebanks</Typography>
              <Typography variant="body2">
                Storing plant tissues in test tubes under controlled,
                slow-growth conditions. A space-saving alternative.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ color: "primary.main", fontWeight: "bold" }}
              >
                Cryobanks (Cryopreservation)
              </Typography>
              <Typography variant="body2">
                The ultimate long-term storage. Preserves tissues in liquid
                nitrogen (-196°C), halting all biological activity.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Section 3: Deep Dive into Cryopreservation */}
      <Box sx={{ mt: 4 }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h5">
              Deep Dive: The Science of Cryopreservation
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography paragraph>
              <strong>Core Principle:</strong> Freezing biological material to
              -196°C to achieve a state of "suspended animation," halting all
              metabolic processes and aging.
            </Typography>
            <Typography paragraph>
              <strong>Key Challenge:</strong> Avoiding lethal ice crystal
              formation (cryoinjury) inside the cells.
            </Typography>
            <Typography paragraph>
              <strong>Techniques:</strong> Two primary methods are used—slow
              freezing, which allows water to move out of cells, and
              vitrification, an ultra-rapid cooling that turns cell contents
              into a glass-like state, avoiding ice crystals entirely.
            </Typography>
            <Typography paragraph>
              <strong>Critical Role:</strong> It is the only viable long-term
              conservation method for "unbankable" species with recalcitrant
              seeds (e.g., mango, cocoa) and vegetatively propagated crops
              (e.g., cassava, yam).
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Methods;
