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

const servicesfilterdata = {
  BANK: { text: "Банкоматы", svg: <Bank /> },
  COFFEE: { text: "Кофе", svg: <Coffee /> },
  SALES: { text: "Торговые точки", svg: <Sales /> },
  PARKING: { text: "Перехватывающая парковка", svg: <Parking /> },
  CANDY: { text: "Продажа кондитерских изделий", svg: <Candy /> },
  ELEVATOR: { text: "Лифт на станции", svg: <Elevator /> },
  BATTERY: { text: "Зарядка для мобильных устройств", svg: <Battery /> },
  FOOD: { text: "Общепит", svg: <Food /> },
  FLOWERS: { text: "Цветы", svg: <Flowers /> },
  CARRIER: { text: "Салон сотовой связи", svg: <Carrier /> },
  VENDING: { text: "Вендинг", svg: <Vending /> },
  INVALID: { text: "Поддержка маломобильных пассажиров", svg: <Invalid /> },
  TOILET: { text: "Туалет", svg: <Toilet /> },
  INFO: { text: "Стойка «Живое общение»", svg: <Info /> },
  PRINT: { text: "Печать", svg: <Print /> },
  OPTICS: { text: "Салон оптики", svg: <Optics /> },
  THEATRE: { text: "Продажа билетов в театры", svg: <Theatre /> },
};

export { servicesfilterdata };
