const jwt = require('jsonwebtoken');
const postsModels = require("../models/posts.models");
const usersModels = require("../models/users.models");

module.exports = {
    getPosts: (req, res) => {
        try {
            const posts = postsModels.readJson();
            res.status(200).json(posts.filter(post => {
                return !post.deleted;
            }));
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    getPost: (req, res) => {
        try {
            const posts = postsModels.readJson();

            (posts[req.params.id - 1]) !== undefined && !posts[req.params.id - 1].deleted ? res.status(200).json((posts[req.params.id - 1])) : res.status(404).json("Not Found")
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    postPost: (req, res) => {
        try {
            const posts = postsModels.readJson();
            const users = usersModels.readJson();
            const { post } = req.body;

            jwt.verify(res.locals.token, "3DNtHVIWV93gOAVLK4YCO5S4M4MBePNC", (err, dec) => {
                if (dec !== undefined) {
                    const user = { ...dec };
                    console.log(user);
                    const unicEmail = users.find(us => {
                        return us.email === user.addUser.email;
                    });
                    if (unicEmail) {
                        console.log(user);
                        const addPost = {
                            ...post,
                            authorId: user.addUser.id,
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

                        if (ok === true && user) {
                            posts.push(addPost);
                            postsModels.updateJson(posts);
                            res.status(200).send("Successfully created");
                        }
                        else {
                            res.status(403).send("Failed");
                        }
                    }
                    else {
                        res.status(400).send("Invalid user");
                    }
                }
                else {
                    res.status(400).send("Invalid token");
                }
            });
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

            jwt.verify(res.locals.token, "3DNtHVIWV93gOAVLK4YCO5S4M4MBePNC", (err, dec) => {
                if (dec !== undefined) {
                    const user = { ...dec };
                    console.log(user);
                    const correctUser = user.addUser.id === updatePost.authorId;
                    if (correctUser) {
                        const keys = Object.keys(updatePost);

                        keys.forEach(key => {
                            if (post.hasOwnProperty(key)) {
                                updatePost[key] = post[key];
                            }
                        });

                        posts[req.params.id - 1] = updatePost;
                        postsModels.updateJson(posts);

                        res.status(200).send("Updated");
                    } else {
                        res.status(400).send("Invalid user");
                    }
                }
                else {
                    res.status(400).send("Invalid token");
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    deletePost: (req, res) => {
        try {
            const posts = postsModels.readJson();
            const deletePost = posts[req.params.id - 1];

            jwt.verify(res.locals.token, "3DNtHVIWV93gOAVLK4YCO5S4M4MBePNC", (err, dec) => {
                if (dec !== undefined) {
                    const user = { ...dec };
                    console.log(user);
                    const correctUser = user.addUser.id === deletePost.authorId;
                    if (correctUser) {
                        posts[req.params.id - 1].deleted = true;
                        postsModels.updateJson(posts);

                        res.status(200).send("Deleted");
                    } else {
                        res.status(400).send("Invalid user");
                    }
                }
                else {
                    res.status(400).send("Invalid token");
                }
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }

    }
}