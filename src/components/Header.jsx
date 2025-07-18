import { AppBar, Toolbar, Typography, Box, Button, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ColorModeContext } from "../theme/ColorModeContext";
import { Brightness4, Brightness7 } from "@mui/icons-material";

export default function Header() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  const navItems = [
    { label: "Dashboard", to: "/" },
    { label: "About", to: "/about" },
    { label: "Settings", to: "/settings" },
  ];

  return (
    <AppBar position="sticky" elevation={3}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          🚀 DevOps Dashboard
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          {navItems.map(({ label, to }) => (
            <Button
              key={to}
              component={NavLink}
              to={to}
              sx={{
                color: "white",
                mx: 1,
                textTransform: "none",
                fontWeight: "medium",
                "&.active": {
                  borderBottom: "2px solid white",
                  fontWeight: "bold",
                },
              }}
            >
              {label}
            </Button>
          ))}

          <IconButton onClick={toggleColorMode} color="inherit">
            {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}