//import { uuid } from "uuidv4"
import { v4 as uuidv4 } from "uuid"

export class Commande {
    constructor(client,lstProduits) {
        this.id = uuidv4();
        this.client = client;
        this.produits = lstProduits;
    }
}