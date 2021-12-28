const postsRoutes = require("express").Router();

postsRoutes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

module.exports = postsRoutes;