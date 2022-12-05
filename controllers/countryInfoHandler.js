const fs = require("fs");
const temp = require("../controllers/templateHandlers");
const replaceTemplate = require("../modules/replaceTemplate");

const dataObj = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data.json`, "utf-8")
);

exports.getCountryInfo = (req, res) => {
  const name = req.params.name;
  const dataOut = dataObj.find((el) => el.name.common === name);
  const infoData = replaceTemplate(temp.info, dataOut);
  res.status(200).send(infoData);
};
