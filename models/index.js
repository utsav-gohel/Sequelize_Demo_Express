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
db.tags = require("./tags")(sequelize, DataTypes);
db.post_tag = require("./post_tag")(sequelize, DataTypes);

//defining relationship

//one to many relationship
db.users.hasMany(db.posts);
db.posts.belongsTo(db.users);
db.users.hasOne(db.posts);
//many to many relationship
db.posts.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.posts, { through: "post_tag" });
module.exports = db;
