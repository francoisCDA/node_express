import { express } from "express";
import { ContactDAO } from "./dao/ContactDAO";
import { logDate } from "./middleware/logDate";
import { authentification } from "./middleware/authentification";

const contactDao = new ContactDAO();
contactDao.initContacts();


const app = express();


app.use(logDate);
app.use(express.json());


app.post('*', authentification);
app.put('*', authentification);
app.delete('*', authentification);


app.post('/contacts', (req,res) => {
    res.json(contactDao.newContact(req.body))
})



app.get('/contacts', (req,res) => {
    res.json(contactDao.getAll())
})

app.get('/contacts/:id', (req,res) => {
    res.json(contactDao.getContactByID(req.params.id))
})

app.put('/contacts/:id', (req,res) => {
    res.json(contactDao.putContact(req.params.id, req.body))
})

app.delete('/contacts/:id', (req,res) => {
    res.json(contactDao.delContact(req.params.id))
})


app.listen('3333', () => {
    console.log('http://127.0.0.1:33333');
})