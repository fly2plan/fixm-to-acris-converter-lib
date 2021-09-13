export const getEmptyAcris = () : any=> {

    return {
        "operatingAirline": {
          "iataCode": "",
          "icaoCode": "",
          "name": ""
        },
          "aircraftType": {
          "icaoCode": "",
          "modelName": "",
          "registration": ""
        },
        "flightNumber": {
          "airlineCode": "",
          "trackNumber": ""
        },
        "departureAirport": "",
        "arrivalAirport": "",
        "originDate": "",
        "departure": {
          "scheduled": "2021-01-28T12:27:00-04:00",
          "estimated": "2021-01-28T12:27:00-04:00",
          "actual": "2021-01-28T12:27:00-04:00",
          "terminal": "/fx:Flight/fx:departure/fx:runwayDirection",
          "gate": "10"
        },
        "arrival": {
          "scheduled": "",
          "estimated": "",
          "actual": "",
          "terminal": "",
          "gate": ""
        },
        "flightStatus": "",
        "extensions": {}
      };

}