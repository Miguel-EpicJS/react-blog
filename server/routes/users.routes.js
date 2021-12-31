const usersRoutes = require("express").Router();
const usersControllers = require("../controllers/users.controller");


usersRoutes.get("/", usersControllers.getUsers);
usersRoutes.get("/:id", usersControllers.getUser);
usersRoutes.post("/login", usersControllers.loginUser);
usersRoutes.post("/register", usersControllers.registerUser);
usersRoutes.put("/:id", usersControllers.putUser);
usersRoutes.delete("/:id", usersControllers.deleteUser);

module.exports = usersRoutes;