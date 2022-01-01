const fs = require("fs");

module.exports = {
    readJson: () => {
        return JSON.parse(fs.readFileSync("server/mocks/post_comments.json"));
    },
    updateJson: (string) => {
        try {
            fs.writeFileSync("server/mocks/post_comments.json", JSON.stringify(string));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    resetJson: () => {
        try {
            fs.writeFileSync("server/mocks/post_comments.json", JSON.stringify([
                {
                    id: 1,
                    postid: 1,
                    authorId: 1,
                    content: "A comment about my own work",
                    createdAt: 1640786950643,
                    updatedAt: 1640786950643,
                    deleted: false
                }
            ]));
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};