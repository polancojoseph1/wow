const {db} = require('./server/db')
const {green, red} = require('chalk')
const Videos = require('./server/db/videos')
const Messages = require('./server/db/messages')
const Users = require('./server/db/users')

const seed = async () => {
  await db.sync({force: true})

  // seed your database here!

  await Videos.create({
      link: 'https://www.youtube.com/watch?v=OD9CtIiBb6s',
      name: 'Eminem Freestyle',
      description: 'Top tier freestyle by one of the best!',
      originalLink: 'https://www.youtube.com/watch?v=OD9CtIiBb6s'
  })

  await Messages.create({
    message: 'hello how are you?'
})

  await Users.create({
    name: 'Jefe',
    email: 'a@gmail.com',
    password: '123'
  })

  console.log(green('Seeding success!'))
  db.close()
}

seed()
  .catch(err => {
    console.error(red('Oh noes! Something went wrong!'))
    console.error(err)
    db.close()
  })
