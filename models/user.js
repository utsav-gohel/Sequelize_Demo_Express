module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      // defaultValue: "abc@gmail.com",
      allowNull: false,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      // validate: {
      //   equals: "male",
      // },
    },
    // timestamps: false,
    // createdAt: "created_at",
    // updatedAt: "modified_at",
  });
  return Users;
};
