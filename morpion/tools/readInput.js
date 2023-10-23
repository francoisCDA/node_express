import readline from "readline";

 function input(saisie) {
    const readL = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })

    return new Promise((resolve) => {
        readL.question(saisie, (reponse) => {
            readL.close();
            resolve(reponse);
        });
    });
}

export default input