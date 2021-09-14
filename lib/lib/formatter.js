"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-var-requires: "off" */
const asset_1 = require("../asset/asset");
const objectHandler_1 = require("./objectHandler");
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
/* tslint:disable no-var-requires */
const IterateObject = require("iterate-object");
function removeUnwantedKeys(dataValue) {
    const keyList = ["extension", "$"];
    keyList.forEach(key => {
        if (keyPresent(dataValue, key)) {
            delete dataValue[key];
        }
    });
}
function removeTag(objValue) {
    let tag = "fx:";
    Object.keys(objValue).forEach(key => {
        if (key.includes(tag)) {
            let newKey = key.replace(tag, '');
            objValue[newKey] = objValue[key];
            delete objValue[key];
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
            if (typeof dataValue[key] === 'string') {
                dataValue.iataCode = toIATA(dataValue[key]);
            }
        }
    });
}
exports.convertICAO = convertICAO;
function formatObject(formatObj) {
    IterateObject(formatObj, (value) => {
        const type = objectHandler_1.getType(value);
        switch (type) {
            case 'object':
                removeUnwantedKeys(value);
                setTestValue(value);
                convertICAO(value);
                removeTag(value);
            case 'array':
                formatObject(value);
        }
    });
    return formatObj;
}
exports.formatObject = formatObject;
function toIATA(icaoCode) {
    const codeList = asset_1.getIATA();
    let IATAcode = codeList[icaoCode];
    if (IATAcode === undefined) {
        logger.warn("Cannot find the IATA code to the corresponding ICAO Code :" + icaoCode + ", Setting empty value");
        IATAcode = '';
    }
    return IATAcode;
}
exports.toIATA = toIATA;
//# sourceMappingURL=formatter.js.map