import mysql from "mysql2";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// const con = mysql.createPool({
//     connectionLimit: 10, // Adjust the number of connections as needed
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT
// });

// export const query = util.promisify(con.query).bind(con);

// con.getConnection(function(err){
//     if(err) throw err;
//     console.log("DB Connected!")
// });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    pool: { max: 5, min: 0, idle: 10000 },
  }
);

try {
  await sequelize.authenticate();
  try {
    await sequelize.sync({ force: true });
    console.log("synced successfully");
  } catch (error) {
    console.error("Error syncing:", error);
  }
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
