const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("utsav", "root", "root@12345", {
  host: "localhost",
  dialect: "mysql",
});
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Sync successfully!");
  })
  .catch((error) => {
    console.error("Unable to sync : ", error);
  });

db.users = require("./user")(sequelize, DataTypes);
db.posts = require("./post")(sequelize, DataTypes);

//defining relationship
db.users.hasOne(db.posts);
db.posts.belongsTo(db.users);
module.exports = db;
