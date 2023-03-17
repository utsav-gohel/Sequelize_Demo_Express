module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define(
    "tags",
    {
      name: DataTypes.STRING,
    },
    {
      createdAt: false,
      updatedAt: false,
    }
  );
  return Tags;
};
