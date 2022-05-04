export interface Organisme 
{
    id?: number ; 
    libelle : string ;
}

export class Organisme 
{
    id?: number ; 
    libelle : string ;

    constructor(libelle: string) {
        this.libelle = libelle;
       
      }
    
}