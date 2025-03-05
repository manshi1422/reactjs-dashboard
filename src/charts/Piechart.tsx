import { Grid2 } from "@mui/material";
import { useMemo } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";


const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const Piechart = ( data:any) => {
  const newUserData = useMemo(
    () =>
      data?.apiData
        ? [
            { name: "Today", value: data?.apiData.todaysUserAddition },
            {
              name: "Last 7 Days",
              value: data?.apiData.lastSevenDaysUserAddition,
            },
            {
              name: "Last 30 Days",
              value: data?.apiData.lastThirtyDaysUsersAddition,
            },
          ]
        : [],
    [data?.apiData]
  );

  const activeUserData = useMemo(
    () =>
      data?.apiData
        ? [
            { name: "Daily Active", value: data?.apiData.dailyActiveUsers },
            { name: "Weekly Active", value: data?.apiData.weeklyActiveUsers },
            { name: "Monthly Active", value: data?.apiData.monthlyActiveUsers },
          ]
        : [],
    [data?.apiData]
  );
  return (
   
    <>
    <h2>User Analytics (Pie Chart)</h2>
      <Grid2 container spacing={2} width={"100%"}>
        <Grid2 size={{xs:12,md:6 }}>
        <h2> New Users</h2>
          <ResponsiveContainer  height={300}>
            
            <PieChart>
              <Pie
                data={newUserData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
              >
                {newUserData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid2>
        <Grid2 size={{xs:12,md:6 }}>
        <h2>Active Users</h2>
          <ResponsiveContainer  height={300}>
            <PieChart>
              <Pie
                data={activeUserData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
              >
                {activeUserData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Grid2>
      </Grid2>
    </>
  );
};
export default Piechart;
