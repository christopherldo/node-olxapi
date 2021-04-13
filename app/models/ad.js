module.exports = (sequelize, DataTypes) => {
  const Ad = sequelize.define('Ad', {
    public_id: DataTypes.UUID,
    id_user: DataTypes.UUID,
    category: DataTypes.STRING(50),
    date_created: DataTypes.DATE,
    state: DataTypes.STRING(2),
    title: DataTypes.STRING(50),
    price: DataTypes.DECIMAL,
    price_negotiable: DataTypes.BOOLEAN,
    description: DataTypes.TEXT,
    views: DataTypes.INTEGER,
    status: DataTypes.STRING,
  });

  return Ad;
};