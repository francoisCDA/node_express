import express from "express";
import { ClientDAO } from "../dao/ClientDAO.js";

const clientDao = new ClientDAO();
clientDao.initLstClient();

console.log('clients initialisés')

const clients = express.Router();

clients.get('/', (req,res) => {
    res.json(clientDao.getAll())
})

clients.post('/', (req,res) => {
    res.json(clientDao.create(req.body))
})

clients.get('/:idClient', (req,res) => {
    res.json(clientDao.getClient(req.params.idClient))
})


export default clients
