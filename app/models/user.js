module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    public_id: DataTypes.UUID,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    state: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return User;
};