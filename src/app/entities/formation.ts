import { Domaine } from "./domaine";

export interface Formation 
{
    id?: number ; 
    annee? : number ; 
    budget? : number ; 
    duree?: number; 
    nb_session? : number ; 
    titre : string ; 
    type? : string ; 
    domaine? : Domaine

}

export class Formation 
{
    id?: number ; 
    annee? : number ; 
    budget? : number ; 
    duree?: number; 
    nb_session? : number ; 
    titre : string ; 
    type? : string ; 
    domaine? : Domaine

    constructor(titre: string) {
        this.titre = titre;
       
      }
    
}