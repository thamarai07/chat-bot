import { Typography } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { NAV_MENU } from "./constants/general";
import { appendIndexToValue } from "../../utils/general";
import { Drawer, IconButton } from "@mui/material";
import { Close, ExpandLess, ExpandMore } from "@mui/icons-material";
import styled from "styled-components";
import { StyledTreeItem, useStyles } from "components/treeView/TreeView";
import { TreeView } from "@mui/lab";
import "./Sidebar.scss";

const sideMenuActiveClass = ({ isActive }) =>
  isActive ? "side-menu-lactive not-active-class" : "not-active-class";

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Sidebar = ({ setOpen, open }) => {
  return (
    <>
      <Drawer
        className="menu-drawer"
        sx={{
          width: "15rem",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "15rem",
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "1rem",
          }}
        >
          <Typography variant="h5" style={{ color: "rgba(139, 149, 191, 1)" }}>
            <strong>Menu</strong>
          </Typography>
          <IconButton onClick={() => setOpen(false)} size="large">
            <Close style={{ color: "blue" }} />
          </IconButton>
        </DrawerHeader>
        <div className="drawer-menuOptions" style={{ margin: "1rem" }}>
          {[...NAV_MENU].map(({ url, label, key }, index) =>
            key === "webDevelopment" ? (
              <RenderTreeView setOpen={setOpen} />
            ) : (
              <NavLink
                to={url}
                className={sideMenuActiveClass}
                key={appendIndexToValue(label, index)}
                onClick={() => setOpen(!open)}
              >
                <Typography className="title">{label}</Typography>
              </NavLink>
            )
          )}
        </div>
      </Drawer>
    </>
  );
};

const RenderTreeView = ({ setOpen }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState([]);
  const handleChange = (event, nodes) => {
    setExpanded(nodes);
  };
  let nodeId = 0;
  const navigate = useNavigate();

  return (
    <>
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandLess />}
        defaultExpandIcon={<ExpandMore />}
        expanded={expanded}
        onNodeToggle={handleChange}
      >
        {[
          { key: "webDevelopment", label: "Software Development", path: "" },
        ].map((item, index) => {
          nodeId += 1;
          return (
            <>
              <StyledTreeItem
                nodeId={nodeId.toString()}
                labelText={
                  <Typography className="title">{item.label}</Typography>
                }
                key={item.key}
              >
                {[
                  {
                    key: "webDevelopment",
                    name: "Web Development",
                    path: "web",
                  },
                  {
                    key: "cloudDevelopment",
                    name: "Cloud Development",
                    path: "cloud",
                  },
                  {
                    key: "mobileDevelopment",
                    name: "Mobile Development",
                    path: "mobile",
                  },
                ].map((subItem, index) => {
                  nodeId += 1;
                  return (
                    <StyledTreeItem
                      nodeId={nodeId.toString()}
                      labelText={subItem.name}
                      key={`child-${subItem.key}`}
                      onClick={() => {
                        navigate(`/webDevelopment/${subItem.path}`);
                        setOpen(false);
                      }}
                    />
                  );
                })}
              </StyledTreeItem>
            </>
          );
        })}
      </TreeView>
    </>
  );
};

export default Sidebar;
