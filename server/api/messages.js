const router = require('express').Router()
const {Messages} = require('../db')
const {dateConverter} = require('../../utils')

router.get('/', async (req, res, next) => {
    try {
        const messages = await Messages.findAll()
        const mappedMessages = messages.map(elem => {
            return {
                message: elem.message,
                date: dateConverter(elem.createdAt)
            }})
        res.json(mappedMessages)
    } catch (error) {
        next(error)
    }
})
router.get('/:id', async (req, res, next) => {
    try {
        const message = await Messages.findOne({
            where:{
                id: req.params.id
            }
        })
        res.json(message)
    } catch (error) {
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const postMessage = await Messages.create({
            message: req.body.message
        })
        res.json(postMessage)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const message = await Messages.findOne({
            where:{
                id: req.params.id
            }
        })
        await message.update({
            message: req.body.message
        })
        res.json('updated successfully!')
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        const message = await Messages.findOne({
            where:{
                id: req.params.id
            }
        })
        message.destroy()
        res.json('Deleted successfully')
    } catch (error) {
        next(error)
    }
})

module.exports = router