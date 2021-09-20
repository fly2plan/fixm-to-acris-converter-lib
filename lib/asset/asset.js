"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("../lib/constants");
const path = require("path");
exports.getModel = (modelFileName, version) => {
    if (version === undefined) {
        version = constants_1.DEFAULT_VERSION;
    }
    const modelPath = path.join(__dirname, "models", version, modelFileName + ".json");
    return fs_1.readFileSync(modelPath, "utf8");
};
exports.getIATA = () => {
    return JSON.parse(fs_1.readFileSync(__dirname + "/IATA/ICAO_To_IATA.json", "utf8"));
};
exports.getAlternative = () => {
    return JSON.parse(fs_1.readFileSync(__dirname + "/Alternate/Alternate.json", "utf8"));
};
exports.getCollectionModel = (version) => {
    if (version === undefined) {
        version = constants_1.DEFAULT_VERSION;
    }
    const modelPath = path.join(__dirname, "models", version, "Collections.json");
    return JSON.parse(fs_1.readFileSync(modelPath, "utf8"));
};
//# sourceMappingURL=asset.js.map