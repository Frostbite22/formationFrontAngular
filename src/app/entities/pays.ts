export interface Pays 
{
    id?: number ; 
    nom : string ;
}

export class Pays 
{
    id?: number ; 
    nom : string ;

    constructor(nom: string) {
        this.nom = nom;
       
      }
    
}