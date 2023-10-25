import { v4 as uuidv4 } from "uuid"

export class Produit {
    constructor(titre,prix,stock) {
        this.id = uuidv4();
        this.titre = titre;
        this.prix = prix;
        this.stock = stock;
    }
}