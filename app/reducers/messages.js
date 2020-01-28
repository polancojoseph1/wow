import axios from 'axios'

const GET_MESSAGES = 'GET_MESSAGES'

const getMessages = (messages) => {
    return {
        type: GET_MESSAGES,
        messages
    }
}

export const gotMessagesThunk = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get('api/messages')
            dispatch(getMessages(data))
        } catch (error) {
            console.error(error)
        }
    }
}
const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case GET_MESSAGES:
            return action.messages
        default:
            return state
    }
  }
  
  export default messagesReducer