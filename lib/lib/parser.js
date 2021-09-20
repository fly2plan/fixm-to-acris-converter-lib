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
const validator_1 = require("./validator");
const parser = new xml2js_1.Parser({ ignoreAttrs: false, mergeAttrs: false });
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
let VERSION;
let FIXM_DATA;
let ACRIS_OBJ;
const setObjectValues = (fixmDataObj) => {
    ACRIS_OBJ = jsHandle.JSONify(ACRIS_Empty_1.getEmptyAcris());
    FIXM_DATA = fixmDataObj;
};
// Takes in an XML filepath, reads the contents and converts the XML contents to ACRIS
exports.transformXmlFileToAcris = (fixmFilePath, fixmversion) => {
    const fixmString = fileHandler_1.readFile(fixmFilePath);
    return exports.transformFixmToAcris(fixmString, fixmversion);
};
// Takes in an XML string and converts it to ACRIS
exports.transformFixmToAcris = (xmlString, fixmversion) => {
    try {
        setFixmDatFromFile(xmlString, fixmversion);
    }
    catch (e) {
        logger.error("Invalid Fixm String : ", e);
        return;
    }
    logger.info("Starting XML parsing");
    ACRIS_OBJ = jsHandle.JSONify(mapper(ACRISFlight_1.ACRISFlight));
    logger.info(" Validateing ACRIS Fields");
    ACRIS_OBJ = validator_1.validateObject(ACRIS_OBJ);
    logger.info("Formatting ACRIS data");
    ACRIS_OBJ = formatter_1.formatObject(ACRIS_OBJ);
    logger.info(" Parsed Object returned  as JSON ");
    return ACRIS_OBJ;
};
// Maps the XML tags to ACRIS attributes
const mapper = (classElement) => {
    const dataObj = mapAttributesOfElement(classElement.name);
    class_converter_1.toClass(dataObj, classElement);
    return dataObj;
};
const mapAttributesOfElement = (elementName, elementObj) => {
    let AirMoveAttributes;
    if (elementObj !== undefined) {
        AirMoveAttributes = elementObj;
    }
    else {
        AirMoveAttributes = JSON.parse(asset_1.getModel(elementName, VERSION));
    }
    Object.keys(AirMoveAttributes).forEach(key => {
        const keyValue = AirMoveAttributes[key];
        const valueType = jsHandle.getType(keyValue);
        switch (valueType) {
            case 'array':
                AirMoveAttributes[key] = jsHandle.fetchDataFromPath(FIXM_DATA, keyValue);
                break;
            case 'string':
                if (keyValue.includes("_collection")) {
                    const model = asset_1.getCollectionModel(VERSION);
                    const collectionObjectDetails = model[keyValue];
                    const iterobj = jsHandle.fetchDataFromPath(FIXM_DATA, collectionObjectDetails.path);
                    jsHandle.generateCollectionFromObject(AirMoveAttributes, key, collectionObjectDetails, iterobj);
                }
                else {
                    AirMoveAttributes[key] = mapAttributesOfElement(elementName = keyValue);
                }
                break;
            case 'object':
                AirMoveAttributes[key] = mapAttributesOfElement(elementName, elementObj = keyValue);
                break;
        }
    });
    return AirMoveAttributes;
};
const setFixmDatFromFile = (fixmData, fixmVersion) => {
    VERSION = fixmVersion;
    parser.parseString(fixmData, (err, result) => {
        if (err)
            throw err;
        setObjectValues(result);
    });
};
//# sourceMappingURL=parser.js.map