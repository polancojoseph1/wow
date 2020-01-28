const router = require('express').Router();
const {
    Users
} = require('../db');

router.post('/login', async (req, res, next) => {
    try {
      const {email, password} = req.body;
      const user = await Users.findOne({where: {email: email}});
      if (!user) {
        console.log('No such user found:', email);
        res.status(401).json('Wrong username and/or password');
      } else if (!user.correctPassword(password)) {
        console.log('Incorrect password for user:', email);
        res.status(401).json('Wrong username and/or password');
      } else {
        req.login(user, err =>
        err ? next(err) : res.json({user})
        );
      }
    }   catch(error) {
        next(error)
    }
  });
  
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/videos');
});
  
router.get('/me', (req, res) => {
    res.json(req.user);
});

router.use((req, res, next) => {
    const err = new Error('No')
    err.status = 404
    next(err)
  })

// router.use('/google',require('./google'))

module.exports = router