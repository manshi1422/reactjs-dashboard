import  { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";



const Areachart = ( data:any) => {
  
   const areaData = useMemo(
      () =>
        data?.apiData
          ? [
              {
                name: "Deposits",
                Total: data?.apiData.totalDepositAmount,
                Admin: data?.apiData.totalAdminDepositAmount,
                Bonus: data?.apiData.totalAdminBonusAmount,
              },
              {
                name: "Admin Deposits",
                Total: 0,
                Admin: data?.apiData.totalAdminDepositAmount,
                Bonus: 0,
              },
              {
                name: "Admin Bonuses",
                Total: 0,
                Admin: 0,
                Bonus: data?.apiData.totalAdminBonusAmount,
              },
            ]
          : [],
      [data?.apiData]
    );
  return (
    <>
    <h2>Financial Analytics (Area Chart)</h2>
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={areaData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="Total" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="Admin" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="Bonus" stackId="1" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
    </>
  );
};

export default Areachart;
