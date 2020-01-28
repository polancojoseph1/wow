import React from 'react'
import Videos from './videos/Videos'
import ChatRoom from './ChatRoom'
import AddVideo from './videos/AddVideo'
import EditVideo from './videos/EditVideo'
import AllVideos from './videos/AllVideos'
import Login from './Login'
import SignUp from './SignUp'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

const Root = () => {
  return (
    <div>
    <Router>
      <nav>
        <h1>WOW</h1>
      </nav>
      <main>
        <h1></h1>
          <Route exact path="/" component={AllVideos} />
          <Route exact path="/videos/:id" component={Videos} />
          <Route exact path="/messages" component={ChatRoom} />
          <Route exact path='/addVideo/:id' component={AddVideo}/>
          <Route exact path='/editVideo/:id/:userId' component={EditVideo}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/sign-up' component={SignUp}/>
      </main>
      </Router>
    </div>
  )
}

export default Root
