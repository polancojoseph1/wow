'use strict'

const db = require('./database')
const Videos = require('./videos')
const Messages = require('./messages')
const Users = require('./users')
const Sessions = require('./sessions')

// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models (which you should define in separate modules in this directory).
// Example:
//
// const Puppy = require('./puppy')
// const Owner = require('./owner')

// After you've required all of your models into this module, you should establish
// associations (https://sequelize-guides.netlify.com/association-types/) between them here as well!
// Example:

Videos.belongsTo(Users)
Users.hasMany(Videos)

module.exports = {
  // Include your models in this exports object as well!
  db,
  Videos,
  Messages,
  Users,
  Sessions
}
