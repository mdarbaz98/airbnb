import { sequelize } from '../config/db.js'
import {DataTypes } from 'sequelize';

const RoomPerks = sequelize.define('roomPerks', {
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
    await RoomPerks.sync();
    console.log('roomPerks table synced successfully');
  } catch (error) {
    console.error('Error syncing roomPerks table:', error);
  }
  
  export default RoomPerks;