"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../lib/constants");
const icao_to_iata_1 = require("./iataicaomapper/icao_to_iata");
const alternate_1 = require("./fixsmalternativetagmapper/alternate");
const Collections_1 = require("./models/schema/4.2/Collections");
const ACRISFlight_1 = require("./models/schema/4.2/ACRISFlight");
const AircraftMovement_1 = require("./models/schema/4.2/AircraftMovement");
const AircraftMovementConstraint_1 = require("./models/schema/4.2/AircraftMovementConstraint");
const AircraftMovementEmergency_1 = require("./models/schema/4.2/AircraftMovementEmergency");
const AircraftMovementIdentification_1 = require("./models/schema/4.2/AircraftMovementIdentification");
const AircraftMovementRoute_1 = require("./models/schema/4.2/AircraftMovementRoute");
const AircraftTransport_1 = require("./models/schema/4.2/AircraftTransport");
const AircraftTransportFormation_1 = require("./models/schema/4.2/AircraftTransportFormation");
const AircraftTransportType_1 = require("./models/schema/4.2/AircraftTransportType");
const AirportFacility_1 = require("./models/schema/4.2/AirportFacility");
const CargoItem_1 = require("./models/schema/4.2/CargoItem");
const DinDinghy_1 = require("./models/schema/4.2/DinDinghy");
const MeteorologicalEnvironment_1 = require("./models/schema/4.2/MeteorologicalEnvironment");
const PackageGroupType_1 = require("./models/schema/4.2/PackageGroupType");
const RouteConstraint_1 = require("./models/schema/4.2/RouteConstraint");
exports.getModel = (modelFileName, version) => {
    if (version === undefined) {
        version = constants_1.DEFAULT_VERSION;
    }
    console.log("FileName========", modelFileName);
    if (modelFileName.indexOf(".") > 0) {
        modelFileName = modelFileName.substring(0, (modelFileName.indexOf(".") - 1));
    }
    console.log("FileName after========", modelFileName);
    if (modelFileName === 'ACRISFlight')
        return JSON.stringify(ACRISFlight_1.ACRISFlight);
    if (modelFileName === 'AircraftMovement')
        return JSON.stringify(AircraftMovement_1.AircraftMovement);
    if (modelFileName === 'AircraftMovementConstraint')
        return JSON.stringify(AircraftMovementConstraint_1.AircraftMovementConstraint);
    if (modelFileName === 'AircraftMovementEmergency')
        return JSON.stringify(AircraftMovementEmergency_1.AircraftMovementEmergency);
    if (modelFileName === 'AircraftMovementIdentification')
        return JSON.stringify(AircraftMovementIdentification_1.AircraftMovementIdentification);
    if (modelFileName === 'AircraftMovementRoute')
        return JSON.stringify(AircraftMovementRoute_1.AircraftMovementRoute);
    if (modelFileName === 'AircraftTransport')
        return JSON.stringify(AircraftTransport_1.AircraftTransport);
    if (modelFileName === 'AircraftTransportFormation')
        return JSON.stringify(AircraftTransportFormation_1.AircraftTransportFormation);
    if (modelFileName === 'AircraftTransportType')
        return JSON.stringify(AircraftTransportType_1.AircraftTransportType);
    if (modelFileName === 'AirportFacility')
        return JSON.stringify(AirportFacility_1.AirportFacility);
    if (modelFileName === 'CargoItem')
        return JSON.stringify(CargoItem_1.CargoItem);
    if (modelFileName === 'DinDinghy')
        return JSON.stringify(DinDinghy_1.DinDinghy);
    if (modelFileName === 'MeteorologicalEnvironment')
        return JSON.stringify(MeteorologicalEnvironment_1.MeteorologicalEnvironment);
    if (modelFileName === 'PackageGroupType')
        return JSON.stringify(PackageGroupType_1.PackageGroupType);
    if (modelFileName === 'RouteConstraint')
        return JSON.stringify(RouteConstraint_1.RouteConstraint);
    console.log("==========empty================");
};
exports.getIATA = () => {
    return JSON.parse(JSON.stringify(icao_to_iata_1.icaoIataMapper));
};
exports.getAlternative = () => {
    return JSON.parse(JSON.stringify(alternate_1.alternativeTags));
};
exports.getCollectionModel = (version) => {
    return JSON.parse(JSON.stringify(Collections_1.collections));
};
//# sourceMappingURL=util.js.map