"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("../asset/asset");
const objectHandler_1 = require("./objectHandler");
const IterateObject = require("iterate-object");
function removeUnwantedKeys(dataValue) {
    const keyList = ["extension", "$"];
    keyList.forEach(key => {
        if (keyPresent(dataValue, key)) {
            delete dataValue[key];
        }
    });
}
function keyPresent(srcObj, keyValue) {
    return srcObj.hasOwnProperty(keyValue);
}
function setTestValue(dataValue) {
    if (keyPresent(dataValue, "_")) {
        dataValue.value = dataValue._;
        delete dataValue._;
    }
}
function convertICAO(dataValue) {
    Object.keys(dataValue).forEach(key => {
        if (key.toLowerCase().includes("icao")) {
            if (typeof dataValue !== 'object') {
                dataValue[key] = toIATA(dataValue[key]);
            }
        }
    });
}
exports.convertICAO = convertICAO;
function formatObject(formatObj) {
    IterateObject(formatObj, (value) => {
        let type = objectHandler_1.getType(value);
        switch (type) {
            case 'object':
                removeUnwantedKeys(value);
                setTestValue(value);
                convertICAO(value);
            case 'array':
                formatObject(value);
        }
    });
    return formatObj;
}
exports.formatObject = formatObject;
function toIATA(icaoCode) {
    let codeList = asset_1.getIATA();
    return codeList[icaoCode];
}
exports.toIATA = toIATA;
//# sourceMappingURL=formatter.js.map