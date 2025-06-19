import { AppDispatch } from "@/redux";
import { setactivestation, setcoord } from "@/redux/info";

import { backfunctiondeletedall } from "@/redux/platform";

import { Store } from "@/type";
import { postEvent } from "@telegram-apps/sdk-react";
import {
  cloneElement,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ReactZoomPanPinchRef,
  TransformComponent,
  TransformWrapper,
} from "react-zoom-pan-pinch";

import { servicesfilterdata } from "@/info";

import ReactDOMServer from "react-dom/server";
import IconInfo from "./IconInfo";
import IconMap from "./IconMap";

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

const Map = memo(() => {
  const [iconzone, seticonzone] = useState<Array<string>>([]);

  const dispatch = useDispatch<AppDispatch>();

  const schema = useSelector((data: Store) => data.schema);
  const schemaimg = useSelector((data: Store) => data.schemaimg.img);
  const notifications = useSelector((data: Store) => data.notifications);
  const coordmap = useSelector((data: Store) => data.info.coordmap);
  const filter = useSelector(
    (data: Store) => data.userinfo.loaded && data.userinfo.filter
  );
  const nodes = useSelector((data: Store) => data.info.nodes);
  const infostation = useSelector((data: Store) => data.info.infostation);
  const selectinfostation = useSelector(
    (data: Store) => data.info.infoselectstation
  );
  const selectnode = useSelector((data: Store) => data.info.selectnode);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  const mapactivestation = useRef(null);
  const savecoord = useRef<{ x?: number; y?: number; active: boolean }>({
    active: true,
  });
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const statemap = useRef<{
    iscenter: boolean;
    previousScale?: number;
    scale?: number;
    positionX?: number;
    positionY?: number;
  }>(coordmap);

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

  useEffect(() => {
    let timeout = null as null | NodeJS.Timeout;
    let timeout2 = null as null | NodeJS.Timeout;

    if (
      nodes &&
      (selectnode || selectnode == 0) &&
      nodes[selectnode] &&
      nodes[selectnode].svg
    ) {
      dispatch(setactivestation(nodes[selectnode].svg));

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

      const ErrorStation = arrayerrorstation
        .map((stationID) => {
          const station = schema.stations.find(
            (data2) => data2.id == stationID
          );

          if (station) {
            const { x, y } = station.stationSvg;

            return ReactDOMServer.renderToStaticMarkup(
              <g x={x} y={y} transform={`translate(${x - 11.5}, ${y - 11.5})`}>
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
              </g>
            );
          } else {
            return null;
          }
        })
        .filter(Boolean) as string[];

      seticonzone([...(filterstation ? filterstation : []), ...ErrorStation]);
    }
  }, [notifications, filter, schema?.stations]);

  useEffect(() => {
    if (
      infostation &&
      infostation[
        infostation.length > selectinfostation ? selectinfostation : 0
      ] &&
      infostation[
        infostation.length > selectinfostation ? selectinfostation : 0
      ].station
    ) {
      const id =
        infostation[
          infostation.length > selectinfostation ? selectinfostation : 0
        ].station.id;

      const element = document.querySelector(`#station-${id}`) as HTMLElement;

      if (transformRef.current && element) {
        transformRef.current.zoomToElement(element, 6);
      }
    } else {
      dispatch(backfunctiondeletedall());
    }
  }, [infostation, schema, schemaimg]);

  useEffect(() => {
    if (TypePlatform == "tg") {
      postEvent("web_app_setup_swipe_behavior", {
        allow_vertical_swipe: false,
      });
    }
    return () => {
      if (TypePlatform == "tg") {
        postEvent("web_app_setup_swipe_behavior", {
          allow_vertical_swipe: true,
        });
      }
      dispatch(setcoord(statemap.current));
    };
  }, []);

  return (
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
        <IconMap
          schemaimg={schemaimg}
          savecoord={savecoord}
          iconzone={iconzone}
        />
        <IconInfo
          mapactivestation={mapactivestation}
          arrayerrorstation={arrayerrorstation}
        />
      </TransformComponent>
    </TransformWrapper>
  );
});

export default Map;
