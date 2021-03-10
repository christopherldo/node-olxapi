module.exports = (sequelize, DataTypes) => {
  const AdImage = sequelize.define('AdImage', {
    public_id: DataTypes.UUID,
    ad_id: DataTypes.UUID,
    default: DataTypes.BOOLEAN,
  });

  return AdImage;
};