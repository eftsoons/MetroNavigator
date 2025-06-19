type AllMetro = "mos" | "sbp";

type servicesstation = Array<
  | "BANK"
  | "COFFEE"
  | "SALES"
  | "PARKING"
  | "CANDY"
  | "ELEVATOR"
  | "BATTERY"
  | "FOOD"
  | "FLOWERS"
  | "CARRIER"
  | "VENDING"
  | "INVALID"
  | "TOILET"
  | "INFO"
  | "PRINT"
  | "OPTICS"
  | "THEATRE"
>;

type notifications = Array<{
  alternativeConnections: Array<string>;
  connections: Array<string>;
  description: { ru?: string; en?: string };
  endDate: string;
  hiddenEndDate: boolean;
  id: number;
  image: { ru?: string; en?: string };
  lines: Array<{
    allStationsClosed: boolean;
    icon: string;
    id: number;
    name: string;
    ordering: number;
  }>;
  startDate: string;
  stations: Array<{
    description: { ru?: string; en?: string };
    stationId: number;
    status: string;
    title: { ru?: string; en?: string };
  }>;
  title: { ru?: string; en?: string };
  transitions: Array<string>;
}> | null;

type scheduleday = {
  dayType: string;
  first: string;
  last: string;
  stationToId: number;
  stationToName: string;
  weekend: boolean;
};

type station = {
  accessibilityImages: Array<{}>;
  audios: Array<{}>;
  buildingImages: Array<{}>;
  enterTime: number;
  exitTime: number;
  exits: Array<{
    bus: string;
    exitNumber: number;
    location: { lat: number; lon: number };
    title: { ru: string; en?: string };
    tram: null;
    trolleybus: null;
  }>;
  history: null;
  id: number;
  lineId: number;
  location: { lat: number; lon: number };
  name: { ru: string; en?: string };
  ordering: number;
  outside: null;
  perspective: boolean;
  scheduleTrains: {
    [key: number]: Array<scheduleday>;
  };
  schemes: Array<string>;
  services: servicesstation;
  stationSvg: { svg: string; x: number; y: number };
  tapSvg: { x: number; y: number; h: number; w: number };
  textSvg: { x: number; y: number; svg: string; w: number; h: number };
  workTime: Array<{ open: string; close: NumberConstructor }>;
};

type line = {
  color: string;
  icon: string;
  id: number;
  name: { ru: string; en?: string };
  neighboringLines: Array<{}>;
  ordering: number;
  perspective: boolean;
  stationEndId: number;
  stationStartId: number;
  textStart: { ru: string; en?: string };
  textEnd: { ru: string; en?: string };
};

type connect = {
  bi: boolean;
  closedBackward: null;
  id: number;
  pathLength: number;
  perspective: boolean;
  stationFromId: number;
  stationToId: number;
  svg: string;
};

type schema = {
  height: number;
  width: number;
  additional: Array<{ id: string; svg: string }>;
  connections: Array<connect>;
  lines: Array<line>;
  stations: Array<station>;
  transitions: Array<{
    bi: boolean;
    ground: boolean;
    id: number;
    pathLength: number;
    perspective: boolean;
    stationFromId: number;
    stationToId: number;
    svg: string;
    videoFrom: null;
    videoTo: null;
    wagons: Array<{
      stationPrevId: number;
      stationToId: number;
      types: Array<string>;
    }>;
  }>;
} | null;

type route = {
  nodes: Array<number>;
  time: number;
  transfers: number;
};

type User = {
  ref: string;
  telegram_id: BigInt;
  vk_id: BigInt;
  countroutes: number;
  first_name: string;
  last_name: string;
  username: string;
  photo: string;
  myref: number;
  showtop: number;
  refcount: number;
  time: number;
  last_time: number | null;
  filterbank: number;
  filtercoffee: number;
  filtersales: number;
  filterparking: number;
  filtercandy: number;
  filterelevator: number;
  filterbattery: number;
  filterfood: number;
  filterflowers: number;
  filtercarrier: number;
  filtervending: number;
  filterinvalid: number;
  filtertoilet: number;
  filterinfo: number;
  filterprint: number;
  filteroptics: number;
  filtertheatre: number;
  typenodes: number;
  favoritessave: string;
  routesave: string;
};

type top = {
  route: Array<User>;
  time: Array<User>;
  ref: Array<User>;
};

type FilterKeys = servicesstation[number];

type filterstation = {
  [K in FilterKeys]: boolean;
};

type GlobalInfo = {
  info: {
    [key in AllMetro]: {
      schema: schema;
      notifications: notifications;
      routes: Map<string, route>;
    };
  };
  countuser: number;
};

type RouteProfile = {
  [key in AllMetro]: Array<{ start: number; end: number }>;
};

export type {
  schema,
  notifications,
  route,
  User,
  top,
  filterstation,
  GlobalInfo,
  AllMetro,
  RouteProfile,
};
