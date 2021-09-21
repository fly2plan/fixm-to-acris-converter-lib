# Fixm-To-ACRIS-Converter-Lib

A Nodejs library for converting the FIXM 4.2 XML schema to ACRIS JSON Schema which takes either FIXM XML content or file path as an input parameter and produces an ACRIS-based JSON output content. The sample folder has files that shows how to use this library.

####   The Project consist of   ####
	-  JSON files that maps the fixm xml tags to ACRIS attributes.
	-  Typescript source code.
	-  scripts to convert the project to js.
	-  Sample code in JS.

#### * Running the sample * ####

	-  Build the project using “npm run build”.
	-  Go to the sample folder.
	-  run “ node sample.js”.
	-  This will generate an ACRIS.json file corresponding  to the given fixm sample.
        -  The file acris.json have the output of the execution.
	
The transformFixmToAcris and transformXmlFileToAcris functions are the  entry points functions  into the lib. The function transformFixmToAcris accept XML file contents and schema version(optional parameter one, no need to pass) as parameters. The function transformXmlFileToAcris accepts XML the file path and version( optional parameter) . Default is 4.2 .

The sample.js file inside the sample folder shows how to use the library. Running the sample.js produces the output JSON file with the name acris.json file in the same folder. 


The library finds the IATA code from ICAO from a mapping property file if the data present in the file. Otherwise, it gives an empty value as IATA code. Updating the property file will solve this issue.

	


