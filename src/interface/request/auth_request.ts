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
    email?:                 string;
    password?:              string;
    name?:                  string;
    surname?:               string;
    company_name?:          string;
    phone?:                 string;
    zipcode?:               string;
    street?:                string;
    state_id?:              string;
    legal_entity_id?:       string;
    password_confirmation?: string;
    ort?:                   string;
    location?:              string;
    contact_person?:        string;
    logo?:                  any;
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
