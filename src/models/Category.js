const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Category",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
    },
    { timestamps: false }
  );
};
