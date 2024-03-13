// To parse this data:
//
//   import { Convert, LoginResponse } from "./file";
//
//   const loginResponse = Convert.toLoginResponse(json);

export interface LoginResponse {
    status?:  boolean;
    type?:    string;
    message?: string;
    user?:    User;
}

export interface User {
    id?:              number;
    name?:            string;
    surname?:         string;
    email?:           string;
    phone?:           string;
    image?:           string;
    enable2Fa?:       boolean;
    authCode?:        null;
    roleID?:          number;
    companyID?:       string;
    isArchive?:       number;
    emailVerifiedAt?: null;
    createdAt?:       Date;
    updatedAt?:       Date;
    token?:           string;
    role?:            Role;
}

export interface Role {
    id?:        number;
    name?:      string;
    createdAt?: null;
    updatedAt?: null;
}

// Converts JSON strings to/from your types
export class LoginResponseConvert {
    public static toLoginResponse(json: string): LoginResponse {
        return JSON.parse(json);
    }

    public static loginResponseToJson(value: LoginResponse): string {
        return JSON.stringify(value);
    }

    public static toUser(json: string): User {
        return JSON.parse(json);
    }

    public static userToJson(value: User): string {
        return JSON.stringify(value);
    }

    public static toRole(json: string): Role {
        return JSON.parse(json);
    }

    public static roleToJson(value: Role): string {
        return JSON.stringify(value);
    }
}
