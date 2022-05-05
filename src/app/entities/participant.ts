import { Organisme } from "./organisme";
import { Pays } from "./pays";
import { Profil } from "./profil";

export interface Participant 
{
    id?: number ; 
    email: string; 
    nom : string ; 
    prenom : string ; 
    tel : string ; 
    organisme? : Organisme;
    pays? : Pays;
    profil? : Profil ;

}

export class Participant 
{
    id?: number ; 
    email: string; 
    nom : string ; 
    prenom : string ; 
    tel : string ; 
    organisme? : Organisme;
    pays? : Pays;
    profil? : Profil ;


    constructor(nom: string,prenom : string,
        email : string,tel : string) {
        this.nom = nom;
        this.prenom = prenom ; 
        this.email = email ; 
        this.tel = tel ; 
       
      }
    
}