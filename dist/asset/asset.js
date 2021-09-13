"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path = require("path");
function getModel(modelFileName) {
    const modelPath = path.resolve(__dirname + "/models/" + modelFileName + ".json");
    return fs_1.readFileSync(modelPath, "utf8");
}
exports.getModel = getModel;
function getIATA() {
    return JSON.parse(fs_1.readFileSync(__dirname + "/IATA/ICAO_To_IATA.json", "utf8"));
}
exports.getIATA = getIATA;
function getAlternative() {
    return JSON.parse(fs_1.readFileSync(__dirname + "/Alternate/Alternate.json", "utf8"));
}
exports.getAlternative = getAlternative;
//# sourceMappingURL=asset.js.map