"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("../asset/asset");
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
function getType(object) {
    if (Array.isArray(object)) {
        return 'array';
    }
    else {
        return typeof object;
    }
}
exports.getType = getType;
function JSONify(data) {
    return JSON.parse(JSON.stringify(data));
}
exports.JSONify = JSONify;
function getDataFromObject(dataObject, Key) {
    Key = verifiedKey(dataObject, Key);
    let keyValue = dataObject[Key];
    switch (typeof keyValue) {
        case 'object':
            if (Array.isArray(keyValue)) {
                keyValue = keyValue[0];
            }
            else {
                keyValue = JSONify(keyValue);
            }
            break;
        case 'undefined':
            logger.error("Data Undefined");
    }
    return keyValue;
}
function fetchDataFromPath(dataObj, keyList) {
    keyList.forEach(key => {
        dataObj = getDataFromObject(dataObj, key);
    });
    if (Array.isArray(dataObj)) {
        dataObj = dataObj[0];
    }
    return dataObj;
}
exports.fetchDataFromPath = fetchDataFromPath;
function tryAlternateKey(key) {
    logger.warn(" Cannot find key : ", key);
    logger.info("Trying Alternative key");
    let altKeys = asset_1.getAlternative();
    if (altKeys.hasOwnProperty(key)) {
        return altKeys[key];
    }
    else {
        return null;
    }
}
function verifiedKey(dataObj, key) {
    if (!Array.isArray(dataObj)) {
        if (dataObj.hasOwnProperty(key)) {
            return key;
        }
        else {
            return tryAlternateKey(key);
        }
    }
}
//# sourceMappingURL=objectHandler.js.map