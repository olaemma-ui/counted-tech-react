// To parse this data:
//
//   import { Convert, MaterialRequest } from "./file";
//
//   const materialRequest = Convert.toMaterialRequest(json);

export interface MaterialRequest {
    id:               number;
    unit_id:          number;
    number:           number;
    amount:           string;
    item_number:      null;
    status:           string;
    user_id:          number;
    material_id:      number;
    approved_user_id: null;
    created_at:       Date;
    updated_at:       Date;
    material:         Material;
    user:             User;
    unit:             Material;
}

export interface Material {
    id:          number;
    name:        string;
    address_id?: number;
    created_at:  Date | null;
    updated_at:  Date | null;
}

export interface User {
    id:                number;
    name:              string;
    surname:           string;
    email:             null;
    phone:             string;
    image:             string;
    enable_2fa:        boolean;
    auth_code:         null;
    role_id:           number;
    company_id:        string;
    is_archive:        number;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
}

// // Converts JSON strings to/from your types
export class    MaterialConvert {
    public static toMaterial(json: string): Material {
        return JSON.parse(json);
    }

    public static materialToJson(value: Material): string {
        return JSON.stringify(value);
    }
}


export class MaterialRequestConvert {
    public static toMaterialRequest(json: string): MaterialRequest {
        return JSON.parse(json);
    }

    public static materialRequestToJson(value: MaterialRequest): string {
        return JSON.stringify(value);
    }
}


// To parse this data:
//
//   import { Convert, Todo } from "./file";
//
//   const todo = Convert.toTodo(json);

export interface Todo {
    id?:         number;
    address_id?: number;
    company_id?: number;
    name?:       string;
    created_at?: Date;
    updated_at?: Date;
}

// Converts JSON strings to/from your types
export class TodoConvert {
    public static toTodo(json: string): Todo {
        return JSON.parse(json);
    }

    public static todoToJson(value: Todo): string {
        return JSON.stringify(value);
    }
}
