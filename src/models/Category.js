const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false
    }
  );
};
