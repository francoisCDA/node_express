
function tryVictory (grille) {

    if ( ( grille[0][0] != ' ' && grille[0][0] == grille[1][1] && grille[0][0] == grille[2][2] ) || 
         ( grille[0][2] != ' ' && grille[0][2] == grille[1][1] && grille[0][2] == grille[2][0] ) ) {
            return true
         }


    for ( let i = 0 ; i < 3 ; i++) {
            if ( grille[0][i] != ' ' && grille[0][i] == grille[1][i] && grille[0][i] == grille[2][i] ||
                 grille[i][0] != ' ' && grille[i][0] == grille[i][1] && grille[i][0] == grille[i][2] ) {
                    return true;
                 }
        
    }

    return false

}



export default function BetaMorpion(grille) {

    let reponse = {} ;

    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++ ) {
            if (grille[i][j] == ' ') {
                const tryGrille = [[...grille[0]],[...grille[1]],[...grille[2]]];
                tryGrille[i][j] = 'O' ;
                const essai = tryVictory(tryGrille)
                if (essai == true){
                    reponse = { haut: i, larg: j };
                    return reponse;
                } 
            }
        }
    }

    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++ ) {
            if (grille[i][j] == ' ') {
                const tryGrille = [[...grille[0]],[...grille[1]],[...grille[2]]];
                tryGrille[i][j] = 'X' ;
                const essai = tryVictory(tryGrille)
                if (essai == true){
                    reponse = { haut: i, larg: j };
                    return reponse;
                } 
            }
        }
    }

    const freecel = [] ;

    for (let i = 0 ; i < 3 ; i++) {
        for (let j = 0 ; j < 3 ; j++ ) {
            if (grille[i][j] == ' ') {
                freecel.push({ haut: i, larg: j })
            }
        }
    }
 
    return freecel[Math.floor(Math.random()*freecel.length)]

}