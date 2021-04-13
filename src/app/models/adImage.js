module.exports = (sequelize, DataTypes) => {
  const AdImage = sequelize.define('AdImage', {
    public_id: DataTypes.UUID,
    ad_id: DataTypes.UUID,
    url: DataTypes.STRING,
    default: DataTypes.BOOLEAN,
  }, {
    tableName: 'Ad_Images',
  });

  return AdImage;
};