import  Sequelize  from "sequelize";
import dotenv from 'dotenv/config'

const db = new Sequelize(
  process.env.DBNAME,
  process.env.USERNAMEDB,
  process.env.USERPASSWORDDB,
  {
    host: process.env.DB_HOST,
    port: "3306",
    dialect: "mysql",
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);

export default db;