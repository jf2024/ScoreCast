const Sequelize = require("sequelize");

const sequelize = new Sequelize("wondo_database", "user", "password", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

const testDbConnection = async () => {
  try {
    sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const User = require("./models/Users.js")(sequelize, Sequelize.DataTypes);
require("./models/Prediction.js")(sequelize, Sequelize.DataTypes);
require("./models/Match.js")(sequelize, Sequelize.DataTypes);
require("./models/Player.js")(sequelize, Sequelize.DataTypes);
require("./models/Processed_Matches.js")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    console.log("Database initialized successfully.");
    sequelize.close();
  })
  .catch(console.error);
