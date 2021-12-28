
module.exports = (app) => {
    app.get('/post', (req, res) => {
        res.status(200).json({ message: 'Connected!' });
    });
}