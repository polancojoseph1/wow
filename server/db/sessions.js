const Sequelize = require('sequelize')
const db = require('./database')

const Sessions = db.define('session', {
    loggedIn: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Sessions