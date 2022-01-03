module.exports = {
    validateToken: (req, res, next) => {
        if (req.body.token !== undefined) {
            res.locals.token = req.body.token;
            next();
        }
        else
        {
            res.status(400).send("You need a token");
        }
    }
}