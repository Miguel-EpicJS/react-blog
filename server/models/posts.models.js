const fs = require("fs");

module.exports = {
    readJson: () => {
        return JSON.parse(fs.readFileSync("server/mocks/posts.json"));
    },
    updateJson: (string) => {
        try {
            fs.writeFileSync("server/mocks/posts.json", JSON.stringify(string));
            return true;            
        } catch (error) {
            console.log(error);
            return false;
        }
    },
    resetJson: () => {
        try {
            fs.writeFileSync("server/mocks/posts.json", JSON.stringify([ { id:1,  authorId:1, title:"A new start", likes:0, summary:"Starting a new projet with new ideias", createdAt:1640786950643, updatedAt:1640786950643, publishedAt:1640786950643, deleted:false, content:"This is the first post from a fictional blog that I create to train my skills"}]));
            return true;            
        } catch (error) {
            console.log(error);
            return false;
        }
    }
};