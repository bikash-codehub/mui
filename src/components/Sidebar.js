"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Tooltip,
  Popper,
  Paper,
  Typography,
  ButtonBase,
  Collapse,
  ClickAwayListener,
} from "@mui/material";
import SidebarUserProfileMUI from "./SidebarUserProfileMUI";
import {
  DashboardIcon,
  ProjectsIcon,
  AnalyticsIcon,
  CustomersIcon,
  OrdersIcon,
  MessagesIcon,
  TrendsIcon,
  SettingsIcon,
  CustomViewIcon,
  HealthIcon,
  ReportingIcon,
  UserActionsIcon,
  AdminActionsIcon,
  HelpSupportIcon,
  DropdownIcon,
} from "./iconsMUI";

// Component for a single menu item in the expanded submenu
const SubmenuItem = ({
  item,
  depth = 0,
  onItemClick,
  expandedItems,
  toggleItemExpansion,
}) => {
  const hasChildren = item.subItems && item.subItems.length > 0;
  const isExpanded = expandedItems.includes(item.path);

  const handleClick = (e) => {
    e.stopPropagation();
    if (hasChildren) {
      toggleItemExpansion(item.path);
    } else {
      onItemClick(item.path);
    }
  };

  return (
    <>
      <ButtonBase
        onClick={handleClick}
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          textAlign: "left",
          justifyContent: "flex-start",
          px: 2,
          py: 1,
          pl: 2 + depth * 1,
          position: "relative",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <Box
          sx={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            mr: 1.5,
            flexShrink: 0,
          }}
        />
        <Typography
          sx={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14 - depth * 0.5,
            color: "#000",
          }}
        >
          {item.label}
        </Typography>
        {hasChildren && (
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
            }}
          >
            <DropdownIcon sx={{ width: 14, height: 14 }} />
          </Box>
        )}
      </ButtonBase>

      {/* Render child items if expanded */}
      {hasChildren && isExpanded && (
        <>
          {item.subItems.map((childItem, index) => (
            <SubmenuItem
              key={index}
              item={childItem}
              depth={depth + 1}
              onItemClick={onItemClick}
              expandedItems={expandedItems}
              toggleItemExpansion={toggleItemExpansion}
            />
          ))}
        </>
      )}
    </>
  );
};

