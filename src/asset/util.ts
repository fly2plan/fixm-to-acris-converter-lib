import { readFileSync } from "fs";
import { DEFAULT_VERSION } from "../lib/constants";
import path  = require("path"); //tslint:disable-line:require
const icaoiatamapper  = require("./iataicaomapper/icao_to_iata.json");// tslint:disable-line:require
const alternativeTags = require("./fixsmalternativetagmapper/alternate.json");// tslint:disable-line:require
const collectionModels= require("./models/schema/4.2/Collections.json");// tslint:disable-line:require

export const getModel = (modelFileName :string,version?:string)=>{

    if(version === undefined){
        version = DEFAULT_VERSION;
    }
    const modelPath = path.join(__dirname ,"models" ,"schema",version, modelFileName + ".json")
    return readFileSync(modelPath,"utf8")
}

export const getIATA= ()=>{
    return icaoiatamapper;
  
}

export const getAlternative = ()=>{
    return alternativeTags;
}

export const getCollectionModel = (version?:string)=>{
    return collectionModels;

}

