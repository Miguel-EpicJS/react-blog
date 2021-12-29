const fs = require('fs');

const postsRoutes = require("express").Router();

postsRoutes.get("/", (req, res) => {
    res.status(200).json( (require("../mocks/posts.json")) );
});
postsRoutes.get("/:id", (req, res) => {

    const posts = JSON.parse(fs.readFileSync("server/mocks/posts.json"));

    console.log((posts[req.params.id - 1]));

    (posts[req.params.id - 1]) !== undefined ? res.status(200).json( (posts[req.params.id - 1]) ) : res.status(404).json( "Not Found" )
});
postsRoutes.post("/", (req, res) => {
    const posts = JSON.parse(fs.readFileSync("server/mocks/posts.json"));
    const {post} = req.body;

    const addPost = {
        ...post,
        id: posts.length + 1,
        createdAt: new Date().getTime(), 
        updatedAt: new Date().getTime(), 
        publishedAt: new Date().getTime(), 
        deleted: false, 
        likes: 0
    }

    const keys = Object.keys(posts[0]);
    
    keys.forEach(key => {
        console.log(key + "|" + addPost.hasOwnProperty(key));
    })

    const ok = keys.every(key => {
        return addPost.hasOwnProperty(key);
    });

    if (ok === true) {
        posts.push(addPost);
        fs.writeFileSync("server/mocks/posts.json", JSON.stringify(posts));
        res.status(200).send("Successfully created");
    }

    
})


module.exports = postsRoutes;