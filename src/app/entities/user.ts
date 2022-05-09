import { Role } from "./role";

export interface User 
{
    code?: number ; 
    login : string ; 
    password : string ; 
    roles?: Role[]
}

export class User 
{
    code?: number ; 
    login : string ; 
    password : string ; 
    roles? : Role[]



    constructor(login: string,password : string,
        ) {
        this.login = login;
        this.password = password ; 
       
      }
    
}