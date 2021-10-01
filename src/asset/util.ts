
import { DEFAULT_VERSION } from "../lib/constants";
import {icaoIataMapper} from "./iataicaomapper/icao_to_iata";
import {alternativeTags } from './fixsmalternativetagmapper/alternate';
import { collections } from './models/schema/4.2/Collections';
import { ACRISFlight } from './models/schema/4.2/ACRISFlight';
import { AircraftMovement } from './models/schema/4.2/AircraftMovement';
import { AircraftMovementConstraint } from './models/schema/4.2/AircraftMovementConstraint';
import {AircraftMovementEmergency} from './models/schema/4.2/AircraftMovementEmergency';
import {AircraftMovementIdentification} from './models/schema/4.2/AircraftMovementIdentification';
import {AircraftMovementRoute} from './models/schema/4.2/AircraftMovementRoute';

import {AircraftTransport} from './models/schema/4.2/AircraftTransport';
import {AircraftTransportFormation} from './models/schema/4.2/AircraftTransportFormation';
import {AircraftTransportType} from './models/schema/4.2/AircraftTransportType';
import {AirportFacility} from './models/schema/4.2/AirportFacility';
import {CargoItem} from './models/schema/4.2/CargoItem';
import {DinDinghy} from './models/schema/4.2/DinDinghy';
import {MeteorologicalEnvironment} from './models/schema/4.2/MeteorologicalEnvironment';
import {PackageGroupType} from './models/schema/4.2/PackageGroupType';
import {RouteConstraint} from './models/schema/4.2/RouteConstraint';

export const getModel = (modelFileName :string,version?:string)=>{

    if(version === undefined){
        version = DEFAULT_VERSION;
    }
  
    if(modelFileName.indexOf(".") >0) {

        modelFileName = modelFileName.substring(0, (modelFileName.indexOf(".") -1));
    }
   
    if(modelFileName === 'ACRISFlight') return JSON.stringify(ACRISFlight);
    if(modelFileName === 'AircraftMovement') return JSON.stringify(AircraftMovement);
    if(modelFileName === 'AircraftMovementConstraint') return JSON.stringify(AircraftMovementConstraint);
    if(modelFileName === 'AircraftMovementEmergency') return JSON.stringify(AircraftMovementEmergency);
    if(modelFileName === 'AircraftMovementIdentification') return JSON.stringify(AircraftMovementIdentification);
    if(modelFileName === 'AircraftMovementRoute') return JSON.stringify(AircraftMovementRoute);

    if(modelFileName === 'AircraftTransport') return JSON.stringify(AircraftTransport);
    if(modelFileName === 'AircraftTransportFormation') return JSON.stringify(AircraftTransportFormation);
    if(modelFileName === 'AircraftTransportType') return JSON.stringify(AircraftTransportType);
    if(modelFileName === 'AirportFacility') return JSON.stringify(AirportFacility);
    if(modelFileName === 'CargoItem') return JSON.stringify(CargoItem);
    if(modelFileName === 'DinDinghy') return JSON.stringify(DinDinghy);
    if(modelFileName === 'MeteorologicalEnvironment') return JSON.stringify(MeteorologicalEnvironment);
    if(modelFileName === 'PackageGroupType') return JSON.stringify(PackageGroupType);
    if(modelFileName === 'RouteConstraint') return JSON.stringify(RouteConstraint);



    

}
export const getIATA= ()=>{
    return JSON.parse(JSON.stringify(icaoIataMapper));
  
}

export const getAlternative = ()=>{
    return JSON.parse(JSON.stringify(alternativeTags));
}

export const getCollectionModel = (version?:string)=>{
    return JSON.parse(JSON.stringify(collections));

}

