import input from "../tools/readInput.js";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import BetaMorpion from "./BetaMorpion.js";

class Morpion {

    constructor(mode) {
        this.grille = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
        this.joueurUn = true;
        this.partie = [];
        this.IA = (mode);
    }

    async game() { 
        let gameOver = false

        while (!gameOver) {
            
            let nextMove = true ;

            while (nextMove) {
                console.log('');
                this.affGrille();
                console.log('     Au tour du','     Indiquer le numéro de la case');
                console.log('     ',this.joueurUn ? 'Joueur X' : 'Joueur O','         que vous souhaitez jouer');

                if (!this.IA || this.joueurUn ) {
                    let choix = await input("                                 => ");
                    nextMove = this.joue(choix);
                } else {
                    let IAmove = BetaMorpion([ [...this.grille[0]],[...this.grille[1]],[...this.grille[2]]])
                    this.partie.push(IAmove);
                    this.grille[IAmove.haut][IAmove.larg] = 'O' ;
                    nextMove = false;
                }
            }

            if ( this.testVictoire()) {
                this.affGrille();
                console.log(`Victoire du joueur ${this.joueurUn ? 'X' : 'O' }`);
                gameOver = true ;
               
            } else {
                if (this.partie.length == 9) {
                    this.affGrille();
                    console.log('Match nul');
                    gameOver = true;
                } else {
                    this.joueurUn = !this.joueurUn ; 
                }
            }
        }

        console.log('');

        let save = await input("Souhaitez-vous enregistrer la partie ? (y/N) : ");

        if ((save.toUpperCase()) == 'Y') {

            let gameData = 'Partie jouée le ' + Date() + '\nSéquence de jeu :\n' + JSON.stringify(this.partie) + '\n\nPosition finale :\n';

            this.grille.forEach(ligne => {
                gameData += JSON.stringify(ligne) + '\n'
            })

            let nom = await input("Indiquer un nom de fichier : ");

            const savDir = './parties_sauvegardees' ;

            if (!existsSync(savDir)) {
                mkdirSync(savDir)
            }

            const pathFichier = savDir + '/' + nom + '.txt' ;

            if (!existsSync(pathFichier)) {
               
                const grilleNum = 'Positions des coups :\n  [7|8|9]\n  [4|5|6]\n  [1|2|3]\n ______________________________ \n';
                writeFileSync(pathFichier, grilleNum ,{encoding:'utf8'});
            
            } 

            appendFileSync(pathFichier, '\n' + gameData ,{encoding:'utf8'});
            
            console.log('');
            console.log(`Partie enregistrée dans le fichier `,pathFichier);

        } 

        console.log('');
        console.log("À bientôt :)");

    }

    affGrille() {
        let cmpt = 7;
        this.grille.forEach( row => {
            console.log(`      [${row[0]}|${row[1]}|${row[2]}]                   [${(this.getPosition(cmpt++)).val == ' ' ? cmpt-1 : ' '}|${(this.getPosition(cmpt++)).val == ' ' ? cmpt-1 : ' '}|${(this.getPosition(cmpt++)).val == ' ' ? cmpt-1 : ' '}]`)
            cmpt-=6;
        })
    }


    joue(num) {
        let coup = this.getPosition(num);
        if (coup.val == ' ') {
            this.grille[parseInt(coup.haut)][parseInt(coup.larg)] = this.joueurUn ? 'X' : 'O' ;
            this.partie.push(num);
            return false
        } else {
            return true
        };
    }

    getPosition(num) {
        let cmpt = 7 ;
        for (let i = 0 ; i < this.grille.length ; i++) {
            for (let j = 0 ; j < this.grille[i].length ; j++ ) {
                if (cmpt == num) {
                    return {haut: i, larg: j, val: this.grille[i][j]}
                }
                cmpt++;
            }
            cmpt-=6;
        }
        return 'echec'
    }


    testVictoire() {

        if ((this.getPosition(1)).val != ' ' && (this.getPosition(1)).val == (this.getPosition(5)).val && (this.getPosition(1)).val == (this.getPosition(9)).val) { return true }
        if ((this.getPosition(7)).val != ' ' && (this.getPosition(7)).val == (this.getPosition(5)).val && (this.getPosition(5)).val == (this.getPosition(3)).val) { return true }

        let ret = false ;
        this.grille.forEach( ligne => {
            if (ligne[0] != ' ' && ligne[0]==ligne[1] && ligne[0]==ligne[2]) {
                ret = true;
                return true; // le return stop le foreach mais pas testVictoire()...
            }
        })
        if (ret) { return true }

        for (let i = 0 ; i < 3 ; i++) {
            if (this.grille[0][i] != ' ' && this.grille[0][i] == this.grille[1][i] && this.grille[1][i] == this.grille[2][i] ) {return true}
        }

        return false
        
    }

}

export default Morpion