const router = require('express').Router()
const {Sessions, Users} = require('../db')

router.post('/sessions', async (req, res, next) => {
    try {
        const user = await Users.findOne({
            where:{
                email: req.body.email,
                password: req.body.password
            }
        })
        res.json(user)
    } catch (error) {
        res.json('Wrong email or password!')
        next(error)
    }
})

// router.post('/sessions', async (req, res, next) => {
//     try {
//         const user = Users.findOne({
//             where:{
//                 email: req.body.email
//             }
//         })
//     } catch (error) {
//         next(error)
//     }
// })

module.exports = router