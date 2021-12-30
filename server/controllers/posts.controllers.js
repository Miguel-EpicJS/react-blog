const fs = require("fs");

module.exports = {
    getPosts: (req, res) => {
        res.status(200).json( (require("../mocks/posts.json")) );
    },
    getPost: (req, res) => {

        const posts = JSON.parse(fs.readFileSync("server/mocks/posts.json"));
        
        (posts[req.params.id - 1]) !== undefined ? res.status(200).json( (posts[req.params.id - 1]) ) : res.status(404).json( "Not Found" )
    },
    postPost: (req, res) => {
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
    
        const ok = keys.every(key => {
            return addPost.hasOwnProperty(key);
        });
    
        if (ok === true) {
            posts.push(addPost);
            fs.writeFileSync("server/mocks/posts.json", JSON.stringify(posts));
            res.status(200).send("Successfully created");
        } 
    },
    putPost: (req, res) => {
        const posts = JSON.parse(fs.readFileSync("server/mocks/posts.json"));
        const updatePost = posts[req.params.id - 1];
        const {post} = req.body;
    
        const keys = Object.keys(updatePost);
    
        keys.forEach(key => {
            if(post.hasOwnProperty(key))
            {
                updatePost[key] = post[key];
            }
        });
    
        posts[req.params.id - 1] = updatePost;
        fs.writeFileSync("server/mocks/posts.json", JSON.stringify(posts));
    
        res.status(200).send("Updated");
    },
    deletePost: (req, res) => {
        const posts = JSON.parse(fs.readFileSync("server/mocks/posts.json"));
        posts[req.params.id - 1].deleted = true;
        fs.writeFileSync("server/mocks/posts.json", JSON.stringify(posts));
    
        res.status(200).send("Deleted");
    }
}