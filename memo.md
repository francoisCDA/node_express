#commmandes

npm init
npm init -y 

npm i colors // installer un package de colorisation de la console

npm install -O -D -g

npm update  --dev -g

npm list -g 

npm view

npm outdated

npm rm <package>

npm audit
npm audit fix --force

npm run <commande> // les commandes sont dans l'objet scripts

npx crate-react-app myresactapp // utilise le moduel sans l'installer

##modules

http url path fs util os

### creer un module
function truc(para) {
	// faire des truc de fonction
}

function machon(para) {
	
}

module.exports = {truc, machin}

###importer un module :
const = require('./cheminpmodule.js)

####modules installé

const = require(nomdumodule)

##utiliser la syntaxe ES6, ajouter au package.json
type:"module" // ou utiliser l'extension .mjs (module javascript)


npm i n-readline