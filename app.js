// Core Modules
const http = require("http");
const fs = require("fs");
const url = require("url");

const PORT = 3000;

const home = fs.readFileSync(`${__dirname}/templates/home.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const info = fs.readFileSync(`${__dirname}/templates/info.html`, "utf-8");

const dataObj = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

const replaceTemplate = function (temp, data) {
  let output = temp.replace(/{%COUNTRYNAME%}/g, data.name.common);
  output = output.replace(/{%FLAG%}/g, data.flags.svg);
  output = output.replace(/{%CODEOFARM%}/g, data.coatOfArms.svg);
  output = output.replace(/{%OFFICIAL%}/g, data.name.official);
  output = output.replace(/{%CAPITAL%}/g, data.capital);
  output = output.replace(/{%REGION%}/g, data.region);
  output = output.replace(/{%SUBREGION%}/g, data.subregion);
  output = output.replace(/{%MAP%}/g, data.maps.googleMaps);
  output = output.replace(
    /{%POPULATION%}/g,
    new Intl.NumberFormat().format(data.population)
  );

  return output;
};

// Create Server

const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true);

  // Home
  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const dataOut = dataObj.map((el) => replaceTemplate(card, el)).join("");
    const out = home.replace(/{%CARD%}/, dataOut);
    res.end(out);
  }

  if (pathname === "/info") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    console.log(query.country);
    const dataOut = dataObj.find((el) => el.name.common === query.country);

    const infoData = replaceTemplate(info, dataOut);
    res.end(infoData);
    // res.end("WIP");
  }
});

// Listen

server.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
