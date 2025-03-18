const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config');

const Feedback = sequelize.define('Feedback', {
    feedback: {
        type: DataTypes.ENUM('smiley', 'frowny', 'surprised', 'confused'), 
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,  
        allowNull: true
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
});

module.exports=Feedback;