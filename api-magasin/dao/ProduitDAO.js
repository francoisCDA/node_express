import {readFileSync,writeFileSync} from "fs";
import { Produit } from "../classes/Produit.js";
import { resolve } from "path";

export class ProduitDAO {
    constructor() {
        this.fichier = resolve("./DataBase/produits.json");
        this.produits = [];
    }

    initLstProduits() {
        const DBClient = readFileSync(this.fichier, {encoding: "utf-8"});
        this.produits = JSON.parse(DBClient);
    }

    saveLstProduits() {
        writeFileSync(this.fichier, JSON.stringify(this.produits))
    }

    getAll() {
        return this.produits;
    }

    create({titre,prix,stock}) {
        const newProduit = new Produit(titre,prix,stock);
        this.produits.push(newProduit);
        this.saveLstProduits();
        return newProduit;
    }

    getProduit(id) {
        const product = this.produits.find( pr => pr.id == id) ;
        return product ? product : { "error": "id produit inconnu" };
    }   


}