const postCommentsRoutes = require("express").Router();
const postCommentsControllers = require("../controllers/post_comments.controllers");


postCommentsRoutes.get("/", postCommentsControllers.getPostComments);
postCommentsRoutes.get("/:id", postCommentsControllers.getPostCommentary);
postCommentsRoutes.post("/", postCommentsControllers.postPostCommentary);
postCommentsRoutes.put("/:id", postCommentsControllers.putPostCommentary);
postCommentsRoutes.delete("/:id", postCommentsControllers.deletePostCommentary);

module.exports = postCommentsRoutes;