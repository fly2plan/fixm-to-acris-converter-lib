import { readFileSync, writeFileSync ,existsSync} from "fs";
import winston from "winston"

const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console()
    ]
});


export function writeFile(file:string,data:any){
    writeFileSync(file,data)
}
export function readFile(filepath:string){
    if(existsSync(filepath)){
        return readFileSync(filepath)
    }else{
        logger.error("No Such File Exists : ",filepath);
        throw ReferenceError("File not found")
    }
}