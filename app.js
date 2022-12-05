// Core Modules
const http = require("http");
const fs = require("fs");
const url = require("url");
const express = require("express");
const app = express();
const replaceTemplate = require("./modules/replaceTemplate");

app.use(express.json());

const home = fs.readFileSync(`${__dirname}/templates/home.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");
const info = fs.readFileSync(`${__dirname}/templates/info.html`, "utf-8");

const dataObj = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

// const readAPI = async function () {
//   const res = await fetch("https://restcountries.com/v3.1/all");
//   const data = await res.json();

//   return data;
// };
const getCountry = (req, res) => {
  const dataOut = dataObj.map((el) => replaceTemplate(card, el)).join("");
  const out = home.replace(/{%CARD%}/, dataOut);
  res.status(200).send(out);
};

const getCountryInfo = (req, res) => {
  const name = req.params.name;
  const dataOut = dataObj.find((el) => el.name.common === name);
  const infoData = replaceTemplate(info, dataOut);
  res.status(200).send(infoData);
};

app.route("/").get(getCountry);
app.route("/info/:name").get(getCountryInfo);

// Listen
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
