import { Organisme } from "./organisme";

export interface Formateur 
{
    id?: number ; 
    nom : string ; 
    prenom : string ; 
    email: string; 
    tel : string ; 
    type : string ; 
    organisme? : Organisme;

}

export class Formateur 
{
    id?: number ; 
    nom : string ; 
    prenom : string ; 
    email: string; 
    tel : string ; 
    type : string ; 
    organisme? : Organisme;


    constructor(nom: string,prenom : string,
        email : string,tel : string,
        type : string) {
        this.nom = nom;
        this.prenom = prenom ; 
        this.email = email ; 
        this.tel = tel ; 
        this.type = type ; 
       
      }
    
}