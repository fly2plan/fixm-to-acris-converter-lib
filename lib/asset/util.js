"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const constants_1 = require("../lib/constants");
const path = require("path"); //tslint:disable-line:require
const icaoiatamapper = require("./iataicaomapper/icao_to_iata.json"); // tslint:disable-line:require
const alternativeTags = require("./fixsmalternativetagmapper/alternate.json"); // tslint:disable-line:require
const collectionModels = require("./models/schema/4.2/Collections.json"); // tslint:disable-line:require
exports.getModel = (modelFileName, version) => {
    if (version === undefined) {
        version = constants_1.DEFAULT_VERSION;
    }
    const modelPath = path.join(__dirname, "models", "schema", version, modelFileName + ".json");
    return fs_1.readFileSync(modelPath, "utf8");
};
exports.getIATA = () => {
    return icaoiatamapper;
};
exports.getAlternative = () => {
    return alternativeTags;
};
exports.getCollectionModel = (version) => {
    return collectionModels;
};
//# sourceMappingURL=util.js.map