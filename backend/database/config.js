const { Sequelize } = require('sequelize');
require('dotenv').config(); 

const sequelize = new Sequelize('professors_db','gproiect', 'parola', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
    .then(() => console.log('Connected to the database'))
    .catch((err) => console.error('Database connection error:', err));

    
module.exports = sequelize;
