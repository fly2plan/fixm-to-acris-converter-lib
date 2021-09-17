"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objectHandler_1 = require("./objectHandler");
function removeUnwantedKeys(dataValue) {
    const keyList = ["extension", "$", "xsi:type"];
    keyList.forEach(key => {
        if (keyPresent(dataValue, key)) {
            delete dataValue[key];
        }
    });
}
exports.removeUnwantedKeys = removeUnwantedKeys;
function keyPresent(srcObj, keyValue) {
    return srcObj.hasOwnProperty(keyValue);
}
exports.keyPresent = keyPresent;
function removeTag(objValue) {
    const tag = "fx:";
    Object.keys(objValue).forEach(key => {
        if (key.includes(tag)) {
            let newKey = key.replace(tag, '');
            objValue[newKey] = objValue[key];
            delete objValue[key];
        }
    });
}
exports.removeTag = removeTag;
function removeEmptyFields(obj) {
    const undesired = ["", " ", "  "];
    Object.keys(obj).forEach(key => {
        undesired.forEach(element => {
            if (obj[key] === element) {
                delete obj[key];
            }
        });
    });
}
exports.removeEmptyFields = removeEmptyFields;
function removeSingleArray(obj) {
    Object.keys(obj).forEach(key => {
        if (Array.isArray(obj[key])) {
            if (obj[key].length === 1) {
                obj[key] = obj[key][0];
            }
        }
    });
}
exports.removeSingleArray = removeSingleArray;
function removeEmptyObject(key, value, obj) {
    if (objectHandler_1.isEmpty(value)) {
        delete obj[key];
    }
}
exports.removeEmptyObject = removeEmptyObject;
function removeEmptyArrays(key, value, obj) {
    if (Array.isArray(value)) {
        if (value.length === 0) {
            delete obj[key];
        }
    }
}
exports.removeEmptyArrays = removeEmptyArrays;
function removeEmptyKeyFields(obj) {
    Object.keys(obj).forEach(key => {
        if (objectHandler_1.isEmpty(obj[key])) {
            delete obj[key];
        }
    });
}
exports.removeEmptyKeyFields = removeEmptyKeyFields;
//# sourceMappingURL=filters.js.map