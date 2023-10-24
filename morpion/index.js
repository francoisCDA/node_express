import Morpion from "./classe/morpionIHM.js";
import input from "./tools/readInput.js";


let mode = await input("Jouer contre l'ordinateur ? y/N ");



if (mode.toUpperCase() == 'Y') {
    console.log("Partie contre IA");
    mode = true
} else { 
    console.log("Partie 2 joueurs");
    mode = false 
} 


const partie = new Morpion(mode);

partie.game()

