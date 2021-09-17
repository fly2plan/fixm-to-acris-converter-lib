"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint @typescript-eslint/no-var-requires: "off" */
const objectHandler_1 = require("./objectHandler");
const winston_1 = __importDefault(require("winston"));
const FILTER = __importStar(require("./filters"));
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
/* tslint:disable no-var-requires */
const IterateObject = require("iterate-object");
function setTextValue(dataValue) {
    if (FILTER.keyPresent(dataValue, "_")) {
        dataValue.value = dataValue._;
        delete dataValue._;
    }
}
function formatObject(formatObj) {
    IterateObject(formatObj, (value, name) => {
        const type = objectHandler_1.getType(value);
        switch (type) {
            case 'object':
                setTextValue(value);
                FILTER.removeUnwantedKeys(value);
                FILTER.removeTag(value);
                FILTER.removeSingleArray(value);
                FILTER.removeEmptyFields(value);
                FILTER.removeEmptyArrays(name, value, formatObj);
                FILTER.removeEmptyObject(name, value, formatObj);
            case 'array':
                formatObject(value);
        }
    });
    FILTER.removeEmptyKeyFields(formatObj);
    return formatObj;
}
exports.formatObject = formatObject;
//# sourceMappingURL=formatter.js.map