export interface Formation 
{
    id?: number ; 
    annee? : number ; 
    budget? : number ; 
    duree?: number; 
    nb_session? : number ; 
    titre : string ; 
    type? : string ; 
    domaine_id? : number ;
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
    domaine_id? : number ;

    constructor(titre: string) {
        this.titre = titre;
       
      }
    
}