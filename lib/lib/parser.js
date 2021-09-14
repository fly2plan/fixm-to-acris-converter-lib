"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ACRIS_Empty_1 = require("../asset/ACRIS_Empty");
const class_converter_1 = require("class-converter");
const fileHandler_1 = require("./fileHandler");
const ACRISFlight_1 = require("../asset/ACRISFlight");
const jsHandle = __importStar(require("./objectHandler"));
const formatter_1 = require("./formatter");
const asset_1 = require("../asset/asset");
const winston_1 = __importDefault(require("winston"));
const xml2js_1 = require("xml2js");
const parser = new xml2js_1.Parser({ ignoreAttrs: false, mergeAttrs: false });
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
let FIXM_DATA;
let ACRIS_OBJ;
function setObjectValues(fixmDataObj) {
    ACRIS_OBJ = jsHandle.JSONify(ACRIS_Empty_1.getEmptyAcris());
    FIXM_DATA = fixmDataObj;
}
function transformFixmToAcris(fixmFilePath) {
    setFixmDatFromFile(fixmFilePath);
    logger.info("Starting XML parsing");
    ACRIS_OBJ = jsHandle.JSONify(mapper(ACRISFlight_1.ACRISFlight));
    logger.info("Formatting ACRIS data");
    ACRIS_OBJ = formatter_1.formatObject(ACRIS_OBJ);
    logger.info(" Parsed Object returned  as JSON ");
    return ACRIS_OBJ;
}
exports.transformFixmToAcris = transformFixmToAcris;
function mapper(classElement) {
    const dataObj = mapAttributesOfElement(classElement.name);
    class_converter_1.toClass(dataObj, classElement);
    return dataObj;
}
function mapAttributesOfElement(elementName, elementObj) {
    let AirMoveAttributes;
    if (elementObj !== undefined) {
        AirMoveAttributes = elementObj;
    }
    else {
        AirMoveAttributes = JSON.parse(asset_1.getModel(elementName));
    }
    Object.keys(AirMoveAttributes).forEach(key => {
        const keyValue = AirMoveAttributes[key];
        const valueType = jsHandle.getType(keyValue);
        switch (valueType) {
            case 'array':
                AirMoveAttributes[key] = jsHandle.fetchDataFromPath(FIXM_DATA, keyValue);
                break;
            case 'string':
                AirMoveAttributes[key] = mapAttributesOfElement(elementName = keyValue);
                break;
            case 'object':
                AirMoveAttributes[key] = mapAttributesOfElement(elementName, elementObj = keyValue);
                break;
        }
    });
    return AirMoveAttributes;
}
function setFixmDatFromFile(xmlFilePath) {
    parser.parseString(fileHandler_1.readFile(xmlFilePath), (err, result) => {
        if (err)
            throw err;
        setObjectValues(result);
    });
}
//# sourceMappingURL=parser.js.map