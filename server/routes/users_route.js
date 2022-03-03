const Router = require("express").Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMW");

Router.get("/", (req, res) => {
    res.send({ message: "MySkills Users Route" });
});
Router.get("/verify", validateToken, (req, res) => {
    res.send({ Logged: true, userInfo: req.userInfo });
});
Router.post("/sign-up", async (req, res) => {
    const { username, password } = req.body;

    const UserAlreadyExist = await Users.findOne({ where: { username } });

    if (UserAlreadyExist)
        return res.send({
            message: "Username already in use!",
            userCreated: false,
        });

    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            username,
            password: hash,
        });
        res.status(200).send({
            msg: `Username ${username} has been successfully created!`,
            userCreated: true,
        });
    });
});
Router.post("/sign-in", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user)
        return res.send({
            message: "Username does not exist!",
            Logged: false,
        });

    bcrypt.compare(password, user.password).then((match) => {
        if (!match)
            return res.send({
                message: "Wrong User/Password Combination",
                Logged: false,
            });

        const accessToken = sign(
            { username: user.username, id: user.id },
            "secret"
        );

        res.send({
            message: "Logged in",
            Logged: true,
            username,
            id: user.id,
            accessToken,
        });
    });
});

module.exports = Router;
