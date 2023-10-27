export function logDate(req,res,next) {
    console.log(`${Date.now()} : `,req.body);
    next();
}