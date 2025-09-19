// src/pages/IndiaStrategy.jsx
import React from "react";
import {
  Typography,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import DnsIcon from "@mui/icons-material/Dns";
import PublicIcon from "@mui/icons-material/Public";
import FindInPageIcon from "@mui/icons-material/FindInPage";
import PeopleIcon from "@mui/icons-material/People";
import NaturePeopleIcon from "@mui/icons-material/NaturePeople";

const IndiaStrategy = () => {
  return (
    <Box>
      {/* Page Title */}
      <Typography variant="h3" component="h1" gutterBottom>
        India's Modern Strategy & Grassroots Action
      </Typography>

      {/* Section 1: National Vision */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        National Vision and Infrastructure
      </Typography>
      <Paper elevation={2} sx={{ p: 2 }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <DnsIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Second National Genebank"
              secondary="India is establishing a second, larger genebank to create a crucial safety duplicate of its national collection."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PublicIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Global Contributions"
              secondary="India is a major contributor to the Svalbard Vault and a global leader in Plant Genetic Resources (PGR) management."
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FindInPageIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="Focus on Utilization"
              secondary="A strategic shift from just storing seeds to actively characterizing them, making it easier for breeders to find and use valuable traits."
            />
          </ListItem>
        </List>
      </Paper>

      {/* Section 2: Community Seed Banks */}
      <Typography variant="h4" gutterBottom sx={{ mt: 4 }}>
        The Power of Community Seed Banks
      </Typography>
      <Typography variant="body1" paragraph>
        India employs a powerful two-tiered system that combines the high-tech
        national genebank with decentralized, community-led local conservation
        efforts.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <PeopleIcon fontSize="large" color="action" />
          <Typography variant="h6">On-Farm Conservation</Typography>
          <Typography variant="body2">
            Farmers and local communities continue to cultivate and preserve
            traditional landraces in their fields, like medicinal rice in
            Wayanad, Kerala.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <NaturePeopleIcon fontSize="large" color="action" />
          <Typography variant="h6">Community-Led Models</Typography>
          <Typography variant="body2">
            Local groups, often led by women, manage "seed libraries" where
            farmers can borrow and return seeds, ensuring a continuous supply of
            locally adapted varieties.
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mt: 5.5 }}>
            Empowering Local Guardians
          </Typography>
          <Typography variant="body2">
            These grassroots efforts secure local food systems, reduce
            dependence on commercial seeds, and protect invaluable traditional
            knowledge, thereby strengthening <strong>food sovereignty</strong>.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default IndiaStrategy;
