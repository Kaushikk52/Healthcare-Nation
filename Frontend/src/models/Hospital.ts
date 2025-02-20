import { Address } from "./Address";
import { Brands } from "./Brands";
import { Rating } from "./Rating";
import { Review } from "./Review";

export interface Hospital {
    id: string;
    name: string;
    address: Address;
    beds: number;
    ownership: "Private" | "Government";
    description: string;
    phone: string;
    images: string[];
    departments: string[];
    specialities: string[];
    altMeds: string[];
    concerns: string[];
    services: string[];
    avgRating: number;
    ratings: Rating[];
    reviews: Review[];
    brands: Brands[];
    type: "Hospital";

  }