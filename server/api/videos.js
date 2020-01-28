const router = require('express').Router()
const {Videos, Users} = require('../db')
const {dateConverter, videoConverter} = require('../../utils')

router.get('/', async (req, res, next) => {
    try {
        const videos = await Videos.findAll()
        const mappedVideos = videos.map(elem => {
            return {
                id: elem.id,
                link: videoConverter(elem.link),
                name: elem.name,
                date: dateConverter(elem.createdAt),
                description: elem.description,
                originalLink: elem.link,
                createdAt: elem.createdAt,
                updatedAt: elem.updatedAt
            }})
        res.json(mappedVideos)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const video = await Videos.findOne({
            where:{
                id: req.params.id
            }
        })
        const user = await Users.findOne({
            where:{
                id: video.userId
            }
        })
        video.dataValues.user = user
        res.json({
            id: video.id,
            link: videoConverter(video.link),
            name: video.name,
            date: dateConverter(video.createdAt),
            description: video.description,
            originalLink: video.link,
            user: user,
            createdAt: video.createdAt,
            updatedAt: video.updatedAt,
        })
    } catch (error) {
        next(error)
    }
})

router.post('/:userId', async (req, res, next) => {
    try {
        const {link, name, description} = req.body
        const newVideo = {
            link: link,
            name,
            description,
            originalLink: link,
            userId: req.params.userId
        }
        const postVideo = await Videos.create(newVideo)
        res.json(postVideo)
    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const video = await Videos.findOne({
            where:{
                id: req.params.id,
                userId: req.params.userId
            }
        })
        const {userId} = video
        const {id, link, name, description} = req.body
        await video.update({
            id,
            link: link,
            name,
            description,
            originalLink: link,
            userId: userId
        })
        res.json(video)
    } catch (error) {
        next(error)
    }
})

router.delete('/:id', async (req, res, next) => {
    try {
        await Videos.destroy({
            where:{
                id: req.params.id
            }
        })
        const videos = await Videos.findAll()
        const mappedVideos = videos.map(elem => {
            return {
                id: elem.id,
                link: videoConverter(elem.link),
                name: elem.name,
                date: dateConverter(elem.createdAt),
                description: elem.description,
                originalLink: elem.link
            }})
        res.json(mappedVideos)
    } catch (error) {
        next(error)
    }
})



module.exports = router