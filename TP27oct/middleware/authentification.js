const cleSuperSecure = "123456789";

export function authentification(req,res,next) {

    if (req.body.cle != cleSuperSecure) {
        res.sendStatus(401);
    }


    next();
}