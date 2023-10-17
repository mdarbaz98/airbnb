import { sequelize } from '../config/db.js'
import {DataTypes } from 'sequelize';

const RoomDates = sequelize.define('roomDates', {
    RoomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
// Create the table if it doesn't exist

try {
    await RoomDates.sync();
    console.log('roomDates table synced successfully');
  } catch (error) {
    console.error('Error syncing roomDates table:', error);
  }
  
  export default RoomDates;