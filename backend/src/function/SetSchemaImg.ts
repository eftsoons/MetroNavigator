import puppeteer from "puppeteer";
import fs from "fs";
import { GlobalInfo } from "../type";
// import IconErrorStation from "./IconErrorStation";

export default async (schemadata: GlobalInfo["info"]) => {
  const data = Object.entries(schemadata);

  if (data) {
    /*const arrayerrorstation = [
      ...new Set(
        notifications.flatMap((data) =>
          data.stations.map((data) => data.stationId)
        )
      ),
    ];*/

    /*
                      <g>${IconErrorStation(
                    "light",
                    arrayerrorstation,
                    schemadata
                  )}</g>
    */

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

    for (const metro of data) {
      if (metro && metro[1].schema) {
        await page.setViewport({
          width: metro[1].schema.width,
          height: metro[1].schema.height,
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
                  fill: #333333;
                }
                body, html, svg {
                  background: transparent;
                  height: ${metro[1].schema.height}px;
                  width: ${metro[1].schema.width}px;
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
                  height="${metro[1].schema.height}"
                  width="${metro[1].schema.width}"
                  viewBox={"0 0 ${metro[1].schema.width} ${
          metro[1].schema.height
        }"}
                >
                  <g>${metro[1].schema?.additional
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${metro[1].schema?.connections
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${metro[1].schema?.transitions
                    .map((data) => data.svg)
                    .join("")}</g>
                  <g>${metro[1].schema?.stations
                    .map((data) => data.stationSvg.svg)
                    .join("")}</g>
                </svg>
                </body>
            </html>`);

        await page.screenshot({
          path: `./data/${metro[0]}/schema.webp`,
          type: "webp",
          fullPage: true,
          omitBackground: true,
          quality: 100,
        });
      }
    }

    await browser.close();
  }
};
