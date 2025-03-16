import { Address } from "./Address";
import { Rating } from "./Rating";
import { Review } from "./Review";

export interface MedicalFacility {
    id: number;
    name: string;
    phoneNumbers: string[];
    facts: string[];
    achievements: string[];
    images: string[];
    address: Address;
    website: string;
    ownership: Ownership; // PRIVATE or GOVERNMENT
    description:string;
    brands:string[];
    openDay:string;
    closeDay:string;
    hours:string;

    facilityType: FacilityType; // HOSPITAL or CLINIC
    specialities: string[]; // Ex: Cardiology, Neurology
    diagnosticServices: string[]; // Ex: MRI, CT Scan
    alternativeMedicines: string[]; // Ex: Ayurveda, Homeopathy
    publicSectorSchemes: string[]; // Ex: Ayushman Bharat, ESI
  
    accreditations: string[]; // Ex: NABH, JCI
    concerns: string[]; // Ex: Hygiene issues, Staff behavior
    acceptedInsurances: string[]; // Ex: Star Health, Max Bupa
    thirdPartyAdministrators: string[]; // Ex: Medi Assist, Vidal Health
  
    ratings: Rating[];
    reviews: Review[];
    avgRating: number;
  }
  
  export enum FacilityType {
    HOSPITAL = "HOSPITAL",
    CLINIC = "CLINIC",
  }

  export enum Ownership {
    PRIVATE = "PRIVATE",
    GOVERNMENT = "GOVERNMENT",
  }
  