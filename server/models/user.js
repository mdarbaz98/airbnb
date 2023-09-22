import { sequelize } from '../config/db.js'
import {DataTypes } from 'sequelize';

export const User = sequelize.define('users', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});