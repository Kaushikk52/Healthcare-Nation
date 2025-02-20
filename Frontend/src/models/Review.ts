import { Clinic } from "./Clinic";
import { Hospital } from "./Hospital";
import { User } from "./User";

export interface Review{
    id: string;
    comment: string;
    user: User;
    hospital: Hospital | null;
    clinic: Clinic | null;
    

}