const fs = require("fs");
exports.home = fs.readFileSync(`${__dirname}/../templates/home.html`, "utf-8");
exports.card = fs.readFileSync(`${__dirname}/../templates/card.html`, "utf-8");
exports.info = fs.readFileSync(`${__dirname}/../templates/info.html`, "utf-8");
