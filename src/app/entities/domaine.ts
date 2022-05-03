export interface Domaine 
{
    id?: number ; 
    libelle : string ;
}

export class Domaine 
{
    id?: number ; 
    libelle : string ;

    constructor(libelle: string) {
        this.libelle = libelle;
       
      }
    
}