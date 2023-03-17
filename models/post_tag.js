module.exports = (sequelize, DataTypes) => {
  const Post_Tag = sequelize.define(
    "post_tag",
    {
      postId: DataTypes.INTEGER,
      tagID: DataTypes.INTEGER,
    },
    {
      timestamps: false,
    }
  );
  return Post_Tag;
};
