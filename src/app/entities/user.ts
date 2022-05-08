
export interface User 
{
    code?: number ; 
    login : string ; 
    password : string ; 
}

export class Formateur 
{
    code?: number ; 
    login : string ; 
    password : string ; 



    constructor(login: string,password : string,
        ) {
        this.login = login;
        this.password = password ; 
       
      }
    
}