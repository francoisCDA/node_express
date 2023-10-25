import express from 'express'
import clients from './routes/clients.js';
import produits from './routes/produits.js';
import commandes from './routes/commande.js';
//import { ClientDAO } from './dao/ClientDAO';


const port = 3030;
const app = express();

app.use(express.json());
app.use('/clients', clients);
app.use('/produits', produits);
app.use('/commande', commandes);

app.listen(port, () => {

    //clientDao.initLstClient();
    console.log(`http://127.0.0.1:${port}`)

})