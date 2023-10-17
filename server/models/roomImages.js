import { sequelize } from '../config/db.js'
import {DataTypes } from 'sequelize';

const RoomImages = sequelize.define('roomImages', {
  RoomId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
// Create the table if it doesn't exist

try {
    await RoomImages.sync();
    console.log('roomImages table synced successfully');
  } catch (error) {
    console.error('Error syncing roomImages table:', error);
  }
  
  export default RoomImages;