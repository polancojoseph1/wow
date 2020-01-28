const Sequelize = require('sequelize')
const db = require('./database')

const Messages = db.define('message', {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
})

module.exports = Messages