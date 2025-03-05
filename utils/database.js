const {Sequelize} = require('sequelize');
const config = require('../config/database').development;

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        port: config.port,
        logging: true,
        define: config.define
    }
);

async function initializeDatabase() {
    try {
        console.log(config.port)
        await sequelize.authenticate();
        console.log('Connection was established successfully');

        await sequelize.sync({
            alter: true
        });
        console.log('All models were synced successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {sequelize, initializeDatabase};