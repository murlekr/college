export interface RegisterData{
    username:string,
    email:string,
    password:string,
    password2:string,
}

export interface RegisterResponse{
    id:number,
    username:string,
    email:string,
}


export interface LoginData{
    username:string;
    password:string;
}

export interface LoginUser{
    id:number;
    username:string;
    email:string;
}

export interface LoginResponse{
    refresh:string;
    access:string;
    user:LoginUser;
}

export interface SignupFormData{
    username:string;
    email:string;
    password:string;
    password2:string;
}

export interface LoginFormData{
    username:string;
    password:string;
}
