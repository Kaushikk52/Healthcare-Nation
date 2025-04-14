import { Address } from "./Address";
import { MedicalFacility } from "./MedicalFacility";

export interface Center {
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
    facts: string[];
    achievements: string[];
    images:string[];
    videos:string[];
    ownership:Ownership;
    medicalFacilities:MedicalFacility[];
    brands:string[];

    type:Centertype;
    specialities: string[]; // Ex: Cardiology, Neurology
    diagnostics: string[]; // Ex: MRI, CT Scan
    alternativeMedicines: string[]; // Ex: Ayurveda, Homeopathy
    publicSectorSchemes: string[]; // Ex: Ayushman Bharat, ESI
  
    accreditations: string[]; // Ex: NABH, JCI
    concerns: string[]; // Ex: Hygiene issues, Staff behavior
    acceptedInsurances: string[]; // Ex: Star Health, Max Bupa
    thirdPartyAdministrators: string[]; // Ex: Medi Assist, Vidal Health
  
}

export enum Ownership {
    PRIVATE = "PRIVATE",
    GOVERNMENT = "GOVERNMENT",
}

export enum Centertype {
    Dialysis = "dialysis",
    IVF = "ivf",
    BURNS = "burns",
    TRANSPLANT = "hairTransplant",
    CHECKUP = "checkup",
    REHAB = "rehabilitation"
}