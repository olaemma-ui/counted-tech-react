// To parse this data:
//
//   import { LoginRequestConvert, LoginRequest } from "./file";
//
//   const loginRequest = LoginRequestConvert.toLoginRequest(json);

export interface LoginRequest {
    email?:    string;
    password?: string;
}

// LoginRequestConverts JSON strings to/from your types
export class LoginRequestConvert {
    public static toLoginRequest(json: string): LoginRequest {
        return JSON.parse(json);
    }

    public static loginRequestToJson(value: LoginRequest): string {
        return JSON.stringify(value);
    }
}



// To parse this data:
//
//   import { RegisterRequestConvert, RegisterRequest } from "./file";
//
//   const registerRequest = RegisterRequestConvert.toRegisterRequest(json);

export interface RegisterRequest {
    email?:                string;
    password?:             string;
    name?:                 string;
    surname?:              string;
    companyName?:          string;
    logo?:                 string;
    phone?:                string;
    zipcode?:              string;
    street?:               string;
    stateID?:              string;
    legalEntityID?:        string;
    passwordConfirmation?: string;
    ort?:                  string;
    location?:             string;
    contactPerson?:        string;
}

// Converts JSON strings to/from your types
export class RegisterRequestConvert {
    public static toRegisterRequest(json: string): RegisterRequest {
        return JSON.parse(json);
    }

    public static registerRequestToJson(value: RegisterRequest): string {
        return JSON.stringify(value);
    }
}
