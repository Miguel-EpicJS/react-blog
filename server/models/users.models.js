const fs = require("fs");

module.exports = {
    readJson: () => {
        return JSON.parse(fs.readFileSync("server/mocks/users.json"));
    },
    updateJson: (string) => {
        try {
            fs.writeFileSync("server/mocks/users.json", JSON.stringify(string));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    resetJson: () => {
        try {
            fs.writeFileSync("server/mocks/users.json", JSON.stringify([
                {
                    id: 1,
                    name: "Miguel Junqueira Nicacio Martinez",
                    number: "99 999999999",
                    email: "miguel@email.com",
                    passwordHash: "$2a$10$fKTsfuSJwzWwiIQPgpcL/erR4U.gyzm1OQWgBBSCYHolr4jCxrWbq",
                    about: "A programmmer who likes to read, play and create new things",
                    deleted: false,
                    registeredAt: 1640785950643,
                    lastLogin: 1640786950643
                }
            ]));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};