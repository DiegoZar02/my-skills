const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const database = require("./models");

app.get("/", (req, res) => {
    res.send({
        message: "Index Route",
    });
});

const UsersRoute = require("./routes/users_route");
app.use("/auth", UsersRoute);
const SkillsRoute = require("./routes/skills_route");
app.use("/skills", SkillsRoute);

database.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});
