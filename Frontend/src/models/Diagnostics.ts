import { Address } from "./Address";


export interface Diagnostics{
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

        diagnostic: string[]; // Ex: MRI, CT Scan
        thirdPartyAdministrators: string[]; // Ex: Medi Assist, Vidal Health
        accrediations: string[]; // Ex: NABH, JCI
        insurance:string[];
        tpa:string[];
}

export enum Ownership {
    PRIVATE = "PRIVATE",
    GOVERNMENT = "GOVERNMENT",
  }