// To parse this data:
//
//   import { Convert, DashboardData } from "./file";
//
//   const dashboardData = Convert.toDashboardData(json);

export interface DashboardData {
    total?:          number;
    inactive?:       number;
    active?:         number;
    total_absent?:   number;
    total_vacation?: number;
}

// Converts JSON strings to/from your types
export class DashboardDataConvert {
    public static toDashboardData(json: string): DashboardData {    
        return JSON.parse(json);
    }

    public static dashboardDataToJson(value: DashboardData): string {
        return JSON.stringify(value);
    }
}



// To parse this data:
//
//   import { LocationDataConvert, LocationData } from "./file";
//
//   const locationData = LocationDataConvert.toLocationData(json);

export interface LocationData {
    id?:                       number;
    address?:                  string;
    latitude?:                 string;
    longitude?:                string;
    radius?:                   number;
    start_date?:               Date;
    end_date?:                 Date;
    memory?:                   Date;
    location_code?:            string;
    company_id?:               number;
    job_title_id?:             number;
    is_archive?:               number;
    created_at?:               Date;
    updated_at?:               Date;
    active_employee_count?:    number;
    inactive_employee_count?:  number;
    total_absent_employees?:   number;
    total_vacation_employees?: number;
    total_timer_count?:        string;
    timetable?:                Timetable[];
    calculator?:               Calculator;
    breaks?:                   Break[];
}

export interface Break {
    id?:         number;
    address_id?: number;
    date?:       string;
    start_time?: string;
    end_time?:   string;
    created_at?: Date;
    updated_at?: Date;
}

export interface Calculator {
    id?:         number;
    address_id?: number;
    price?:      number;
    quantity?:   number;
    hours?:      number;
    updated_at?: Date;
    created_at?: Date;
}

export interface Timetable {
    id?:         number;
    address_id?: number;
    start_time?: string;
    end_time?:   string;
    days?:       string;
    status?:     number;
    created_at?: Date;
    updated_at?: Date;
}

// Converts JSON strings to/from your types
export class LocationDataConvert {
    public static toLocationData(json: string): LocationData {
        return JSON.parse(json);
    }

    public static locationDataToJson(value: LocationData): string {
        return JSON.stringify(value);
    }
}






// To parse this data:
//
//   import { JobDataConvert, JobData } from "./file";
//
//   const jobData = JobDataConvert.toJobData(json);

export interface JobData {
    id?:         number;
    name?:       string;
    company_id?: number;
    created_at?: Date;
    updated_at?: Date;
}

// Converts JSON strings to/from your types
export class JobDataConvert {
    public static toJobData(json: string): JobData {
        return JSON.parse(json);
    }

    public static jobDataToJson(value: JobData): string {
        return JSON.stringify(value);
    }
}



// To parse this data:
//
//   import { Convert, CreateLocationRequest } from "./file";
//
//   const createLocationRequest = Convert.toCreateLocationRequest(json);

export interface CreateLocationRequest {
    address?:      string;
    latitude?:     number | string;
    longitude?:    number | string;
    radius?:       number | string;
    price?:        number | string;
    quantity?:     number | string;
    hours?:        number | string;
    job_title_id?: number | string;
    start_date?:   Date | string;
    end_date?:     Date | string;
    memory?:       Date | string;
    breaks?:       CreateLocationRequestBreak[];
    timetable?:    CreateLocationRequestTimetable[];
}

export interface CreateLocationRequestBreak {
    start?: string;
    end?:   string;
    day?:   string;
}
export interface CreateLocationRequestTimetable {
    start?:  string;
    end?:    string;
    day?:    string;
    status?: any;
}

// Converts JSON strings to/from your types
export class CreateLocationRequestConvert {
    public static toCreateLocationRequest(json: string): CreateLocationRequest {
        return JSON.parse(json);
    }

    public static createLocationRequestToJson(value: CreateLocationRequest): string {
        return JSON.stringify(value);
    }
}
