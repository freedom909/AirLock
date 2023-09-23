'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Listing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Listing.belongsToMany(models.Amenity,{through:models.ListingAmenities})
      Listing.belongsTo(models.coordinates)
    }
  }
  Listing.init({
    id: { type: DataTypes.STRING, primaryKey: true, allowNull: false },
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    costPerNight: DataTypes.FLOAT,
    hostId: DataTypes.STRING,
    locationType: DataTypes.STRING,
    numOfBeds: DataTypes.INTEGER,
    photoThumbnail: DataTypes.STRING,
    isFeatured: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Listing',
    timestamps:false 
  });
  return Listing;
};