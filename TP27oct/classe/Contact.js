import { v4 as uuidv4 } from "uuid"

export class Contact {
    constructor(nom,prenom,telephone,email){
        this.id = uuidv4();
        this.nom = nom;
        this.prenom = prenom;
        this.telephone = telephone;
        this.email = email;
    }
}