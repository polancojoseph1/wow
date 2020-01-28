import React from 'react'
import { gotMessagesThunk } from '../reducers/messages'
import { connect } from 'react-redux'

class ChatRoom extends React.Component{

    componentDidMount(){
        this.props.getMessages()
    }

    render(){
        const {messages} = this.props
        console.log(this.props)
        return(
            <div key='message-board' className='message-board'>
            {messages.map(elem => {
                return (<div key='message-and-date' className='message-and-date'>
                    <p key='date' className='date-frame'>{elem.date}</p>
                    <p key='message' className='message-frame'>{elem.message}</p>
                    </div>)
            })}
            <input></input>
            <button>SEND</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getMessages: () => {
            dispatch(gotMessagesThunk())
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(ChatRoom)