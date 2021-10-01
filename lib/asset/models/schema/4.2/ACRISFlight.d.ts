export declare const ACRISFlight: {
    operatingAirline: {
        icaoCode: string[];
        name: string[];
    };
    aircraftType: {
        icaoCode: string;
        modelName: string[];
        registration: string[];
    };
    flightNumber: {
        airlineCode: string[];
        trackNumber: string[];
    };
    departureAirport: string[];
    arrivalAirport: string[];
    originDate: string[];
    departure: {
        actual: string[];
        terminal: string[];
        estimated: string[];
    };
    arrival: {
        actual: string[];
        terminal: string[];
    };
    extensions: {
        nb: string;
        AircraftMovement: string;
        AircraftTransport: string;
        AirportFacility: string;
        Route: string;
        aircraftMovementConstraint: string;
        aircraftMovementEmergency: string;
        aircraftMovementIdentification: string;
        CargoItem: string;
        RouteConstraint: string;
    };
};
