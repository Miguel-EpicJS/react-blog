const postCommentsModels = require("../models/post_comments.models");

module.exports = {
    getPostComments: (req, res) => {
        try {
            const comments = postCommentsModels.readJson();
            res.status(200).json(comments.filter(commentary => {
                return !commentary.deleted;
            }));
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    getPostCommentary: (req, res) => {
        try {
            const comments = postCommentsModels.readJson();

            (comments[req.params.id - 1]) !== undefined && !comments[req.params.id - 1].deleted ? res.status(200).json((comments[req.params.id - 1])) : res.status(404).json("Not Found")
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    postPostCommentary: (req, res) => {
        try {
            const comments = postCommentsModels.readJson();
            const { commentary } = req.body;

            const addPostCommentary = {
                id: comments.length + 1,
                ...commentary,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                deleted: false,
            }

            const keys = Object.keys(comments[0]);

            const ok = keys.every(key => {
                return addPostCommentary.hasOwnProperty(key);
            });

            if (ok === true) {
                comments.push(addPostCommentary);
                postCommentsModels.updateJson(comments);
                res.status(200).send("Successfully created");
            }
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    putPostCommentary: (req, res) => {
        try {
            const comments = postCommentsModels.readJson();
            const updatePostComments = comments[req.params.id - 1];
            const { commentary } = req.body;

            const keys = Object.keys(updatePostComments);

            keys.forEach(key => {
                if (commentary.hasOwnProperty(key)) {
                    updatePostComments[key] = commentary[key];
                }
            });

            updatePostComments.updatedAt = new Date().getTime();

            comments[req.params.id - 1] = updatePostComments;
            postCommentsModels.updateJson(comments);

            res.status(200).send("Updated");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }
    },
    deletePostCommentary: (req, res) => {
        try {
            const comments = postCommentsModels.readJson();
            comments[req.params.id - 1].deleted = true;
            postCommentsModels.updateJson(comments);

            res.status(200).send("Deleted");
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }

    }
}