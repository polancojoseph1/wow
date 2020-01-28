'use strict'

const router = require('express').Router()
router.use('/videos', require('./videos'))
router.use('/messages', require('./messages'))
router.use('/users', require('./users'))
router.use('/sessions', require('./sessions'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
