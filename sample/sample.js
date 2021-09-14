const { writeFileSync } = require("fs");
var parserXml = require("../lib")
acrisData = parserXml.transformFixmToAcris('./fixmsample1.xml')
console.log("Fixm Data : ",acrisData)
writeFileSync('./acris.json',JSON.stringify(acrisData))
