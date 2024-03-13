// To parse this data:
//
//   import { RegisterResponse, RegisterResponse } from "./file";
//
//   const registerResponse = RegisterResponse.toRegisterResponse(json);

export interface RegisterResponse {
    message?: string;
    user?:    User;
}

export interface User {
    name?:      string;
    surname?:   string;
    email?:     string;
    phone?:     string;
    roleID?:    number;
    updatedAt?: Date;
    createdAt?: Date;
    id?:        number;
    companyID?: number;
}

// Converts JSON strings to/from your types
export class RegisterResponseConvert {
    public static toRegisterResponse(json: string): RegisterResponse {
        return JSON.parse(json);
    }

    public static registerResponseToJson(value: RegisterResponse): string {
        return JSON.stringify(value);
    }

    public static toUser(json: string): User {
        return JSON.parse(json);
    }

    public static userToJson(value: User): string {
        return JSON.stringify(value);
    }
}
