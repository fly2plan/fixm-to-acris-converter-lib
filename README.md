# Fixm-To-ACRIS-Converter-Lib

A Nodejs library for converting the FIXM 4.2 XML schema to ACRIS JSON Schema which takes either FIXM XML content  as an input parameter and produces an ACRIS-based JSON output content. The sample folder has files that shows how to use this library.

####   The Project consist of   ####

	-  Typescript source code in "src" folder.
	-  Sample usage/test code in "sample_test" folder.
	-  Compiled/build source code in "lib"  folder.
	-  package.json , tsconfig.json, jestconfig.json and other related standard nodejs project files.
	
	

####  Running the sample  ####

- Clone the repo and run "npm install" command
- Build the project using “npm run build”
- Go to the sample_test folder.
- Run “ node example1.js”.
- Check the output folder inside sample_test.This will generate an ACRIS.json file corresponding  to the given fixm sample.
- The file acris_exmaple1.json inside ouput folder have the result of the execution.(If outfolder not there, create it beore running).
	
The **"transformFixmToAcris"**  is the entry point function into the lib. The function transformFixmToAcris accept XML file content as input parameter. 
The exmaple.js file inside the sample_test folder shows how to use the library. 



The library finds the IATA code from ICAO from a mapping property file if the data present in the file. Otherwise, it gives an empty value as IATA code. Updating the property file will solve this issue.

This libray  is also published as the  npm package with name "fixmtoacrisconverter" and can use directly in any nodejs project or type script project.The repo https://github.com/renjithpta/fixmtoacrissample  shows how to use it as npm package.

	


