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

type TypeAllPlatfrom = "tg" | "vk" | "web";

type FilterKeys = servicesstation[number];

type filterstation = {
  [K in FilterKeys]: boolean;
};

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

type coordmap = {
  iscenter: boolean;
  previousScale?: number;
  scale?: number;
  positionX?: number;
  positionY?: number;
};

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
    title: { ru: string; en: string };
    tram: null;
    trolleybus: null;
  }>;
  history: null;
  id: number;
  lineId: number;
  location: { lat: number; lon: number };
  name: { ru: string; en: string };
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
  workTime: Array<{ open: string; close: string }>;
};

type line = {
  color: string;
  icon: string;
  id: number;
  name: { ru: string; en: string };
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

type transitions = {
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
  wagons: Array<wagontransitions>;
};

type wagontransitions = {
  stationPrevId: number;
  stationToId: number;
  types: Array<string>;
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
    wagons: Array<wagontransitions>;
  }>;
};

type myUser = {
  ref: Array<{
    first_name: string;
    last_name: string | null;
    photo: string | null;
    username: string | null;
  }>;
  telegram_id: BigInt;
  countroutes: number;
  first_name: string;
  last_name: string;
  username: string;
  photo: string;
  showtop: boolean;
  refcount: number;
  time: number;
  filter: filterstation;
  typenodes: number;
  loaded: true;
  favoritessave: Array<number>;
  routesave: Array<{ start: number; end: number }>;
};

type User = {
  telegram_id: BigInt;
  countroutes: number;
  first_name: string;
  last_name: string;
  username: string;
  photo: string;
  time: number;
  refcount: number;
};

type top = {
  route: { place: number; place2: number; users: Array<User> };
  time: { place: number; place2: number; users: Array<User> };
  ref: { place: number; place2: number; users: Array<User> };
  showtop: boolean;
};

type routesave = Array<{ start: number; end: number }>;

type Store = {
  schema: schema | null;
  notifications: notifications | null;
  userinfo:
    | {
        loaded: false;
        showtop: boolean;
        filter: filterstation;
        typenodes: number;
        time: number;
        favoritessave: Array<number>;
        routesave: routesave;
      }
    | myUser;
  top: null | top;
  info: {
    coordmap: coordmap;
    saveroutes: { [key: string]: nodes };
    swiperindex: number;
    Astation: null | number;
    Bstation: null | number;
    timeouterror: Boolean;
    snackbar: null | {
      title?: string;
      text?: string;
      icon?: "copy";
      onClick?: () => void;
      onExit?: () => void;
      time: number;
    };
    region: null | "mos" | "sbp";
    infostation: null | Array<{ station: station; line: line }>;
    infoselectstation: number;
    searchstation: null | "A" | "B";
    nodes: nodes;
    selectnode: number;
    activestation: string[];
    openmenucity: boolean;
  };
  schemaimg: { img: null | string };
  platform: {
    TypePlatform: "tg" | "vk" | "web" | null;
    AppPlatform: string;
    raw: string | null;
    isDark: boolean;
    user: {
      first_name: string;
      id: number;
      last_name?: string;
      language_code?: string;
      photo_url?: string;
      username?: string;
    } | null;
    startParam: string | null;
    offbackfunction?: () => void;
    ref: number | null;
  };
};

type wagon = {
  arrivalTime: number;
  id: string;
  nextStation: number;
  prevStation: number;
  trainIndex: number;
  way: number;
  wagons: { [key: number]: "low" | "medium" | "mediumHigh" | "High" };
};

type wagons = {
  [key: number]: Array<wagon>;
};

type connectinfo = {
  connect: connect;
  direction: "next" | "back";
  station: station | undefined;
  wagon: wagon | null;
};

type node = {
  infonode: {
    station: Array<{
      station: station;
    }>;
    line: Array<
      | { type: "line"; line: line; pathLength: number }
      | {
          type: "transfer";
          wagon?: wagontransitions;
          pathLength: number;
        }
    >;
  };
  time: number;
  transfer: number;
  svg: Array<string>;
};

type nodes = Array<node>;

type route = Array<{
  nodes: Array<number>;
  time: number;
  transfers: number;
}>;

export type {
  filterstation,
  schema,
  Store,
  servicesstation,
  FilterKeys,
  station,
  notifications,
  line,
  connect,
  wagons,
  transitions,
  wagon,
  connectinfo,
  scheduleday,
  nodes,
  node,
  route,
  User,
  routesave,
  wagontransitions,
  TypeAllPlatfrom,
};
