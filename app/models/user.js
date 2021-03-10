module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING(50),
    email: DataTypes.STRING(50),
    state: DataTypes.STRING(2),
    password: DataTypes.STRING(255),
  });

  return User;
};