// Main menu item component with click functionality
const ModifiedSidebarNavItemMUI = (props) => {
  const {
    icon,
    label,
    isActive = false,
    hasDropdown = false,
    notificationCount,
    isExpanded = false,
    onToggle,
    subItems = [],
    isCollapsed = false,
  } = props;

  // State declarations
  const [anchorEl, setAnchorEl] = useState(null);
  const [showSubmenu, setShowSubmenu] = useState(false);
  const [expandedItems, setExpandedItems] = useState([]);

  // Hook for navigation
  let navigate = (path) => console.log(`Navigation to ${path} requested`);
  try {
    const { useNavigate } = require("react-router-dom");
    navigate = useNavigate();
  } catch (e) {
    // Fallback
  }

  // Handler functions
  const handleNavigation = (path) => {
    if (typeof navigate === "function") {
      navigate(path);
    } else {
      console.log(`Navigate to: ${path}`);
    }
    setShowSubmenu(false);
  };

  const toggleItemExpansion = (path) => {
    setExpandedItems((prevExpanded) => {
      if (prevExpanded.includes(path)) {
        return prevExpanded.filter((item) => item !== path);
      } else {
        return [...prevExpanded, path];
      }
    });
  };

  // Toggle submenu visibility on click
  const handleIconClick = (event) => {
    event.stopPropagation(); // Prevent parent menu item click
    if (isCollapsed && hasDropdown && subItems.length > 0) {
      setAnchorEl(event.currentTarget);
      setShowSubmenu(!showSubmenu);
    } else if (hasDropdown && onToggle) {
      onToggle();
    }
  };

  // Handle click outside
  const handleClickAway = () => {
    if (showSubmenu) {
      setShowSubmenu(false);
    }
  };

  return (
    <Box sx={{ position: "relative", mb: 0.5 }}>
      <Tooltip title={isCollapsed ? label : ""} placement="right">
        <ButtonBase
          onClick={handleIconClick}
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "48px",
            padding: isCollapsed
              ? "0 8px"
              : {
                  xs: "0 8px",
                  sm: "0 12px",
                  md: "0 16px",
                },
            borderRadius: "6px",
            position: "relative",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            justifyContent: isCollapsed ? "center" : "flex-start",
            transition: "background-color 0.2s",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
            },
            mx: isCollapsed ? "4px" : 0,
          }}
        >
          {isActive && (
            <Box
              sx={{
                width: "4px",
                height: "48px",
                position: "absolute",
                left: 0,
                top: 0,
                bgcolor: "#0053E2",
              }}
            />
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: isCollapsed ? 0 : "20px",
              width: "24px",
              height: "24px",
              flexShrink: 0,
              color: isActive ? "#0053E2" : "inherit",
            }}
          >
            {icon}
          </Box>

          {!isCollapsed && (
            <Typography
              sx={{
                fontFamily: "'Inter', sans-serif",
                fontSize: {
                  xs: "13px",
                  sm: "14px",
                  md: "15px",
                },
                color: isActive ? "#0053E2" : "#000",
                fontWeight: isExpanded ? 500 : 400,
                textAlign: "left",
              }}
            >
              {label}
            </Typography>
          )}

          {notificationCount && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "24px",
                height: "24px",
                color: "#fff",
                borderRadius: "50%",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                position: isCollapsed ? "absolute" : "absolute",
                right: isCollapsed ? "-4px" : "16px",
                top: isCollapsed ? "0" : "auto",
                bgcolor: "#0053E2",
                zIndex: 1,
              }}
            >
              {notificationCount}
            </Box>
          )}

          {hasDropdown && !isCollapsed && (
            <Box
              sx={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                flexShrink: 0,
              }}
            >
              <DropdownIcon />
            </Box>
          )}
        </ButtonBase>
      </Tooltip>

      {/* Click-based submenu for collapsed mode */}
      {isCollapsed && hasDropdown && subItems.length > 0 && (
        <Popper
          open={showSubmenu}
          anchorEl={anchorEl}
          placement="right-start"
          style={{ zIndex: 9000 }}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [0, 0],
              },
            },
          ]}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper
              elevation={3}
              sx={{
                ml: 1,
                minWidth: 220,
                maxHeight: "80vh",
                borderRadius: "8px",
                overflow: "auto",
                backgroundColor: "#fff",
              }}
            >
              <Box sx={{ py: 1 }}>
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 500,
                    color: "#9234EA",
                    px: 2,
                    py: 1,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
                    textAlign: "left",
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                    zIndex: 1,
                  }}
                >
                  {label}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  {subItems.map((item, index) => (
                    <SubmenuItem
                      key={index}
                      item={item}
                      depth={0}
                      onItemClick={handleNavigation}
                      expandedItems={expandedItems}
                      toggleItemExpansion={toggleItemExpansion}
                    />
                  ))}
                </Box>
              </Box>
            </Paper>
          </ClickAwayListener>
        </Popper>
      )}

      {/* First level nested menu items - only show when not collapsed */}
      {hasDropdown && subItems.length > 0 && !isCollapsed && (
        <Collapse in={isExpanded} timeout="auto" unmountOnExit>
          <Box
            sx={{
              position: "relative",
              mt: 0.5,
              mb: 0.5,
              // Align with the text of parent menu item
              pl: {
                xs: "28px", // Align with the icon in smaller screens
                sm: "32px", // Align with the icon in medium screens
                md: "36px", // Align with the icon in larger screens
              },
              // Add a subtle vertical line to show hierarchy
              "&::before": {
                content: '""',
                position: "absolute",
                left: {
                  xs: "10px",
                  sm: "14px",
                  md: "18px",
                },
                top: 0,
                bottom: 0,
                width: "1px",
                backgroundColor: "rgba(146, 52, 234, 0.1)",
              },
            }}
          >
            {subItems.map((item, index) => (
              <ButtonBase
                key={index}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  height: "36px",
                  padding: "0 12px",
                  borderRadius: "6px",
                  position: "relative",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  transition: "background-color 0.2s",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.04)",
                  },
                  mb: index === subItems.length - 1 ? 0 : 0.5,
                }}
              >
                {/* Dot connector for nested items */}
                <Box
                  sx={{
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    marginRight: "8px",
                    flexShrink: 0,
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: {
                      xs: "12px",
                      sm: "13px",
                      md: "14px",
                    },
                    color: "inherit",
                    fontWeight: 400,
                  }}
                >
                  {item.label}
                </Typography>
                {item.subItems && item.subItems.length > 0 && (
                  <Box
                    sx={{
                      marginLeft: "auto",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <DropdownIcon sx={{ width: 14, height: 14 }} />
                  </Box>
                )}
              </ButtonBase>
            ))}
          </Box>
        </Collapse>
      )}
    </Box>
  );
};

