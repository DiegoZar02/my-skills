const { verify } = require("jsonwebtoken");
const { Users } = require("../models");

const validateToken = async (req, res, next) => {
    const accessToken = req.header("accessToken");

    if (!accessToken)
        return res.send({
            Logged: false,
            error: "User is not logged",
            description: "token was found",
        });

    try {
        const validToken = verify(accessToken, "secret");
        req.userInfo = validToken;

        const UserExist = await Users.findOne({
            where: { id: validToken.id, username: validToken.username },
        });

        if (validToken) {
            if (UserExist) {
                return next();
            } else {
                return res.send({
                    Logged: false,
                    error: "User is not logged",
                    description: "User was deleted or never existed",
                });
            }
        }
    } catch (error) {
        return res.send({
            Logged: false,
            error: "User is not logged",
            description: `${error.name}: ${error.message}`,
        });
    }
};

module.exports = { validateToken };
