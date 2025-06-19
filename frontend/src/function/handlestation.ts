import { setAstation, setBstation } from "@/redux/info";
import { UnknownAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";

function handleStation(type: "A" | "B") {
  if (type == "A") {
    return (stationId: number | null, dispatch: Dispatch<UnknownAction>) => {
      dispatch(setAstation(stationId));
    };
  } else if (type == "B") {
    return (stationId: number | null, dispatch: Dispatch<UnknownAction>) => {
      dispatch(setBstation(stationId));
    };
  } else {
    return () => console.log("error");
  }
}

export default handleStation;
