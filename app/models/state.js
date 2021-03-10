module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define('State', {
    name: DataTypes.STRING(20),
    uf: DataTypes.STRING(2),
  });

  return State;
};