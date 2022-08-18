import React, { useContext } from "react";

import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import { UIContext } from "../../context/ui";

export const SideBar = () => {
  const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

  const { sideMenuOpen, closeMenu } = useContext( UIContext )

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeMenu}>
      <Box sx={{ widht: 250 }}>
        <Box
          sx={{
            padding: "5px 10px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5">Menu</Typography>
        </Box>
        <List>
          {menuItems.map((item, i) => (
            <ListItem button key={item}>
              <ListItemIcon>
                {i % 2 ? <MailOutlinedIcon /> : <InboxOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>//prueba
  );
};
