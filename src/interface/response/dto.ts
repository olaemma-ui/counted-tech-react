// To parse this data:
//
//   import { Convert, EmployeeData } from "./file";
//
//   const employeeData = Convert.toEmployeeData(json);

export interface EmployeeData {
    id?:                number;
    name?:              string;
    surname?:           string;
    email?:             string;
    phone?:             string;
    image?:             string;
    enable_2fa?:        boolean;
    auth_code?:         null;
    role_id?:           number;
    company_id?:        string;
    is_archive?:        number;
    email_verified_at?: null;
    created_at?:        Date;
    updated_at?:        Date;
    role?:              Role;
    employee?:          Employee;
}

export interface Employee {
    id?:                 number;
    personal_number?:    string;
    address_id?:         number;
    user_id?:            number;
    allow_gps?:          number;
    allow_minimize?:     number;
    company_id?:         number;
    job_title_id?:       number;
    remaining_vacation?: number;
    total_vacation?:     number;
    license?:            string;
    status?:             string;
    created_at?:         null;
    updated_at?:         Date;
    address?:            Address;
}

export interface Address {
    id?:            number;
    address?:       string;
    latitude?:      string;
    longitude?:     string;
    radius?:        number;
    start_date?:    string;
    end_date?:      string;
    memory?:        string;
    location_code?: string;
    company_id?:    number;
    job_title_id?:  number;
    is_archive?:    number;
    created_at?:    null;
    updated_at?:    null;
}

export interface Role {
    id?:         number;
    name?:       string;
    created_at?: null;
    updated_at?: null;
}

// Converts JSON strings to/from your types
export class Convert {
    public static toEmployeeData(json: string): EmployeeData {
        return JSON.parse(json);
    }

    public static employeeDataToJson(value: EmployeeData): string {
        return JSON.stringify(value);
    }

    public static toEmployee(json: string): Employee {
        return JSON.parse(json);
    }

    public static employeeToJson(value: Employee): string {
        return JSON.stringify(value);
    }

    public static toAddress(json: string): Address {
        return JSON.parse(json);
    }

    public static addressToJson(value: Address): string {
        return JSON.stringify(value);
    }

    public static toRole(json: string): Role {
        return JSON.parse(json);
    }

    public static roleToJson(value: Role): string {
        return JSON.stringify(value);
    }
}
