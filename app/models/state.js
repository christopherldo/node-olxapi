module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING,
    uf: DataTypes.STRING,
  });

  return State;
};