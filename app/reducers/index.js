import {combineReducers} from 'redux'
import videos, {addVideoReducer, getUserReducer, getVideoReducer} from './videos'
import messages from './messages'
import auth from './auth'

const rootReducer = combineReducers({
  videos,
  newVideo: addVideoReducer,
  user: getUserReducer,
  messages,
  auth,
  video: getVideoReducer
})

export default rootReducer
