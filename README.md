# Fixm-To-ACRIS-Converter-Lib

A Nodejs library for converting the FIXM 4.2 XML schema to ACRIS JSON Schema which takes either FIXM XML content  as an input parameter and produces an ACRIS-based JSON output content. The sample folder has files that shows how to use this library.

####   The Project consist of   ####
	-  JSON files that maps the fixm xml tags to ACRIS attributes.
	-  Typescript source code.
	-  scripts to convert the project to js.
	-  Sample test code in JS.
	-  Compiled source code in JS after build.

#### * Running the sample * ####
        -  Run npm i
	-  Build the project using “npm run build”.
	-  Go to the sample_test folder.
	-  run “ node example1.js”.
	-  This will generate an ACRIS.json file corresponding  to the given fixm sample.
        -  The file acris_exmaple1.json inside ouput folder have the result of the execution.(If outfolder not there, create it beore running)
	
The transformFixmToAcris is the entry point function into the lib. The function transformFixmToAcris accept XML file content as input parameter. 
The exmaple.js file inside the sample_test folder shows how to use the library. T

The library finds the IATA code from ICAO from a mapping property file if the data present in the file. Otherwise, it gives an empty value as IATA code. Updating the property file will solve this issue.

	


