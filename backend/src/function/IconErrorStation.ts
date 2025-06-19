import { schema } from "../type";

function IconErrorStation(
  type: "dark" | "light",
  ArrayErrorStation: number[],
  schemaData: NonNullable<schema>
) {
  ArrayErrorStation.map((data) => {
    const findindex = schemaData.stations.findIndex(
      (data2) => data2.id == data
    );

    if (findindex != -1 && schemaData.stations[findindex]) {
      const { x, y } = schemaData.stations[findindex].stationSvg;

      return `<g
            x="${x}"
            y="${y}"
            transform="translate(${x - 11.5}, ${y - 11.5})"
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
                    fill="#${type == "dark" ? "1a1a1a" : "ffffff"}"
                    stroke="#${type == "dark" ? "e0e0e0" : "333333"}"
                    strokeWidth="1.5"
                  ></rect>
                  <path
                    d="M11.5638 11.217V7"
                    stroke="#${type == "dark" ? "e0e0e0" : "333333"}"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M11.5627 14.6053C11.407 14.6053 11.2808 14.7315 11.2819 14.8871C11.2819 15.0427 11.4082 15.169 11.5638 15.169C11.7194 15.169 11.8457 15.0427 11.8457 14.8871C11.8457 14.7315 11.7194 14.6053 11.5627 14.6053"
                    stroke="#${type == "dark" ? "e0e0e0" : "333333"}"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
          </g>`;
    } else {
      return null;
    }
  }).filter(Boolean);
}

export default IconErrorStation;
