const postsRoutes = require("express").Router();

const postsControllers = require("../controllers/posts.controllers")
const tokenMiddlewares = require("../middlewares/tokens.middlewares");

postsRoutes.get("/", postsControllers.getPosts);
postsRoutes.get("/:id", postsControllers.getPost);
postsRoutes.post("/", tokenMiddlewares.validateToken, postsControllers.postPost);
postsRoutes.put("/:id", tokenMiddlewares.validateToken, postsControllers.putPost);
postsRoutes.delete("/:id", tokenMiddlewares.validateToken, postsControllers.deletePost);

module.exports = postsRoutes;