const usersRoutes = require("express").Router();
const usersControllers = require("../controllers/users.controller");
const tokenMiddlewares = require("../middlewares/tokens.middlewares");


usersRoutes.get("/", usersControllers.getUsers);
usersRoutes.get("/:id", usersControllers.getUser);
usersRoutes.post("/login", usersControllers.loginUser);
usersRoutes.post("/register", usersControllers.registerUser);
usersRoutes.put("/:id", tokenMiddlewares.validateToken, usersControllers.putUser);
usersRoutes.delete("/:id", tokenMiddlewares.validateToken, usersControllers.deleteUser);

module.exports = usersRoutes;