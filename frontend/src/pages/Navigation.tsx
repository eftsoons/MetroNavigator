import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Store, node, route, routesave } from "@/type";
import Reload from "./Reload";

import { Page } from "@/components/PageOpacity";

import SearchStation from "../components/Schema/Map/SearchStation";
import axios from "axios";
import InfoNodes from "@/components/Schema/Info/InfoNodes";
import "@/components/Button";
import {
  setsaveroutes,
  setnodes,
  setselectnode,
  setAstation,
  setBstation,
} from "@/redux/info";
import { fetchUser, setuserroutesave } from "@/redux/userinfo";
import { AppDispatch } from "@/redux";
import { getSchema } from "@/redux/schema";
import { getNotifications } from "@/redux/notifications";

import SettingsMap from "@/components/Schema/Settings/SettingsMap";
import Position from "@/components/Schema/Map/Position";
import InfoStation from "@/components/Schema/Info/InfoStation";
import Info from "@/components/Schema/Map/Info";

import Maps from "@/components/Schema/Map/Maps";
import SetRegion from "@/components/Schema/Map/SetRegion";

const Navigation = memo(() => {
  const [opennodes, setopennodes] = useState(false);
  const [openerrorroute, setopenerrorroute] = useState(false);

  const schema = useSelector((data: Store) => data.schema);
  const notifications = useSelector((data: Store) => data.notifications);
  const filter = useSelector((data: Store) => data.userinfo.filter);
  const Astation = useSelector((data: Store) => data.info.Astation);
  const Bstation = useSelector((data: Store) => data.info.Bstation);
  const typenodes = useSelector((data: Store) => data.userinfo.typenodes);
  const saveroutes = useSelector((data: Store) => data.info.saveroutes);
  const nodes = useSelector((data: Store) => data.info.nodes);
  const region = useSelector((data: Store) => data.info.region);
  const raw = useSelector((data: Store) => data.platform.raw);
  const TypePlatform = useSelector((data: Store) => data.platform.TypePlatform);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (region) {
      !filter && dispatch(fetchUser());
      !schema && dispatch(getSchema());
      !notifications && dispatch(getNotifications());
    }
  }, [region]);

  const handleroute = (a: number, b: number) => {
    axios
      .post(
        `${import.meta.env.VITE_API_URL}/routes`,
        { A: a, B: b },
        {
          headers: {
            authorization: raw,
            platform: TypePlatform,
            region: region,
          },
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
              const node: node = {
                infonode: [],
                svg: [],
                time: routes.time,
                transfer: routes.transfers,
              };

              for (let i = 0; i < routes.nodes.length; i++) {
                const station = schema?.stations.find(
                  (data) => data.id == routes.nodes[i]
                );

                const line = schema?.lines.find(
                  (dataline) => dataline.id == station?.lineId
                );

                const lastindex = node.infonode.length - 1;

                if (station && line) {
                  const StationNotifications = notifications
                    ? notifications.filter((data) =>
                        data.stations.some(
                          (data) => data.stationId == station.id
                        )
                      )
                    : [];

                  if (routes.nodes[i + 1]) {
                    const connect = schema?.connections?.find(
                      (data) =>
                        (data.stationFromId == routes.nodes[i + 1] &&
                          data.stationToId == routes.nodes[i]) ||
                        (data.stationFromId == routes.nodes[i] &&
                          data.stationToId == routes.nodes[i + 1])
                    );

                    const transfer = schema?.transitions?.find(
                      (data) =>
                        (data.stationFromId == routes.nodes[i] &&
                          data.stationToId == routes.nodes[i + 1]) ||
                        (data.stationFromId == routes.nodes[i + 1] &&
                          data.stationToId == routes.nodes[i])
                    );

                    if (connect) {
                      node.svg.push(connect.svg);

                      if (
                        lastindex != -1 &&
                        node.infonode[lastindex].type == "connect"
                      ) {
                        node.infonode[lastindex].pathLength +=
                          connect.pathLength;
                        node.infonode[lastindex].station.push(station);
                        node.infonode[lastindex].notifications.push(
                          ...StationNotifications
                        );
                      } else {
                        node.infonode.push({
                          type: "connect",
                          line: line,
                          station: [station],
                          pathLength: connect.pathLength,
                          wagon: undefined,
                          notifications: StationNotifications,
                        });
                      }
                    } else {
                      if (transfer) {
                        const wagon = transfer.wagons.find(
                          (data) =>
                            (data.stationPrevId == routes.nodes[i + 1] &&
                              data.stationToId == routes.nodes[i - 1]) ||
                            (data.stationPrevId == routes.nodes[i - 1] &&
                              data.stationToId == routes.nodes[i + 1])
                        );

                        if (
                          lastindex != -1 &&
                          node.infonode[lastindex].type == "connect"
                        ) {
                          node.infonode[lastindex].wagon = wagon;

                          node.infonode[lastindex].station.push(station);

                          node.infonode[lastindex].notifications.push(
                            ...StationNotifications
                          );

                          node.infonode.push({
                            type: "transfer",
                            pathLength: transfer.pathLength,
                          });

                          node.svg.push(transfer.svg);
                        } else {
                          node.svg.push(transfer.svg);

                          node.infonode.push({
                            type: "connect",
                            line: line,
                            station: [station],
                            pathLength: 0,
                            wagon: undefined,
                            notifications: StationNotifications,
                          });

                          node.infonode.push({
                            type: "transfer",
                            pathLength: transfer.pathLength,
                          });
                        }
                      }
                    }
                  } else {
                    if (
                      lastindex != -1 &&
                      node.infonode[lastindex].type == "connect"
                    ) {
                      node.infonode[lastindex].station.push(station);

                      node.infonode[lastindex].notifications.push(
                        ...StationNotifications
                      );
                    } else {
                      node.infonode.push({
                        type: "connect",
                        line: line,
                        station: [station],
                        pathLength: 0,
                        wagon: undefined,
                        notifications: StationNotifications,
                      });
                    }
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

            dispatch(setnodes(nodessort));
            dispatch(setselectnode(0));
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

    dispatch(setnodes(nodessort));
    dispatch(setselectnode(0));
  }, [typenodes]);

  useEffect(() => {
    if (Astation && Bstation) {
      if (!saveroutes.hasOwnProperty(`${Astation}-${Bstation}`)) {
        handleroute(Astation, Bstation);
      } else {
        dispatch(setnodes(saveroutes[`${Astation}-${Bstation}`]));
        setopennodes(false);
        dispatch(setselectnode(0));
      }
    } else {
      setopennodes(false);
    }
  }, [Astation, Bstation]);

  const searchstation = useSelector((data: Store) => data.info.searchstation);

  return filter && schema && notifications ? (
    <>
      <Page className="h-full">
        <Maps />
        <Position />
        <SetRegion />
        <Info openerrorroute={openerrorroute} setopennodes={setopennodes} />
      </Page>
      <SettingsMap />
      {searchstation && <SearchStation />}
      <InfoStation />
      <InfoNodes
        opennodes={opennodes}
        openerrorroute={openerrorroute}
        nodesrouteback={() => {
          setopennodes(false);
        }}
        errorrouteback={() => {
          dispatch(setAstation(null));
          dispatch(setBstation(null));

          setopenerrorroute(false);
        }}
        reloadnodes={() =>
          Astation && Bstation && handleroute(Astation, Bstation)
        }
      />
    </>
  ) : (
    <Reload />
  );
});

export default Navigation;
