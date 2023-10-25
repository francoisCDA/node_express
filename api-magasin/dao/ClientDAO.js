import {readFileSync,writeFileSync} from "fs"
import { Client } from "../classes/Client.js";
import { resolve } from "path";

export class ClientDAO {
    constructor() {
        this.fichier = resolve("./DataBase/clients.json");
        this.clients = [];
    }

    initLstClient() {
        const DBClient = readFileSync(this.fichier, {encoding: "utf-8"});
        this.clients = JSON.parse(DBClient);
    }

    saveLstClients() {
        writeFileSync(this.fichier, JSON.stringify(this.clients))
    }

    getAll() {
        return this.clients;
    }

    create({last,first,phone}) {
        const newCustomer = new Client(last,first,phone);
        this.clients.push(newCustomer);
        this.saveLstClients();
        return newCustomer;
    }

    getClient(id) {
        const customer = this.clients.find( cl => cl.id == id) ;
        return customer ? customer : { "error": "id client inconnu" };
    }


}