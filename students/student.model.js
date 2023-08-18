const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING, allowNull: false },
        rollno: { type: DataTypes.INTEGER, allowNull: false },
        gender: { type: DataTypes.STRING, allowNull: false },
        dob: { type: DataTypes.DATE, allowNull: false }
    };

    const options = {
        tableName: "student", // Use the same table name as in the database
        timestamps: false, // Disable automatic timestamps
    }
    // = {
    //     defaultScope: {
    //         // exclude password hash by default
    //         attributes: { exclude: ['passwordHash'] }
    //     },
    //     scopes: {
    //         // include hash with this scope
    //         withHash: { attributes: {}, }
    //     }
    // };

    return sequelize.define('Student', attributes, options);
}