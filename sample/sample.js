const { writeFileSync, readFileSync } = require('fs')
var parser = require('../lib/index')

// let xmlString = readFileSync('/home/sethuraman/Documents/Workspace/IBS/DataMapping/Adapter/fixm-to-acris-converter-lib/sample/fixmsample1.xml')

acrisData  = parser.parseFixmFromFile('./4.2/fixmsample1.xml')
// acrisData  = parser.transformFixmToAcris(xmlString)

// console.log("Data : ",acrisData)
writeFileSync('./acris.json',JSON.stringify(acrisData))