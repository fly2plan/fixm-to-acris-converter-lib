const { writeFileSync, readFileSync} = require('fs');
let parser = require('../lib/index');
let fixmData = readFileSync('./fixminput/fixmorginal.xml',"utf8");
let acrisData  = parser.transformFixmToAcris(fixmData);
console.log("Data : ",acrisData);
writeFileSync("./output/acris_example2.json",JSON.stringify(acrisData));
