import { readFileSync } from "fs"
import path = require("path")




export function getModel(modelFileName :string ) {

    const modelPath = path.resolve(__dirname +"/models/" + modelFileName + ".json")
    return readFileSync(modelPath,"utf8")
}

export function getIATA(){
    return JSON.parse(readFileSync(__dirname+"/IATA/ICAO_To_IATA.json", "utf8"))
}

export function getAlternative(){
    return JSON.parse(readFileSync(__dirname+"/Alternate/Alternate.json", "utf8"))
}