import { AllMetro } from "../type";

function IsCheckRegion(checktype: unknown): checktype is AllMetro {
  return checktype == "mos" || checktype == "sbp";
}

export default IsCheckRegion;
