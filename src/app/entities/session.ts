import { Formateur } from "./formateur";
import { Formation } from "./formation";
import { Organisme } from "./organisme";
import { Participant } from "./participant";

export interface Session 
{
    id?: number ; 
    date_debut : Date ;
    date_fin : Date ;
    lieu : string ; 
    nb_participant? : number ; 
    formateur : Formateur ; 
    formation : Formation ;
    organisme? : Organisme;
    participants? : Participant[];

}

export class Session 
{
    id?: number ; 
    date_debut : Date ;
    date_fin : Date ;
    lieu : string ; 
    nb_participant? : number ; 
    formateur : Formateur ; 
    formation : Formation ;
    organisme? : Organisme;
    participants? : Participant[];


    constructor(date_debut: Date,date_fin : Date,
        lieu : string,formateur : Formateur,
        formation : Formation) {
        this.date_debut = date_debut;
        this.date_fin = date_fin ; 
        this.lieu = lieu ; 
        this.formation = formation ; 
        this.formateur = formateur ; 

      }
    
}