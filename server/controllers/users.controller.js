const usersModels = require("../models/users.models");

const bcrypt = require("bcrypt");

module.exports = {
    getUsers: (req, res) => {
        try {
            const users = usersModels.readJson();
            res.status(200).json(users.filter(user => {
                return !user.deleted;
            }));
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    getUser: (req, res) => {
        try {
            const users = usersModels.readJson();

            (users[req.params.id - 1]) !== undefined && !users[req.params.id - 1].deleted ? res.status(200).json((users[req.params.id - 1])) : res.status(404).json("Not Found")
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    loginUser: (req, res) => {
        try {
            const users = usersModels.readJson();
            const { user } = req.body;

            const result = users.filter(us => {
                return bcrypt.compareSync(user.password, us.passwordHash) && us.email === user.email;
            });

            if (result) {
                res.status(200).send("Logged");
            }else {
                res.status(404).send("Wrong password or email");
            }

        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    registerUser: (req, res) => {
        try {
            const users = usersModels.readJson();
            const { user } = req.body;

            const salt = bcrypt.genSaltSync(13);

            user.passwordHash = bcrypt.hashSync(user.password, salt);
            delete user.password
            
            const addUser = {
                id: users.length + 1,
                ...user,
                deleted: false,
                registeredAt: new Date().getTime(),
                lastLogin: new Date().getTime(),
            }

            const keys = Object.keys(users[0]);

            const ok = keys.every(key => {
                return addUser.hasOwnProperty(key);
            });

            const unicEmail = users.every(us => {
                return us.email !== user.email;
            });

            if (ok && unicEmail) {
                users.push(addUser);
                usersModels.updateJson(users);
                res.status(200).send("Successfully created");
            }else {
                res.status(400).send("You need more informations, or your email is already registred");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    putUser: (req, res) => {
        try {
            const users = usersModels.readJson();
            const updateUser = users[req.params.id - 1];
            const { user } = req.body;

            const keys = Object.keys(updateUser);

            keys.forEach(key => {
                if (user.hasOwnProperty(key)) {
                    updateUser[key] = user[key];
                }
            });

            users[req.params.id - 1] = updateUser;
            usersModels.updateJson(users);

            res.status(200).send("Updated");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    deleteUser: (req, res) => {
        try {
            const users = usersModels.readJson();
            users[req.params.id - 1].deleted = true;
            usersModels.updateJson(users);

            res.status(200).send("Deleted");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }

    }
}