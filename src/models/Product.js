const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Product', {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        price: {
            type: DataTypes.NUMBER
        },
        description: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT
        },
        stock: {
            type: DataTypes.NUMBER
        }
      });
    };
    