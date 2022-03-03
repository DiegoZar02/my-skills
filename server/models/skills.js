module.exports = (sequelize, DataTypes) => {
    const Skills = sequelize.define("Skills", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        progress: {
            type: DataTypes.INTEGER,
        },
    });
    return Skills;
};
