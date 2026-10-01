export interface Student {
    id: number;
    name:string;
    email:string;
    phone:string;
    department:string;
    year:number;
    created_at:string;
    updated_at:string;
}

export interface CreateStudentData {
    name:string;
    email:string;
    phone:string;
    department:string;
    year:number;
}