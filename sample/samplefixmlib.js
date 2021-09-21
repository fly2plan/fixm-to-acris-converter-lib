const { writeFileSync,readFileSync} = require('fs');
var parser = require('../lib')
let fileContent = readFileSync('./4.2/fixmorginal.xml',"utf8");
let acrisData  = parser.transformFixmToAcris(fileContent);
console.log("Data : ",acrisData);
writeFileSync("acris.json",JSON.stringify(acrisData));
