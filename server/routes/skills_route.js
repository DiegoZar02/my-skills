const Router = require("express").Router();
const { Skills } = require("../models");
const { validateToken } = require("../middlewares/AuthMW");

Router.get("/", validateToken, async (req, res) => {
    const ListOfSkills = await Skills.findAll({
        where: { UserId: req.userInfo.id },
    });

    res.send({ ListOfSkills });
});

Router.get("/:id", validateToken, async (req, res) => {
    const { id } = req.params;
    const skill = await Skills.findByPk(id);

    if (skill === null) {
        return res.send({
            id: id,
            name: "Skill does not exist",
            progress: 0,
        });
    }

    res.status(200).send(skill);
});

Router.post("/create", validateToken, async (req, res) => {
    const skill = req.body;
    skill.username = req.userInfo.username;
    skill.UserId = req.userInfo.id;

    await Skills.create(skill);

    res.send({
        SkillCreated: true,
        skill,
    });
});
Router.delete("/delete", validateToken, async (req, res) => {
    const props = req.body;
    props.username = req.userInfo.username;
    props.UserId = req.userInfo.id;

    const skill = await Skills.findByPk(props.id);

    if (props.UserId === skill.UserId) {
        Skills.destroy({ where: { id: props.id } });
        res.send({
            SkillDeleted: true,
            message: "Skill has been deleted",
            skill: {
                name: skill.name,
                progress: skill.progress,
                username: req.userInfo.username,
                UserId: req.userInfo.id,
            },
        });
    } else {
        res.send({
            SkillDeleted: false,
            message: "You can not delete this skill, it is not yours",
            skill: {
                name: skill.name,
                progress: skill.progress,
                username: req.userInfo.username,
                UserId: req.userInfo.id,
            },
        });
    }
});

Router.post("/modify", validateToken, async (req, res) => {
    const props = req.body;
    props.username = req.userInfo.username;
    props.UserId = req.userInfo.id;

    const skill = await Skills.findByPk(props.id);
    if (props.UserId === skill.UserId) {
        if (props.progress > 100 || props.progress < 0) {
            res.send({
                SkillModified: false,
                message: "Progress can be between 0 and 100 %",
                skill: {
                    name: skill.name,
                    progress: skill.progress,
                    username: req.userInfo.username,
                    UserId: req.userInfo.id,
                },
            });
        } else {
            await Skills.update(
                { progress: props.progress, name: props.name },
                { where: { id: props.id } }
            );
            res.send({
                SkillModified: true,
                message: "Progress and Name updated",
                skill: {
                    name: props.name,
                    progress: props.progress,
                    username: req.userInfo.username,
                    UserId: req.userInfo.id,
                },
            });
        }
    } else {
        res.send({
            SkillModified: false,
            message: "You can not modify this skill, it is not yours",
            skill: {
                name: skill.name,
                progress: skill.progress,
                username: req.userInfo.username,
                UserId: req.userInfo.id,
            },
        });
    }
});

module.exports = Router;
