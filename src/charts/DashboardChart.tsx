import { Stack, Switch } from "@mui/material";
import { ApiData } from "../interface";
import Piechart from "./Piechart";
import Areachart from "./AreaChart";

const DashboardChart = (props:{apiData:ApiData,analyticsEnabled:boolean}) => {

  return (
    <>
     
      <div style={{transition:"all 0.3s ease-in-out"}}>
      {props?.analyticsEnabled ? (
        <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        sx={{ flexWrap: "wrap", justifyContent: "center" }}
      >
          <Piechart apiData={props?.apiData} />
          <Areachart apiData={props?.apiData} />
        </Stack>
      ) : (
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          sx={{ flexWrap: "wrap", justifyContent: "center" }}
        >
          {props?.apiData!==null && Object.entries(props?.apiData).map(([key, value]) => (
            <>
              {!Array.isArray(value) && (
                <div
                  key={key}
                  style={{
                    padding: "15px",
                    border: "1px solid #ddd",
                    borderRadius: "10px",
                    background: "#f9f9f9",
                    textAlign: "center",
                    width: "200px",
                    height: "140px",
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "14px", color: "#555" }}>
                    {key
                      .replace(/([A-Z])/g, " $1")
                      .trim()
                      .toUpperCase()}
                  </h4>

                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#000000de",
                    }}
                  >
                    {value}
                  </p>
                </div>
              )}
            </>
          ))}
          <div
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#f9f9f9",
              textAlign: "center",
              width: "90%",
              height: "140px",
            }}
          >
            <h4 style={{ margin: 0, fontSize: "14px", color: "#555" }}>
              WITHDRAW DATA
            </h4>
            <ul style={{ textAlign: "left", paddingLeft: "20px" }}>
              {props?.apiData?.withdrawData.map((item:any, index:number) => (
                <li key={index} style={{
                  color: "#000000de"}}>
                  <strong>{item._id}:</strong> Amount: {item.totalAmount}, TDS:{" "}
                  {item.tdsAmount}, Count: {item.count}
                </li>
              ))}
            </ul>
          </div>
        </Stack>
      )}
      </div>
    </>
  );
};

export default DashboardChart;

