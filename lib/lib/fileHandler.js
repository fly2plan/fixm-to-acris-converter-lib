"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const winston_1 = __importDefault(require("winston"));
const logger = winston_1.default.createLogger({
    'transports': [
        new winston_1.default.transports.Console()
    ]
});
function writeFile(file, data) {
    try {
        fs_1.writeFileSync(file, data);
    }
    catch (e) {
        logger.error("File Write Error : " + e);
    }
}
exports.writeFile = writeFile;
function readFile(filepath) {
    if (fs_1.existsSync(filepath)) {
        return fs_1.readFileSync(filepath, "utf8");
    }
    else {
        logger.error("No Such File Exists : ", filepath);
        throw ReferenceError("File not found");
    }
}
exports.readFile = readFile;
//# sourceMappingURL=fileHandler.js.map