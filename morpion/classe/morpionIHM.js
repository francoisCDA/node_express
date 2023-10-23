import input from "../tools/readInput.js";



class Morpion {

    constructor() {
        this.grille = [[' ',' ',' '],[' ',' ',' '],[' ',' ',' ']];
        this.joueurUn = true;
    }

    async game() { 
        let gameOver = false

        while (!gameOver) {
            
            let nextMove = true ;

            while (nextMove) {
                this.affGrille();
               
                console.log('Au ',this.joueurUn ? 'Joueur X' : 'Joueur O', ' de jouer');
                console.log('Indiquer le numéro de la case que vous souhaitez jouer :');
                this.affnum();
                let choix = await input("case numéro :");
               
                nextMove = this.joue(choix);
            }

            

            this.joueurUn = !this.joueurUn ;
        }

        gameOver = true;

    }

    affGrille() {
        this.grille.forEach( row => {
            console.log(`        [${row[0]}|${row[1]}|${row[2]}]`)
        })
    }

    affnum() {
        let cmpt = 0;
        this.grille.forEach( row => {
            console.log(`        [${++cmpt}|${++cmpt}|${++cmpt}]`)
        })
    }

    joue(num) {
        let coup = this.getPosition(num);
        if (coup.val == ' ') {
            this.grille[parseInt(coup.haut)][parseInt(coup.larg)] = this.joueurUn ? 'X' : 'O' ;
            return false
        } else {
            return true
        };
    }

    getPosition(num) {
        let cmpt = 0
        for (let i = 0 ; i < this.grille.length ; i++) {
            for (let j = 0 ; j < this.grille[i].length ; j++ ) {
                cmpt++;
                if (cmpt == num) {
                    return {haut: i, larg: j, val: this.grille[i][j]}
                }
            }
        }
        return 'echec'
    }

    testVictoire() {
        if (getPosition(1).val == this.getPosition(5) && this.getPosition(1).val == this.getPosition(9)) { return true }
        if (getPosition(7).val == this.getPosition(5) && this.getPosition(5).val == this.getPosition(3)) { return true }
        
        this.grille.forEach( ligne => {
            if (ligne[0] == ligne[1] && ligne[0] == ligne[2]) {
                return true;
            }
        })

        
        
    }

}

export default Morpion