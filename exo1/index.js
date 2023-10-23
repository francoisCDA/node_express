import {appendFileSync, writeFileSync, readFileSync, existsSync, mkdir} from 'fs';
import LineByLine from 'n-readlines';

const fichierlist = 'lstRepertoire.txt';
const lstDossier = ['support','demos','exercices','corrections','src','assets','bugs','listedecourses'];

writeFileSync(fichierlist,"",{encoding:"utf8"})

lstDossier.forEach(n => { appendFileSync(fichierlist,`${n}\n`,'utf8') })

const data = readFileSync(fichierlist, 'utf8')

console.log(data)

const monfichier = new LineByLine(fichierlist);

let ligneSuivante = '';
while(ligneSuivante = monfichier.next()) {
    const dossier = ligneSuivante.toString();

    if (!existsSync(`./${dossier}`)) {
        mkdir(`./${dossier}`, (err) => {
            if (err) {
                return console.error(err);
            }
            console.log(dossier);
        })
    }
     
}

