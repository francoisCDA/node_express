import express from "express";
import { CommandeDAO } from "../dao/CommandeDAO.js";

const commandeDao = new CommandeDAO();
commandeDao.initLstCommandes();
console.log('commandes initialsées');


const commandes = express.Router();

commandes.get('/', (req,res) => {
    res.json(commandeDao.getAll())
})

commandes.post('/', (req,res) => {
    res.json(commandeDao.create(req.body))
})

commandes.get('/:idCommande', (req,res) => {
    res.json(commandeDao.getCommande(req.params.idCommande))
})


export default commandes;