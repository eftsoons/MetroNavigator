import GetStation from "@/function/GetStation";
import {
  setinfoselectstation,
  setinfostation,
  setopenmenucity,
} from "@/redux/info";
import { Store } from "@/type";
import { memo, MutableRefObject, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import ReplactTextTspan from "@/function/ReplaceTextTspan";

const IconMap = memo(
  ({
    schemaimg,
    savecoord,
    iconzone,
  }: {
    schemaimg: null | string;
    savecoord: MutableRefObject<{
      x?: number;
      y?: number;
      active: boolean;
    }>;
    iconzone: string[];
  }) => {
    const dispatch = useDispatch();

    const schema = useSelector((data: Store) => data.schema);
    const user = useSelector((data: Store) => data.userinfo.info);

    const height = schema?.height;
    const width = schema?.width;

    const tapzone = useMemo(() => {
      return schema?.stations.map((data, index) => (
        <rect
          onClick={(e) => {
            savecoord.current.active && handleclickrect(e, data.id);
            dispatch(setopenmenucity(false));
          }}
          key={index}
          width={data.tapSvg.w}
          height={data.tapSvg.h}
          x={data.tapSvg.x}
          y={data.tapSvg.y}
          style={{ pointerEvents: "all" }}
        />
      ));
    }, [schema?.stations]);

    const textSVG = useMemo(() => {
      return schema?.stations.map((data) =>
        ReplactTextTspan(
          data.textSvg.svg,
          data.name[user?.language_code == "ru" ? "ru" : "en"]
        )
      );
    }, [schema?.stations, user?.language_code]);

    const handleclickrect = (
      e: React.MouseEvent<SVGRectElement, MouseEvent>,
      stationid: number
    ) => {
      const info = GetStation(schema, stationid);

      e.stopPropagation();

      //setinfostation(null);

      //setTimeout(() => {
      dispatch(setinfoselectstation(0));

      dispatch(setinfostation(info));
      //}, 200);
    };

    return (
      <>
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
            href={schemaimg ? schemaimg : ""}
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
              __html: (textSVG || []).join(""),
            }}
          />
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
            onClick={() =>
              savecoord.current.active &&
              dispatch(setinfostation(null)) &&
              dispatch(setopenmenucity(false))
            }
          >
            {tapzone}
          </svg>
        )}
      </>
    );
  }
);

export default IconMap;
