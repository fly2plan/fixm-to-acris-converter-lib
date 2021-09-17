"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("../asset/asset");
const winston_1 = __importDefault(require("winston"));
const IterateObject = require("iterate-object");
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
    if (Key === null) {
        return '';
    }
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
            logger.error("The data for key :" + Key + " is undefined, setting empty value");
            keyValue = '';
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
function tryAlternateKey(key) {
    logger.warn('Cannot find key : ' + key + ' Trying Alternative key');
    const altKeys = asset_1.getAlternative();
    if (altKeys.hasOwnProperty(key)) {
        return altKeys[key];
    }
    else {
        logger.warn('Cannot find alternate for key : ' + key);
        return null;
    }
}
function generateCollectionFromObject(collectionObject, Key, collectionDetails, iterObj) {
    let CollectObj;
    const collectionKeySet = collectionDetails.keys;
    const collectionBase = collectionDetails.base;
    IterateObject([iterObj], (value) => {
        let type = getType(value);
        switch (type) {
            case 'object':
                if (value.hasOwnProperty(collectionBase)) {
                    if (value[collectionBase] === undefined) {
                        logger.error("Cannot find collection object base, setting empty collection value");
                        collectionObject[Key] = [];
                    }
                    else {
                        CollectObj = value[collectionBase];
                        collectionKeySet.forEach((key) => {
                            CollectObj = collectKeys(CollectObj, key);
                        });
                        collectionObject[Key] = CollectObj;
                        return;
                    }
                }
            case 'array':
                generateCollectionFromObject(collectionObject, Key, collectionDetails, value);
        }
    });
}
exports.generateCollectionFromObject = generateCollectionFromObject;
function collectKeys(obj, Pkey) {
    let objectLst = [];
    IterateObject(obj, (value) => {
        let type = getType(value);
        switch (type) {
            case 'object':
                Object.keys(value).forEach(key => {
                    if (key === Pkey) {
                        objectLst.push(value[key][0]);
                    }
                });
        }
    });
    obj = objectLst;
    return obj;
}
function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
//# sourceMappingURL=objectHandler.js.map