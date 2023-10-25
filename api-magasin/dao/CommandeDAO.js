import {readFileSync,writeFileSync} from "fs"
import { Commande } from "../classes/Commande.js"
import { resolve } from "path";

export class CommandeDAO {
    constructor() {
        this.fichier = resolve("./DataBase/commandes.json");
        this.fichierClients = resolve("./DataBase/clients.json");
        this.fichierProduits = resolve("./DataBase/produits.json");
        this.commandes = [];
    }

    initLstCommandes() {
        const DBcommande = readFileSync(this.fichier, {encoding: "utf-8"});
        this.commandes = JSON.parse(DBcommande);
    }
    
    saveLstCommandes() {
        writeFileSync(this.fichier, JSON.stringify(this.commandes))
    }

    getAll() {
        return this.commandes;
    }

    create({idClient,lstProduits}) {

        const clients = JSON.parse(readFileSync(this.fichierClients, {encoding: "utf-8"}));
        const client = clients.find( cl => cl.id == id)
        if (!client) { return { "error" : ` id client ${idClient} inconnu` }}

        const produits = JSON.parse(readFileSync(this.fichierProduits, {encoding: "utf-8"}));
        for (let i = 0 ; i < lstProduits.length ; i++ ) {
            const produit = produits.find( pr => pr.id == lstProduits[i].id )
            if (!produit) { return { "error": `id du produit ${lstProduits[i]} inconnu`}}
        }
        

        const newCommande = new Commande(idClient,lstProduits);
        this.commandes.push(newCommande);
        this.saveLstCommandes();
        return newCommande;
    }

    getCommande(id) {
        const command = this.commandes.find( co => co.id == id) ;
        return command ? command : { "error": `commande n°${id} non répertoriée` };
    }  


}