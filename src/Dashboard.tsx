import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme } from "@mui/material/styles";
import DescriptionIcon from "@mui/icons-material/Description";
import FolderIcon from "@mui/icons-material/Folder";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useDemoRouter } from "@toolpad/core/internal";
import Areachart from "./charts/AreaChart";
import Piechart from "./charts/Piechart";
import DashboardChart from "./DashboardChart";
import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import { ApiData } from "./interface";
import { Switch } from "@mui/material";

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
  console.log(apiData,"2");
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
      {/* <div>{pathname === "/dashboard" ? "Dashboard" : pathname === "/analytics/pie-charts" ? "Analytics(Pie chart)":pathname === "/analytics/area-charts" ?"Analytics(Area chart)":""}
      </div> */}
      {error ? (
        "Error in Fetching Data"
      ) : pathname === "/dashboard" ? (
        <div >
        <div style={{ position: "relative",padding:"18px 0px" }}>
          
        <div style={{position:"absolute", top:"-33px",left:"50px"}}><h2>Dashboard</h2></div>
          <div style={{ position: "absolute", top: "-16px", right: "37px" }}>
            <span>Analytics Mode</span>
            <Switch
              checked={analyticsEnabled}
              onChange={() => setAnalyticsEnabled(!analyticsEnabled)}
            />
          </div>
          </div>
          {/* {!analyticsEnabled && */}
           {/* <DashboardChart apiData={apiData} /> */}
           {/* } */}
          {/* {analyticsEnabled ? (
            <>
              {" "}
              <Piechart apiData={apiData} />
              <Areachart apiData={apiData} />{" "}
            </>
          ): */}
           <DashboardChart apiData={apiData} analyticsEnabled={analyticsEnabled} />
           {/* } */}
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
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function DashboardLayoutNavigationNested(props: DemoProps) {
  const { window } = props;

  const router = useDemoRouter("/dashboard");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;
  const [apiData, setApiData] = useState<any>(
   null);
  const [error, setError] = useState<any>(false);
  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "https://d29l1nxcqevrmo.cloudfront.net/dashboard"
      );
    

      return response.data;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(true);
      return null;
    }
  };

  const getDashboardData = useCallback(async () => {
    const data = await fetchDashboardData();
    console.log(data,"data");
    
    if(data.statusCode===200){
    setApiData(data?.data)
    }
    else{
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
      window={demoWindow}
    >
      <DashboardLayout>
        <DemoPageContent
          pathname={router.pathname}
          error={error}
          apiData={apiData}
        />
      </DashboardLayout>
    </AppProvider>
    // preview-end
  );
}
