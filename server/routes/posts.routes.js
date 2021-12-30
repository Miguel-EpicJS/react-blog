const fs = require('fs');

const postsRoutes = require("express").Router();
const postsControllers = require("../controllers/posts.controllers")


postsRoutes.get("/", postsControllers.getPosts);
postsRoutes.get("/:id", postsControllers.getPost);
postsRoutes.post("/", postsControllers.postPost);
postsRoutes.put("/:id", postsControllers.putPost);
postsRoutes.delete("/:id", postsControllers.deletePost);

module.exports = postsRoutes;