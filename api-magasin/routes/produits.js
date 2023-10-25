import express from "express";
import { ProduitDAO } from "../dao/ProduitDAO.js";

const produitDao = new ProduitDAO();
produitDao.initLstProduits();
console.log('produits initialisés');


const produits = express.Router()

produits.get('/', (req,res) => {
    res.json(produitDao.getAll())
})

produits.post('/', (req,res) => {
    res.json(produitDao.create(req.body))
})

produits.get('/:idProduit', (req,res) => {
    res.json(produitDao.getProduit(req.params.idProduit))
})






export default produits;