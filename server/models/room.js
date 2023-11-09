import { sequelize } from '../config/db.js'
import { DataTypes } from 'sequelize';
import RoomImages from './roomImages.js';
import RoomPerks from './roomPerks.js';
import RoomDates from './roomDates.js';

// Define the Room model
const Room = sequelize.define('rooms', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  adultCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  childrenCapacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  roomPrice: {
    type: DataTypes.DECIMAL(10, 2), // Adjust the precision and scale as needed
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortIntro: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  specialThings: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  highlighted: {
    type: DataTypes.TEXT,
    allowNull: false, // Set a default value if needed
  },
});

Room.hasMany(RoomImages, { foreignKey: 'RoomId', as: 'images', onDelete: 'CASCADE', hooks: true });
Room.hasMany(RoomPerks, { foreignKey: 'RoomId' ,as: 'perks', onDelete: 'CASCADE', hooks: true });
Room.hasMany(RoomDates, { foreignKey: 'RoomId' ,as: 'dates', onDelete: 'CASCADE', hooks: true });

// Create the table if it doesn't exist
try {
  await Room.sync();
  console.log('Room table synced successfully');
} catch (error) {
  console.error('Error syncing Room table:', error);
}

export default Room;