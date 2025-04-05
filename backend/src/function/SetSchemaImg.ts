import puppeteer from "puppeteer";
import fs from "fs";
import { notifications, schema } from "../type";

export default async (schemadata: schema, notifications: notifications) => {
  if (schemadata && notifications) {
    const arrayerrorstation = [
      ...new Set(
        notifications.flatMap((data) =>
          data.stations.map((data) => data.stationId)
        )
      ),
    ];

    const iconerrorstation = (type: "dark" | "light") =>
      arrayerrorstation
        .map((data) => {
          const findindex = schemadata.stations.findIndex(
            (data2) => data2.id == data
          );

          if (findindex != -1 && schemadata.stations[findindex]) {
            const { x, y } = schemadata.stations[findindex].stationSvg;

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
        })
        .filter(Boolean);

    const browser = await puppeteer.launch({
      ignoreDefaultArgs: ["--disable-extensions"],
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on("request", (request) => {
      const url = request.url();

      if (url.includes("fonts.googleapis.com")) {
        request.respond({
          status: 200,
          headers: { "Access-Control-Allow-Origin": "*" },
          contentType: "font/woff2",
          body: fs.readFileSync("./fonts/MoscowSans-Regular.woff2"),
        });
      } else if (url.includes("static.mosmetro.tech")) {
        request.respond({
          status: 200,
          contentType: "image/png",
          body: fs.readFileSync("./data/background.png"),
        });
      } else {
        request.continue();
      }
    });

    await page.setViewport({
      width: schemadata.width,
      height: schemadata.height,
      deviceScaleFactor: 2,
    });

    await page.setContent(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <style>
                @font-face {
                  font-family: 'MoscowSans-Regular';
                  src: url("https://fonts.googleapis.com");
                }
                text {
                  font-family: MoscowSans-Regular;
                  fill: #e0e0e0;
                }
                body, html, svg {
                  background: transparent;
                  height: ${schemadata.height}px;
                  width: ${schemadata.width}px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                * {
                  margin: 0 !important;
                  padding: 0 !important;
                }
              </style>
            </head>
              <body>
              <svg
                  height="${schemadata.height}"
                  width="${schemadata.width}"
                  viewBox={"0 0 ${schemadata.width} ${schemadata.height}"}
                >
                  <g>${schemadata?.additional
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.connections
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.transitions
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.stations
                    .map((data) => data.stationSvg.svg)
                    .join("")}</g>
                  <g>${iconerrorstation("dark").join("")}</g>
                  <g>${schemadata?.stations
                    .map((data) => data.textSvg.svg)
                    .join("")}</g>
                </svg>
                </body>
            </html>`);

    await page.screenshot({
      path: "./data/schemadark.webp",
      type: "webp",
      fullPage: true,
      omitBackground: true,
      quality: 100,
    });

    await page.setContent(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <style>
                @font-face {
                  font-family: 'MoscowSans-Regular';
                  src: url("https://fonts.googleapis.com");
                }
                text {
                  font-family: MoscowSans-Regular;
                  fill: #333333;
                }
                body, html, svg {
                  background: transparent;
                  height: ${schemadata.height}px;
                  width: ${schemadata.width}px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                * {
                  margin: 0 !important;
                  padding: 0 !important;
                }
              </style>
            </head>
              <body>
              <svg
                  height="${schemadata.height}"
                  width="${schemadata.width}"
                  viewBox={"0 0 ${schemadata.width} ${schemadata.height}"}
                >
                  <g>${schemadata?.additional
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.connections
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.transitions
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${schemadata?.stations
                    .map((data) => data.stationSvg.svg)
                    .join("")}</g>
                  <g>${iconerrorstation("light").join("")}</g>
                  <g>${schemadata?.stations
                    .map((data) => data.textSvg.svg)
                    .join("")}</g>
                </svg>
                </body>
            </html>`);

    await page.screenshot({
      path: "./data/schemalight.webp",
      type: "webp",
      fullPage: true,
      omitBackground: true,
      quality: 100,
    });

    await browser.close();
  }
};
