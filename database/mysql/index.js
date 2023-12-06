import { Sequelize } from "sequelize";
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
});

try {
    await sequelize.authenticate();
    console.log('MySQL connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the MySQL database:', error);
}

export default sequelize;