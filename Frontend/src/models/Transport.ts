import { Address } from "./Address";
import { MedicalFacility } from "./MedicalFacility";

export interface Transport {
    id:string;
    name:string;
    address:Address;
    bed:number;
    website:string;
    openDay:string;
    closeDay:string;
    hours:string;
    description:string;
    phoneNumbers:string[];
    images:string[];
    videos:string[];
    ownership:Ownership;
    medicalFacility:MedicalFacility;
    brands:string[];
}

export enum Ownership {
    PRIVATE = "PRIVATE",
    GOVERNMENT = "GOVERNMENT",
  }
  