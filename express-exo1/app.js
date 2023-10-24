import express from "express";
import {appendFileSync, readFileSync, writeFileSync} from "fs";

const app = express();

app.use(express.json());


app.post('/todos', (req,res) => {
    const save = saveTodo(req.body);
    res.send(save);
})

app.put('/todos/:todoID', (req,res) => {
    const save = updTodo(req.body)
    res.send(save)
})

app.get('/todos/all', (req,res) => {
    let arrayDB = allDBArray();
    res.send(arrayDB);
})

app.get('/todos/:todoID', (req,res) => {
    let maTodo = getOneTodo(req.params.todoID);
    res.send(maTodo);
})

app.delete('/todos/:todoID', (req,res) => {
    deleteTodo(req.params.todoID)

    res.send(`todo ${req.params.todoID} supprimée`)
})

app.get('/todos/titre', (req,res) => {
    let maToDo = getToDoByTitre(req.body)
    
    res.json(maToDo);
})




app.listen("3000", () => {
    console.log("http://127.0.0.1:3000")
})



const pathTodos = './todo/saveTodo.json'
let comptTodo = 0 ;

( () => {
    let DB = JSON.parse(readFileSync(pathTodos));
    const keys = Object.keys(DB);
    comptTodo = keys[keys.length-1]; 
} )()

function getToDoByTitre(titre) {
    const maDB = JSON.parse(readFileSync(pathTodos));
    const lstTitre = Object.keys(maDB).filter(key => maDB[key].titre == titre).map( key => maDB[key]);

    return lstTitre;
}


function deleteTodo(id) {
    const maDB = JSON.parse(readFileSync(pathTodos));
    delete maDB[id];
    writeFileSync(pathTodos,JSON.stringify(maDB));
}

function getOneTodo(id) {
    const maDB = JSON.parse(readFileSync(pathTodos));
    const maToDo = JSON.stringify(maDB[`${id}`]);
    return maToDo ;
}


function allDBArray() {
    const maDB = JSON.parse(readFileSync(pathTodos));
    const dbArray = JSON.stringify(Object.keys(maDB).map( key => maDB[key]));
    return dbArray;
}


function updTodo(data) {
    let maDB = JSON.parse(readFileSync(pathTodos));
    maDB[data.id] = data ;
    writeFileSync(pathTodos,JSON.stringify(maDB));

    return maDB[data.id];
}


function saveTodo(data) {
   
    let newtodo = {...data,id: ++comptTodo};
    let maDB = JSON.parse(readFileSync(pathTodos));
    maDB[`${comptTodo}`] = newtodo ;

    writeFileSync(pathTodos,JSON.stringify(maDB))

    return newtodo;
}
