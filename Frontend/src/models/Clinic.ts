import { Address } from "./Address";
import { Rating } from "./Rating";
import { Review } from "./Review";

export interface Clinic{
    id: string;
    name: string;
    address: Address;
    ownership: "Private" | "Government";
    description: string;
    phone: string;
    images: string[];
    services: string[];
    avgRating: number;
    ratings: Rating[];
    reviews: Review[];
}