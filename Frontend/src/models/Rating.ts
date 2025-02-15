import { Clinic } from "./Clinic";
import { Hospital } from "./Hospital";
import { User } from "./User";

export interface Rating{
    id: string;
    user:User;
    // hospital:Hospital | null;
    // clinic: Clinic | null;
    rating: number;

}