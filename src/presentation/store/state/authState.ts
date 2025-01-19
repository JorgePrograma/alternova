import { User } from "@/src/domain/entities/User";

export interface AuthState{
    user: User | null
    token:string |null;
}