const fs = require("fs");
const replaceTemplate = require("../modules/replaceTemplate");
const temp = require("../controllers/templateHandlers");

const dataObj = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data.json`, "utf-8")
);

exports.getCountry = (req, res) => {
  const dataOut = dataObj.map((el) => replaceTemplate(temp.card, el)).join("");
  const out = temp.home.replace(/{%CARD%}/, dataOut);
  res.status(200).send(out);
};
