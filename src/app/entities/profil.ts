export interface Profil 
{
    id?: number ; 
    libelle : string ;
}

export class Profil 
{
    id?: number ; 
    libelle : string ;

    constructor(libelle: string) {
        this.libelle = libelle;
       
      }
    
}