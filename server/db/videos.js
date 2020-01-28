const Sequelize = require('sequelize')
const db = require('./database')

const Videos = db.define('video', {
    link: {
        type: Sequelize.STRING
        },
    name: {
        type: Sequelize.STRING,
        defaultValue: 'Untitled'
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true
        },
    originalLink: {
        type: Sequelize.STRING,
        allowNull: true
        },
})

module.exports = Videos
