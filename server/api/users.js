const router = require('express').Router()
const {Users, Videos} = require('../db')
const {dateConverter, videoConverter} = require('../../utils')
// const isUser = require('./security')
//isUser,
router.get('/', async (req, res, next) => {
    try {
      const users = await Users.findAll({
        // explicitly select only the id and email fields - even though
        // users' passwords are encrypted, it won't help if we just
        // send everything to anyone who asks!
        attributes: ['id', 'email', 'name']
      });
      res.json(users);
    } catch (err) {
      next(err);
    }
  });

router.get('/:id', async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where: {
                id: req.params.id
            }
        })
        const videos = await Videos.findAll({
            where: {
                userId: req.params.id
            }
        })
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
            }
        })
        user.dataValues.videos = mappedVideos
        res.json(user)
    } catch (error) {
        next(error)
    }
})

router.post('/login', async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
            }
        })
        user ? res.json(user) 
        : res.json(false)

    } catch (error) {
        next(error)
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email
            }
        })
        if(user) {
            res.json(false) 
        }
        else {
            const newUser = await Users.create({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            res.json(newUser)
        }

    } catch (error) {
        next(error)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
      const user = await Users.findByPk(req.params.id);
      user.name = req.body.name;
      user.email = req.body.email;
  
      await user.save();
      res.json(user);
    } catch (err) {
      next(err);
    }
  });

module.exports = router