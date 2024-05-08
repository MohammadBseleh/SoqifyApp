export interface loginRequest{
    name: string;
    password: string;
}
export enum Role {
    MERCHANT = 3,
    SUPPLIER = 2
}
export interface SignupRequest {
    name: string;
    email: string;
    password: string;
    role: number;
    storename: string;
}