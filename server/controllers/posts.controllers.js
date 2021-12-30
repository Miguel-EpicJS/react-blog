const postsModels = require("../models/posts.models");

module.exports = {
    getPosts: (req, res) => {
        try {
            res.status(200).json(postsModels.readJson());
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    getPost: (req, res) => {
        try {
            const posts = postsModels.readJson();

            (posts[req.params.id - 1]) !== undefined ? res.status(200).json((posts[req.params.id - 1])) : res.status(404).json("Not Found")
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    postPost: (req, res) => {
        try {
            const posts = postsModels.readJson();
            const { post } = req.body;

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
                postsModels.updateJson(posts);
                res.status(200).send("Successfully created");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    putPost: (req, res) => {
        try {
            const posts = postsModels.readJson();
            const updatePost = posts[req.params.id - 1];
            const { post } = req.body;

            const keys = Object.keys(updatePost);

            keys.forEach(key => {
                if (post.hasOwnProperty(key)) {
                    updatePost[key] = post[key];
                }
            });

            posts[req.params.id - 1] = updatePost;
            postsModels.updateJson(posts);

            res.status(200).send("Updated");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    deletePost: (req, res) => {
        try {
            const posts = postsModels.readJson();
            posts[req.params.id - 1].deleted = true;
            postsModels.updateJson(posts);

            res.status(200).send("Deleted");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }

    }
}