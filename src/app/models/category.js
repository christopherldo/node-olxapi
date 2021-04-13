module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING(50),
    slug: DataTypes.STRING(100),
  });

  return Category;
};