const SidebarMUIV2 = ({ isCollapsed = false }) => {
  // State to track which top-level menus are expanded
  const [expandedMenus, setExpandedMenus] = useState({
    projects: false,
    analytics: false,
    trends: false,
    settings: false,
    dashboard: false,
    customView: false,
    health: false,
    reporting: false,
    userActions: false,
    adminActions: false,
    helpOrSupport: false,
  });

  // Toggle menu expansion - only if not collapsed
  const toggleMenu = (menuKey) => {
    if (!isCollapsed) {
      setExpandedMenus((prev) => ({
        ...prev,
        [menuKey]: !prev[menuKey],
      }));
    }
  };

  // Sample nested menu items with second level

  const dashboardSubItems = [
    { label: "Main", path: "/dashboard/main" },
    { label: "Trends", path: "/dashboard/trends" },
    { label: "AI", path: "/dashboard/ai" },
  ];

  const customViewsSubItems = [
    { label: "Sites", path: "/custom-view/sites" },
    { label: "Cells", path: "/custom-view/cells" },
    { label: "Teams", path: "/custom-view/teams" },
  ];

  const healthSubItems = [
    { label: "Logistics", path: "/health/Logistics" },
    { label: "Atlas", path: "/health/Atlas" },
    { label: "Atlas International", path: "/health/Atlas International" },
    { label: "Transportation", path: "/health/Transportation" },
    { label: "Operational Tools", path: "/health/Operational Tools" },
    { label: "TLM", path: "/health/TLM" },
  ];

  const reportingSubItems = [
    { label: "Action Taken Report", path: "/reporting/action-taken-report" },
    {
      label: "Single Consolidate Report",
      path: "/reporting/single-consolidate-report",
    },
    { label: "Historical Data", path: "/reporting/historical-data" },
  ];

  const userActionsSubItems = [
    {
      label: "Onboarding",
      path: "/user-actions/onboarding",
      subItems: [
        { label: "Clone KPI", path: "/user-actions/onboarding/clone-kpi" },
        { label: "Disable App", path: "/user-actions/onboarding/disable-kpi" },
        { label: "New KPI", path: "/user-actions/onboarding/new-kpi" },
        {
          label: "Spotlight Token Request",
          path: "/user-actions/onboarding/spotlight-token-request",
        },
        { label: "New KPI", path: "/user-actions/onboarding/new-kpi" },
      ],
    },
    {
      label: "KPI Governance",
      path: "/user-actions/kpi-governance",
      subItems: [
        {
          label: "New KPI Signup/Ops Handover",
          path: "/user-actions/kpi-governance/new-kpi-signup",
        },
        {
          label: "KPI Validation",
          path: "/user-actions/kpi-governance/kpi-validation",
        },
        {
          label: "Resource Validation",
          path: "/user-actions/kpi-governance/resource-validation",
        },
      ],
    },
  ];

  const adminActionsSubItems = [
    {
      label: "Team Management",
      path: "/admin-actions/team-management",
      subItems: [
        { label: "New Team", path: "/admin-actions/team-management/new-team" },
        {
          label: "Custom Onboarding",
          path: "/admin-actions/team-management/custom-onboarding",
        },
      ],
    },
  ];

  const helpOrSupportSubItems = [
    { label: "Jira", path: "/support/jira" },
    { label: "Help", path: "/support/help" },
  ];

  const projectsSubItems = [
    {
      label: "Active Projects",
      path: "/projects/active",
      subItems: [
        { label: "Web Development", path: "/projects/active/web" },
        { label: "Mobile Apps", path: "/projects/active/mobile" },
        { label: "Design", path: "/projects/active/design" },
      ],
    },
    {
      label: "Archived",
      path: "/projects/archived",
      subItems: [
        { label: "2023 Projects", path: "/projects/archived/2023" },
        { label: "2022 Projects", path: "/projects/archived/2022" },
      ],
    },
    { label: "Create New", path: "/projects/new" },
  ];

  const analyticsSubItems = [
    {
      label: "Dashboard",
      path: "/analytics/dashboard",
      subItems: [
        { label: "Overview", path: "/analytics/dashboard/overview" },
        { label: "Performance", path: "/analytics/dashboard/performance" },
      ],
    },
    {
      label: "Reports",
      path: "/analytics/reports",
      subItems: [
        { label: "Monthly", path: "/analytics/reports/monthly" },
        { label: "Quarterly", path: "/analytics/reports/quarterly" },
        { label: "Annual", path: "/analytics/reports/annual" },
      ],
    },
    { label: "Statistics", path: "/analytics/statistics" },
  ];

  const trendsSubItems = [
    {
      label: "Market Trends",
      path: "/trends/market",
      subItems: [
        { label: "Global Markets", path: "/trends/market/global" },
        { label: "Local Markets", path: "/trends/market/local" },
        { label: "Industry Specific", path: "/trends/market/industry" },
      ],
    },
    {
      label: "User Behavior",
      path: "/trends/user-behavior",
      subItems: [
        { label: "Engagement", path: "/trends/user-behavior/engagement" },
        { label: "Retention", path: "/trends/user-behavior/retention" },
        { label: "Conversion", path: "/trends/user-behavior/conversion" },
      ],
    },
    { label: "Trend Analysis", path: "/trends/analysis" },
  ];

  const settingsSubItems = [
    {
      label: "Account",
      path: "/settings/account",
      subItems: [
        { label: "Profile", path: "/settings/account/profile" },
        { label: "Billing", path: "/settings/account/billing" },
      ],
    },
    {
      label: "Preferences",
      path: "/settings/preferences",
      subItems: [
        { label: "Appearance", path: "/settings/preferences/appearance" },
        { label: "Notifications", path: "/settings/preferences/notifications" },
      ],
    },
    { label: "Security", path: "/settings/security" },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <Box
        component="nav"
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          boxShadow: isCollapsed
            ? "none"
            : "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.1)",
          bgcolor: "#fff",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <Box
          component="section"
          sx={{
            flexGrow: 1,
            padding: "16px 0",
            marginTop: "0",
          }}
        >
          {/* Using the ModifiedSidebarNavItemMUI for all menu items */}
          <ModifiedSidebarNavItemMUI
            icon={
              <DashboardIcon sx={{ color: "#9234EA", width: 24, height: 24 }} />
            }
            label="Dashboard"
            isActive={false}
            hasDropdown={true}
            isExpanded={expandedMenus.dashboard && !isCollapsed}
            onToggle={() => toggleMenu("dashboard")}
            subItems={dashboardSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={
              <CustomViewIcon
                sx={{ color: "#9234EA", width: 24, height: 24 }}
              />
            }
            label="Custom Views"
            hasDropdown={true}
            isExpanded={expandedMenus.customView && !isCollapsed}
            onToggle={() => toggleMenu("customView")}
            subItems={customViewsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={
              <HealthIcon sx={{ color: "#9234EA", width: 24, height: 24 }} />
            }
            label="Health"
            hasDropdown={true}
            isExpanded={expandedMenus.health && !isCollapsed}
            onToggle={() => toggleMenu("health")}
            subItems={healthSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={
              <ReportingIcon sx={{ color: "#9234EA", width: 24, height: 24 }} />
            }
            label="Reporting"
            hasDropdown={true}
            isExpanded={expandedMenus.reporting && !isCollapsed}
            onToggle={() => toggleMenu("reporting")}
            subItems={reportingSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<UserActionsIcon sx={{ width: 24, height: 24 }} />}
            label="User Actions"
            hasDropdown={true}
            isExpanded={expandedMenus.userActions && !isCollapsed}
            onToggle={() => toggleMenu("userActions")}
            subItems={userActionsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<AdminActionsIcon sx={{ width: 24, height: 24 }} />}
            label="Admin Actions"
            hasDropdown={true}
            isExpanded={expandedMenus.adminActions && !isCollapsed}
            onToggle={() => toggleMenu("adminActions")}
            subItems={adminActionsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<HelpSupportIcon sx={{ width: 24, height: 24 }} />}
            label="Help / Support"
            hasDropdown={true}
            isExpanded={expandedMenus.helpOrSupport && !isCollapsed}
            onToggle={() => toggleMenu("helpOrSupport")}
            subItems={helpOrSupportSubItems}
            isCollapsed={isCollapsed}
          />
          {/* <ModifiedSidebarNavItemMUI
            icon={<ProjectsIcon sx={{ width: 24, height: 24 }} />}
            label="Projects"
            hasDropdown={true}
            isExpanded={expandedMenus.projects && !isCollapsed}
            onToggle={() => toggleMenu("projects")}
            subItems={projectsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<AnalyticsIcon sx={{ width: 24, height: 24 }} />}
            label="Analytics"
            hasDropdown={true}
            isExpanded={expandedMenus.analytics && !isCollapsed}
            onToggle={() => toggleMenu("analytics")}
            subItems={analyticsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<CustomersIcon sx={{ width: 24, height: 24 }} />}
            label="Customers"
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<OrdersIcon sx={{ width: 24, height: 24 }} />}
            label="Orders"
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<MessagesIcon sx={{ width: 24, height: 24 }} />}
            label="Messages"
            notificationCount={5}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<TrendsIcon sx={{ width: 24, height: 24 }} />}
            label="Trends"
            hasDropdown={true}
            isExpanded={expandedMenus.trends && !isCollapsed}
            onToggle={() => toggleMenu("trends")}
            subItems={trendsSubItems}
            isCollapsed={isCollapsed}
          />
          <ModifiedSidebarNavItemMUI
            icon={<SettingsIcon sx={{ width: 24, height: 24 }} />}
            label="Settings"
            hasDropdown={true}
            isExpanded={expandedMenus.settings && !isCollapsed}
            onToggle={() => toggleMenu("settings")}
            subItems={settingsSubItems}
            isCollapsed={isCollapsed}
          /> */}
        </Box>
        {!isCollapsed && (
          <SidebarUserProfileMUI
            initials="AJ"
            name="Alex Johnson"
            email="alex.johnson@example.com"
          />
        )}
        {isCollapsed && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "69px",
              borderTop: "1px solid #E5E7EB",
            }}
          >
            <Tooltip title="Alex Johnson" placement="right">
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  color: "#000",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "16px",
                  backgroundColor: "#F5F5F5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                AJ
              </Box>
            </Tooltip>
          </Box>
        )}
      </Box>
    </>
  );
};

export default SidebarMUIV2;
