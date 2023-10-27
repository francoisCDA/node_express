import {readFileSync,writeFileSync} from "fs"
import { resolve } from "path";
import { Contact } from "../classe/Contact";


export class ContactDAO {
    constructor() {
        this.fichier = resolve("./DB/lst_contacts.json");
        this.contacts = [];
    }

    initContacts() {
        const DB = readFileSync(this.fichier, {encoding: "utf-8"});
        this.clients = JSON.parse(DB);
    } 

    saveDB() {
        writeFileSync(this.fichier, JSON.stringify(this.contacts))
    }

    newContact({nom,prenom,telephone,email}) {
        const nouvo = new Contact(nom,prenom,telephone,email);
        this.contacts.push(nouvo);
        this.saveDB();
        return nouvo;
    }

    getAll() {
        return this.contacts;
    }

    getContactByID(id) {
        const cont = this.contacts.find( co => co.id == id ) ;
        return cont ? cont : { "error": "contact inconnu"}
    }

    putContact(id,contact) {
        const indx = this.contacts.findIndex(co => co.id == id ) ;
        this.clients[indx] = contact ;
        this.saveDB();
        return contact;
    }

    delContact(id) {
        this.contacts = this.contacts.filter( co => co.id != id ) ;
        return 'contact eliminé'
    }


}