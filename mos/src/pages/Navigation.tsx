import React, {
  cloneElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

import { Store, line, station, nodes, node, route, routesave } from "@/type";
import Reload from "./Reload";

import { Page } from "@/components/PageOpacity";

import Settings from "@/svg/settings";
import Filter from "@/svg/filter";
import { servicesfilterdata } from "@/info";
import ServicesFilter from "./ServicesFilter";
import SettignsNodes from "./SettingsNodes";
import Switch from "@/svg/switch";
import SearchStation from "./SearchStation";
import StationInput from "@/components/Stationinput";
import axios from "axios";
import {
  initData,
  miniApp,
  postEvent,
  retrieveLaunchParams,
  shareURL,
  useSignal,
} from "@telegram-apps/sdk-react";
import Station from "@/components/Station";
import InfoStation from "./InfoStation";
import PageAnimation from "@/components/PageAnimation";
import InfoNodes from "./InfoNodes";
import CloseSVG from "@/svg/close";
import Button from "@/components/Button";
import {
  setAstation,
  setBstation,
  setcoord,
  setsaveroutes,
  setsnackbar,
} from "@/redux/info";
import { fetchUser, setuserroutesave } from "@/redux/userinfo";
import { AppDispatch } from "@/redux";
import { getSchema } from "@/redux/schema";
import { getNotifications } from "@/redux/notifications";

import ReactDOMServer from "react-dom/server";
import Copy from "@/function/Copy";

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

function Navigation() {
  const raw = useSignal(initData.raw);
  const isDark = useSignal(miniApp.isDark);
  const startParam = useSignal(initData.startParam);

  const launchparams = retrieveLaunchParams();

  const [servicesfiler, setservicesfiler] = useState(false);
  const [settingsnodes, setsettingsnodes] = useState(false);
  const [searchstation, setsearchstation] = useState<null | "A" | "B">(null);
  const [infostation, setinfostation] = useState<null | Array<{
    station: station;
    line: line;
  }>>(null);
  const [selectinfostation, setinfoselectstation] = useState(0);

  const [activestation, setactivestation] = useState<Array<string>>([]);
  const [iconzone, seticonzone] = useState<Array<string>>([]);

  const [nodes, setnodes] = useState<nodes>([]);
  const [selectnode, setselectnode] = useState<number>(0);
  const [opennodes, setopennodes] = useState(false);
  const [openerrorroute, setopenerrorroute] = useState(false);
  const [schemaimg, setschemaimg] = useState<string | null>(null);

  const schema = useSelector((data: Store) => data.schema);
  const schemaimgdark = useSelector((data: Store) => data.schemaimg.schemadark);
  const schemaimglight = useSelector(
    (data: Store) => data.schemaimg.schemalight
  );
  const notifications = useSelector((data: Store) => data.notifications);
  const coordmap = useSelector((data: Store) => data.info.coordmap);
  const filter = useSelector(
    (data: Store) => data.userinfo.loaded && data.userinfo.filter
  );
  const Astation = useSelector((data: Store) => data.info.Astation);
  const Bstation = useSelector((data: Store) => data.info.Bstation);
  const typenodes = useSelector(
    (data: Store) => data.userinfo.loaded && data.userinfo.typenodes
  );
  const saveroutes = useSelector((data: Store) => data.info.saveroutes);

  const dispatch = useDispatch<AppDispatch>();

  const statemap = useRef<{
    iscenter: boolean;
    previousScale?: number;
    scale?: number;
    positionX?: number;
    positionY?: number;
  }>(coordmap);

  const savecoord = useRef<{ x?: number; y?: number; active: boolean }>({
    active: true,
  });

  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const mapactivestation = useRef(null);

  const height = schema?.height;
  const width = schema?.width;

  const arrayerrorstation = useMemo(
    () => [
      ...new Set(
        notifications?.flatMap((data) =>
          data.stations.map((data) => data.stationId)
        )
      ),
    ],
    [notifications]
  );

  const connections = useMemo(
    () => schema?.connections.map((data) => data),
    [schema?.connections]
  );

  const transitions = useMemo(
    () => schema?.transitions.map((data) => data),
    [schema?.transitions]
  );

  const { tapzone } = useMemo(() => {
    return {
      tapzone: schema?.stations.map((data, index) => (
        <rect
          onClick={(e) =>
            savecoord.current.active && handleclickrect(e, data.id)
          }
          key={index}
          width={data.tapSvg.w}
          height={data.tapSvg.h}
          x={data.tapSvg.x}
          y={data.tapSvg.y}
          style={{ pointerEvents: "all" }}
        />
      )),
    };
  }, [schema?.stations]);

  useEffect(() => {
    isDark ? setschemaimg(schemaimgdark) : setschemaimg(schemaimglight);
  }, [isDark, schemaimgdark, schemaimglight]);

  useEffect(() => {
    !filter && dispatch(fetchUser(raw));
    !schema && dispatch(getSchema(raw));
    !notifications && dispatch(getNotifications(raw));

    postEvent("web_app_setup_swipe_behavior", { allow_vertical_swipe: false });
    return () => {
      postEvent("web_app_setup_swipe_behavior", {
        allow_vertical_swipe: true,
      });
      dispatch(setcoord(statemap.current));
    };
  }, []);

  useEffect(() => {
    if (notifications && schema && filter) {
      const filterstation = schema?.stations
        .map((data) => {
          const filterdata = typefilter.filter(
            (s) => data.services.includes(s) && filter && filter[s]
          );

          const { x, y } = data.stationSvg;

          if (filterdata.length == 1) {
            const info = servicesfilterdata[filterdata[0]];
            const element = cloneElement(info.svg, { width: 23, height: 23 });

            return ReactDOMServer.renderToStaticMarkup(
              <g id={`icon-${data.id}`} key={`icon-${data.id}`} x={x} y={y}>
                <circle
                  fill="var(--primary-bg)"
                  stroke="var(--primary-text)"
                  cx={x}
                  cy={y}
                  r="13.5"
                  strokeWidth="1.5"
                />
                <g
                  width={23}
                  height={23}
                  transform={`translate(${x - 11.5}, ${y - 11.5})`}
                >
                  {element}
                </g>
              </g>
            );
          } else if (filterdata.length > 1) {
            return ReactDOMServer.renderToStaticMarkup(
              <g id={`icon-${data.id}`} key={`icon-${data.id}`} x={x} y={y}>
                <circle
                  cx={x}
                  cy={y}
                  r="13.5"
                  fill="var(--primary-text)"
                  stroke="var(--primary-bg)"
                  strokeOpacity="0.8"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y}
                  dy="0.1em"
                  fill="var(--primary-bg)"
                  fontSize="14"
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {filterdata.length}+
                </text>
              </g>
            );
          }
        })
        .filter(Boolean) as Array<string>;

      seticonzone([...(filterstation ? filterstation : [])]);
    }
  }, [notifications, filter, schema?.stations]);

  const handleroute = (a: number, b: number) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/routes`,
        { A: a, B: b },
        {
          headers: { authorization: raw },
        }
      )
      .then(
        (response: {
          data:
            | {
                process: true;
                routes: route;
                routesave: routesave;
              }
            | { process: false };
        }) => {
          if (response.data.process) {
            const nodes = response.data.routes.map((routes) => {
              const node = {
                infonode: { station: [], line: [] },
                svg: [],
                time: routes.time,
                transfer: routes.transfers,
              } as node;

              for (let i = 0; i < routes.nodes.length; i++) {
                const station = schema?.stations.find(
                  (data) => data.id == routes.nodes[i]
                ) as station;

                let lineindex = node.infonode.line.findIndex(
                  (data) =>
                    data.type == "line" && data.line.id == station.lineId
                );

                if (lineindex == -1) {
                  const line = schema?.lines.find(
                    (data) => data.id == station?.lineId
                  ) as line;

                  lineindex =
                    node.infonode.line.push({
                      type: "line",
                      line: line,
                      pathLength: 0,
                    }) - 1;
                }

                const connect = connections?.find(
                  (data) =>
                    (data.stationFromId == routes.nodes[i + 1] &&
                      data.stationToId == routes.nodes[i]) ||
                    (data.stationFromId == routes.nodes[i] &&
                      data.stationToId == routes.nodes[i + 1])
                );

                if (connect) {
                  node.svg.push(connect.svg);

                  node.infonode.station.push({
                    station: station,
                  });

                  node.infonode.line[lineindex].pathLength +=
                    connect.pathLength;
                } else {
                  if (!routes.nodes[i + 1]) {
                    const transferTo = transitions?.find(
                      (data) =>
                        data.stationFromId == routes.nodes[i] ||
                        data.stationToId == routes.nodes[i]
                    );

                    if (transferTo) {
                      node.infonode.station.push({
                        station: station,
                      });
                    }
                  } else {
                    const transfer = transitions?.find(
                      (data) =>
                        (data.stationFromId == routes.nodes[i] &&
                          data.stationToId == routes.nodes[i + 1]) ||
                        (data.stationFromId == routes.nodes[i + 1] &&
                          data.stationToId == routes.nodes[i])
                    );

                    if (transfer) {
                      node.svg.push(transfer.svg);

                      node.infonode.station.push({
                        station: station,
                      });

                      const wagon = transfer.wagons.find(
                        (data) =>
                          (data.stationPrevId == routes.nodes[i + 1] &&
                            data.stationToId == routes.nodes[i - 1]) ||
                          (data.stationPrevId == routes.nodes[i - 1] &&
                            data.stationToId == routes.nodes[i + 1])
                      );

                      node.infonode.line.push({
                        type: "transfer",
                        wagon: wagon,
                        pathLength: transfer.pathLength,
                      });
                    }
                  }
                }

                const stationicon = document.querySelector(
                  `#icon-${routes.nodes[i]}`
                );

                const stationerror = arrayerrorstation.some(
                  (data) => data == station.id
                );

                if (station) {
                  node.svg.push(station.stationSvg.svg, station.textSvg.svg);
                }

                if (stationicon) {
                  node.svg.push(stationicon.outerHTML);
                } else {
                  if (stationerror) {
                    node.svg.push(`<g
            x="${station.stationSvg.x}"
            y="${station.stationSvg.y}"
            transform="translate(${station.stationSvg.x - 11.5}, ${
                      station.stationSvg.y - 11.5
                    })"
          >
            <svg
                  width="23"
                  height="23"
                  viewBox="0 0 23 23"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="0.75"
                    y="0.75"
                    width="21.5"
                    height="21.5"
                    rx="10.25"
                    fill="var(--primary-bg)"
                    stroke="var(--primary-text)"
                    strokeWidth="1.5"
                  ></rect>
                  <path
                    d="M11.5638 11.217V7"
                    stroke="var(--primary-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5627 14.6053C11.407 14.6053 11.2808 14.7315 11.2819 14.8871C11.2819 15.0427 11.4082 15.169 11.5638 15.169C11.7194 15.169 11.8457 15.0427 11.8457 14.8871C11.8457 14.7315 11.7194 14.6053 11.5627 14.6053"
                    stroke="var(--primary-text)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
          </g>`);
                  }
                }
              }

              return node;
            });

            const nodessort = nodes.sort((a, b) => {
              if (
                ((a.transfer > b.transfer || a.time > b.time) &&
                  typenodes == 0) ||
                (a.time > b.time && typenodes == 1) ||
                (a.transfer > b.transfer && typenodes == 2)
              ) {
                return 1;
              } else {
                return -1;
              }
            });

            setnodes(nodessort);
            setselectnode(0);
            setopennodes(false);
            setopenerrorroute(false);

            dispatch(
              setsaveroutes({ name: `${Astation}-${Bstation}`, nodes: nodes })
            );

            dispatch(setuserroutesave(response.data.routesave));
          }
        }
      )
      .catch(() => {
        setopenerrorroute(true);
      });
  };

  useEffect(() => {
    const node = structuredClone(nodes);
    const nodessort = node.sort((a, b) => {
      if (
        ((a.transfer > b.transfer || a.time > b.time) && typenodes == 0) ||
        (a.time > b.time && typenodes == 1) ||
        (a.transfer > b.transfer && typenodes == 2)
      ) {
        return 1;
      } else {
        return -1;
      }
    });

    setnodes(nodessort);
    setselectnode(0);
  }, [typenodes]);

  useEffect(() => {
    let timeout = null as null | NodeJS.Timeout;
    let timeout2 = null as null | NodeJS.Timeout;
    if (
      nodes &&
      (selectnode || selectnode == 0) &&
      nodes[selectnode] &&
      nodes[selectnode].svg &&
      transformRef.current
    ) {
      setactivestation(nodes[selectnode].svg);

      timeout = setTimeout(() => {
        if (transformRef.current && mapactivestation.current) {
          transformRef.current.zoomToElement(
            mapactivestation.current,
            undefined,
            300
          );

          timeout2 = setTimeout(() => {
            if (transformRef.current) {
              transformRef.current.zoomOut(0.35);
              //мб снова переделать
            }
          }, 600);
        }
      }, 250);
    }

    return () => {
      timeout && clearTimeout(timeout);
      timeout2 && clearTimeout(timeout2);
    };
  }, [nodes, selectnode]);

  useEffect(() => {
    if (Astation && Bstation) {
      if (!saveroutes.hasOwnProperty(`${Astation}-${Bstation}`)) {
        handleroute(Astation, Bstation);
      } else {
        setnodes(saveroutes[`${Astation}-${Bstation}`]);
        setopennodes(false);
        setselectnode(0);
      }
    } else {
      setopennodes(false);
    }
  }, [Astation, Bstation]);

  useEffect(() => {
    if (infostation) {
      const id =
        infostation[
          infostation.length > selectinfostation ? selectinfostation : 0
        ].station.id;

      const element = document.querySelector(`#station-${id}`) as HTMLElement;

      if (transformRef.current && element) {
        transformRef.current.zoomToElement(element, 6);
      }
    }
  }, [infostation, schema, schemaimg]);

  useEffect(() => {
    if (startParam && transformRef.current) {
      const intervalid = setTimeout(() => {
        const startParams = JSON.parse(decodeURIComponent(atob(startParam)));

        if (startParams.stationA) {
          dispatch(setAstation(startParams.stationA));
        }

        if (startParams.stationB) {
          dispatch(setBstation(startParams.stationB));
        }

        if (startParams.station) {
          const station = schema?.stations.find(
            (data) => data.id == startParams.station
          ) as station;

          const line = schema?.lines.find(
            (data) => data.id == station.lineId
          ) as line;

          const stationall = schema?.stations
            ? schema.stations
                .filter(
                  (data) =>
                    data.name.ru == station.name.ru && data.id != station.id
                )
                .map((station) => {
                  const line = schema.lines.find(
                    (data) => data.id == station.lineId
                  ) as line;

                  return { station: station, line: line };
                })
            : [];

          setinfoselectstation(0);

          setinfostation([{ station: station, line: line }, ...stationall]);
        }
      }, 300);

      return () => clearInterval(intervalid);
    }
  }, [startParam, transformRef.current]);

  const handleclickrect = (
    e: React.MouseEvent<SVGRectElement, MouseEvent>,
    stationid: number
  ) => {
    const station = schema?.stations.find(
      (data) => data.id == stationid
    ) as station;

    const line = schema?.lines.find(
      (data) => data.id == station.lineId
    ) as line;

    const stationall = schema?.stations
      ? schema.stations
          .filter(
            (data) => data.name.ru == station.name.ru && data.id != station.id
          )
          .map((station) => {
            const line = schema.lines.find(
              (data) => data.id == station.lineId
            ) as line;

            return { station: station, line: line };
          })
      : [];

    e.stopPropagation();

    setinfoselectstation(0);

    setinfostation([{ station: station, line: line }, ...stationall]);
  };

  const handlestation = (stationId: number | null) => {
    if (searchstation == "A") {
      dispatch(setAstation(stationId));
    } else {
      dispatch(setBstation(stationId));
    }
  };

  const handleAstation = (stationId: number | null) => {
    dispatch(setAstation(stationId));
  };

  const handleBstation = (stationId: number | null) => {
    dispatch(setBstation(stationId));
  };

  return filter &&
    schema &&
    notifications &&
    connections &&
    transitions &&
    schemaimg ? (
    <>
      <Page className="h-full">
        <TransformWrapper
          ref={transformRef}
          initialScale={coordmap.iscenter ? 4 : coordmap.scale}
          minScale={1.25}
          maxScale={10}
          centerOnInit={coordmap.iscenter ? true : false}
          initialPositionX={coordmap.iscenter ? undefined : coordmap.positionX}
          initialPositionY={coordmap.iscenter ? undefined : coordmap.positionY}
          disablePadding
          wheel={{ smoothStep: 0.01 }}
          onTransformed={(e) => {
            statemap.current = { ...e.state, iscenter: false };
          }}
          onPanningStart={(e) => {
            if (e.instance.lastMousePosition) {
              savecoord.current = {
                ...e.instance.lastMousePosition,
                active: true,
              };
            }
          }}
          onPanningStop={(e) => {
            if (
              savecoord.current.x != e.instance.lastMousePosition?.x &&
              savecoord.current.y != e.instance.lastMousePosition?.y
            ) {
              savecoord.current = {
                ...e.instance.lastMousePosition,
                active: false,
              };
            }
          }}
        >
          <TransformComponent
            wrapperClass="h-full! w-full!"
            contentClass="h-full! w-full!"
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${width} ${height}`}
              className="absolute left-[0] top-[0] pointer-events-none"
            >
              <image
                id="image0"
                width={width}
                height={height}
                href={schemaimg}
              />
            </svg>
            <svg
              height="100%"
              width="100%"
              viewBox={`0 0 ${width} ${height}`}
              className="absolute left-[0] top-[0] pointer-events-none"
            >
              <g
                dangerouslySetInnerHTML={{
                  __html: (iconzone || []).join(""),
                }}
              />
            </svg>
            {tapzone && (
              <svg
                height="100%"
                width="100%"
                className="absolute top-[0] left-[0] pointer-events-auto"
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
                onClick={() => savecoord.current.active && setinfostation(null)}
              >
                {tapzone}
              </svg>
            )}
            {((Astation && Bstation) || infostation) && (
              <div className="absolute top-[0] left-[0] w-full h-full bg-[var(--primary-bg)] opacity-75 pointer-events-none" />
            )}
            {(activestation ||
              Astation ||
              Astation == 0 ||
              Bstation ||
              Bstation == 0 ||
              infostation) && (
              <svg
                height="100%"
                width="100%"
                className="absolute top-[0] left-[0] pointer-events-none"
                viewBox={`0 0 ${width} ${height}`}
                fill="none"
              >
                <g
                  ref={mapactivestation}
                  dangerouslySetInnerHTML={{
                    __html: activestation.join(""),
                  }}
                />
                {(Astation || Astation == 0) && (
                  <Station
                    stationid={Astation}
                    type="A"
                    arrayerrorstation={arrayerrorstation}
                  />
                )}
                {(Bstation || Bstation == 0) && (
                  <Station
                    stationid={Bstation}
                    type="B"
                    arrayerrorstation={arrayerrorstation}
                  />
                )}
                {infostation && (
                  <Station
                    stationid={
                      infostation[
                        infostation.length > selectinfostation
                          ? selectinfostation
                          : 0
                      ].station.id
                    }
                    type={Astation ? "B" : "A"}
                    arrayerrorstation={arrayerrorstation}
                  />
                )}
              </svg>
            )}
          </TransformComponent>
        </TransformWrapper>
        <div className="fixed top-[1rem] right-[1rem] flex bg-[var(--primary-color)] rounded-[10px] border-[2px] border-[var(--primary-border-color)] border-solid p-[6px]! gap-[8px]">
          <button
            onClick={() => setservicesfiler(true)}
            className="h-[35px] w-[35px]"
          >
            <Filter />
          </button>
          <button
            onClick={() => setsettingsnodes(true)}
            className="h-[35px] w-[35px]"
          >
            <Settings />
          </button>
        </div>
        <div
          className="fixed left-[50%] w-[95%] transform-[translate(-50%)] bottom-[80px] flex bg-[var(--primary-bg)] rounded-[10px] p-[6px]! gap-[10px] flex-col"
          style={{
            bottom: ["macos", "ios"].includes(launchparams.platform)
              ? "100px"
              : "80px",
          }}
        >
          <div className="flex w-full gap-[5px] ">
            <div className="flex gap-[5px] w-full overflow-hidden">
              <StationInput
                stationid={Astation}
                setstationid={(stationId) => {
                  dispatch(setAstation(stationId));
                }}
                type="A"
                onClick={() => setsearchstation("A")}
              />
              <StationInput
                stationid={Bstation}
                setstationid={(stationId) => {
                  dispatch(setBstation(stationId));
                }}
                type="B"
                onClick={() => setsearchstation("B")}
              />
            </div>
            <div className="flex gap-[10px]">
              <div className="h-full flex items-center">
                <button
                  onClick={() => {
                    const astation = Astation;
                    dispatch(setAstation(Bstation));
                    dispatch(setBstation(astation));
                  }}
                  className="w-[35px] h-[35px]"
                >
                  <Switch />
                </button>
              </div>
              {Astation && Bstation && (
                <div className="h-full flex items-center">
                  <button
                    onClick={() => {
                      dispatch(setAstation(null));
                      dispatch(setBstation(null));
                      setactivestation([]);
                      setnodes([]);
                    }}
                    className="w-[20px] h-[20px]"
                  >
                    <CloseSVG />
                  </button>
                </div>
              )}
            </div>
          </div>
          {!openerrorroute && Astation && Bstation && (
            <>
              <div className="flex gap-[8px]">
                <Button
                  onClick={() => {
                    Copy(
                      `https://t.me/MetroNavigatorBot/mos?startapp=${btoa(
                        encodeURIComponent(
                          JSON.stringify({
                            stationA: Astation,
                            stationB: Bstation,
                          })
                        )
                      )}`
                    );
                    dispatch(
                      setsnackbar({
                        time: 5000,
                        title: "Копирование",
                        text: `Вы успешно скопировали ссылку на маршрут: ${Astation}-${Bstation}`,
                        icon: "copy",
                      })
                    );
                  }}
                >
                  Скопировать
                </Button>
                <Button
                  onClick={() =>
                    shareURL(
                      `Московский метрополитен\n\nМаршрут: ${Astation}-${Bstation}\nСсылка: https://t.me/MetroNavigatorBot/mos?startapp=${btoa(
                        encodeURIComponent(
                          JSON.stringify({
                            stationA: Astation,
                            stationB: Bstation,
                          })
                        )
                      )}`
                    )
                  }
                >
                  Поделиться
                </Button>
              </div>
              <Button onClick={() => setopennodes(true)}>Подробнее</Button>
            </>
          )}
        </div>
      </Page>
      <PageAnimation
        open={servicesfiler}
        back={true}
        backfunction={() => setservicesfiler(false)}
        className="w-full h-full flex flex-col gap-[12px] z-1"
        backbuttondisabled={true}
      >
        <ServicesFilter backfunction={() => setservicesfiler(false)} />
      </PageAnimation>
      <PageAnimation
        open={settingsnodes}
        back={true}
        className="w-full h-full flex flex-col gap-[16px] z-1"
        backfunction={() => setsettingsnodes(false)}
        backbuttondisabled={true}
      >
        <SettignsNodes />
      </PageAnimation>
      <PageAnimation
        open={Boolean(searchstation)}
        back={true}
        backfunction={() => {
          setsearchstation(null);
        }}
        backbuttondisabled={true}
        className="w-full h-full flex flex-col gap-[12px] z-1"
      >
        <SearchStation
          backfunction={() => setsearchstation(null)}
          clickfunction={handlestation}
          astationid={Astation}
          bstationid={Bstation}
          handleAstation={handleAstation}
          handleBstation={handleBstation}
        />
      </PageAnimation>
      <PageAnimation
        open={Boolean(infostation)}
        backfunction={() => {
          setinfostation(null);
        }}
        className="h-auto!"
        contentheight={true}
        back={true}
        headeractive={true}
      >
        <InfoStation
          infostation={infostation}
          selectinfostation={selectinfostation}
          setinfoselectstation={(select) => setinfoselectstation(select)}
          backfunction={() => setinfostation(null)}
          handleAstation={handleAstation}
          handleBstation={handleBstation}
        />
      </PageAnimation>
      <PageAnimation
        open={(opennodes && !Boolean(infostation)) || openerrorroute}
        className="h-auto!"
        contentheight={true}
        backbuttondisabled={!openerrorroute}
        backfunction={() => {
          setopennodes(false);
          if (openerrorroute) {
            dispatch(setAstation(null));
            dispatch(setBstation(null));

            setopenerrorroute(false);
          }
        }}
        back={true}
        headeractive={true}
      >
        <InfoNodes
          setAstation={(stationId) => {
            dispatch(setAstation(stationId));
          }}
          setBstation={(stationId) => {
            dispatch(setBstation(stationId));
          }}
          setsearchAstation={() => setsearchstation("A")}
          setsearchBstation={() => setsearchstation("B")}
          Astation={Astation}
          Bstation={Bstation}
          nodes={nodes}
          selectnode={selectnode}
          setselectnode={setselectnode}
          backfunction={() => {
            setopennodes(false);
          }}
          openerrorroute={openerrorroute}
          reloadnodes={() =>
            Astation && Bstation && handleroute(Astation, Bstation)
          }
        />
      </PageAnimation>
    </>
  ) : (
    <Reload />
  );
}

export default Navigation;
