import * as React from "react";
import Box from "@mui/material/Box";
import { createTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Areachart from "./charts/AreaChart";
import Piechart from "./charts/Piechart";
import DashboardChart from "./charts/DashboardChart";
import { useCallback, useState } from "react";
import axios from "axios";
import { ApiData } from "./interface";
import { CircularProgress, Switch } from "@mui/material";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({
  pathname,
  error,
  apiData,
}: {
  pathname: string;
  error: boolean;
  apiData: ApiData;
}) {
  console.log(apiData, "2");
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      {""}

      {error ? (
        <div
          style={{
            display: "flex",
            height: "100vh",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Error in Fetching Data
        </div>
      ) : pathname === "/dashboard" ? (
        <div>
          <div style={{ position: "relative", padding: "18px 0px" }}>
            <div style={{ position: "absolute", top: "-33px", left: "50px" }}>
              <h2>Dashboard</h2>
            </div>
            <div style={{ position: "absolute", top: "-16px", right: "37px" }}>
              <span>Analytics Mode</span>
              <Switch
                checked={analyticsEnabled}
                onChange={() => setAnalyticsEnabled(!analyticsEnabled)}
              />
            </div>
          </div>

          <DashboardChart
            apiData={apiData}
            analyticsEnabled={analyticsEnabled}
          />
        </div>
      ) : pathname === "/analytics/pie-charts" ? (
        <Piechart apiData={apiData} />
      ) : pathname === "/analytics/area-charts" ? (
        <>
          <Areachart apiData={apiData} />
        </>
      ) : (
        ""
      )}
    </Box>
  );
}

interface DemoProps {
  window?: () => Window;
}

export default function DashboardLayoutNavigationNested(props: DemoProps) {
  const router = useDemoRouter("/dashboard");
  const [apiData, setApiData] = useState<any>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<any>(false);
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://d29l1nxcqevrmo.cloudfront.net/dashboard"
      );

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error fetching dashboard data:", error);
      setError(true);
      return null;
    }
  };

  const getDashboardData = useCallback(async () => {
    const data = await fetchDashboardData();
    console.log(data, "data");

    if (data.statusCode === 200) {
      setApiData(data?.data);
    } else {
      setError(true);
    }
  }, []);
  React.useEffect(() => {
    console.log("log from useffect");

    getDashboardData();
  }, []);

  console.log(apiData, "1");

  return (
    // preview-start
    <AppProvider
      branding={{
        title: "Dashboard",
        homeUrl: "/",
      }}
      navigation={[
        {
          segment: "dashboard",
          title: "Dashboard",
          icon: <DashboardIcon />,
        },
        {
          segment: "analytics",
          title: "Analytics",
          icon: <AnalyticsIcon />,
          children: [
            {
              segment: "pie-charts",
              title: "Pie-Charts",
              icon: <DescriptionIcon />,
            },
            {
              segment: "area-charts",
              title: "Area-Charts",
              icon: <DescriptionIcon />,
            },
          ],
        },
      ]}
      router={router}
      theme={demoTheme}
    >
      <DashboardLayout>
        {loading ? (
          <div
            style={{
              display: "flex",
              height: "100vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <DemoPageContent
            pathname={router.pathname}
            error={error}
            apiData={apiData}
          />
        )}
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
