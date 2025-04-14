import { Address } from "./Address";
import { MedicalFacility } from "./MedicalFacility";

export interface Bank {
    id:string;
    name:string;
    address:Address;
    bed:number;
    website:string;
    openDay:string;
    closeDay:string;
    fromTime:string;
    toTime:string;
    description:string;
    phoneNumbers:string[];
    images:string[];
    videos:string[];
    ownership:Ownership;
    medicalFacilities:MedicalFacility[];
    brands:string[];
    accreditations:string[];
}

export enum Ownership {
    PRIVATE = "PRIVATE",
    GOVERNMENT = "GOVERNMENT",
  }
  