"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const asset_1 = require("../asset/asset");
const winston_1 = __importDefault(require("winston"));
const objectHandler_1 = require("./objectHandler");
const IterateObject = require("iterate-object");
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
function validateFlightNumber(obj) {
    obj.flightNumber.airlineCode = obj.flightNumber.airlineCode.replace(/[0-9]/g, '');
    obj.flightNumber.trackNumber = obj.flightNumber.trackNumber.replace(/\D/g, '');
    return obj;
}
exports.validateFlightNumber = validateFlightNumber;
function findAndReplaceIcao(dataValue) {
    Object.keys(dataValue).forEach(key => {
        if (key.toLowerCase().includes("icao")) {
            if (typeof dataValue[key] === 'string') {
                dataValue.iataCode = toIATA(dataValue[key]);
            }
        }
    });
}
exports.findAndReplaceIcao = findAndReplaceIcao;
function convertICAO(obj) {
    IterateObject(obj, (value) => {
        const type = objectHandler_1.getType(value);
        switch (type) {
            case 'object':
                findAndReplaceIcao(value);
            case 'array':
                convertICAO(value);
        }
    });
    return obj;
}
exports.convertICAO = convertICAO;
function validateObject(obj) {
    obj = convertICAO(obj);
    validateFlightNumber(obj);
    return obj;
}
exports.validateObject = validateObject;
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
//# sourceMappingURL=validator.js.map