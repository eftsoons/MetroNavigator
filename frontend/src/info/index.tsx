import Bank from "@/svg/bank";
import Coffee from "@/svg/coffee";
import Battery from "@/svg/battery";
import Candy from "@/svg/candy";
import Carrier from "@/svg/carrier";
import Elevator from "@/svg/elevator";
import Flowers from "@/svg/flowers";
import Vending from "@/svg/vending";
import Toilet from "@/svg/toilet";
import Theatre from "@/svg/theatre";
import Sales from "@/svg/sales";
import Food from "@/svg/food";
import Invalid from "@/svg/invalid";
import Optics from "@/svg/optics";
import Parking from "@/svg/parking";
import Print from "@/svg/print";
import Info from "@/svg/info";

const typefilter = [
  "BANK",
  "COFFEE",
  "SALES",
  "PARKING",
  "CANDY",
  "ELEVATOR",
  "BATTERY",
  "FOOD",
  "FLOWERS",
  "CARRIER",
  "VENDING",
  "INVALID",
  "TOILET",
  "INFO",
  "PRINT",
  "OPTICS",
  "THEATRE",
] as const;

const servicesfilterdata = {
  BANK: { text: "Bank", svg: <Bank /> },
  COFFEE: { text: "Coffee", svg: <Coffee /> },
  SALES: { text: "Sales", svg: <Sales /> },
  PARKING: { text: "Parking", svg: <Parking /> },
  CANDY: { text: "Candy", svg: <Candy /> },
  ELEVATOR: { text: "Elevator", svg: <Elevator /> },
  BATTERY: { text: "Battery", svg: <Battery /> },
  FOOD: { text: "Food", svg: <Food /> },
  FLOWERS: { text: "Flowers", svg: <Flowers /> },
  CARRIER: { text: "Carrier", svg: <Carrier /> },
  VENDING: { text: "Vending", svg: <Vending /> },
  INVALID: { text: "Invalid", svg: <Invalid /> },
  TOILET: { text: "Toilet", svg: <Toilet /> },
  INFO: { text: "Info", svg: <Info /> },
  PRINT: { text: "Print", svg: <Print /> },
  OPTICS: { text: "Optics", svg: <Optics /> },
  THEATRE: { text: "Theatre", svg: <Theatre /> },
};

export { servicesfilterdata, typefilter };
