import React from 'react'
import axios from 'axios'
import { addVideoThunk } from '../../reducers/videos'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddVideo extends React.Component {
    constructor(){
        super()
        this.state = {
            link: '',
            name: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit() {
      event.preventDefault()
      console.log(this.props)
        this.props.addVideo(this.props.match.params.id,this.state)
        this.props.history.push(`/videos/${this.props.match.params.id}`);
    }

    render() {
            return (
              <div className="add-video-flex">
              <div className="sidenav">
              <a><Link to={`/videos/${this.props.match.params.id}`}>View Videos</Link></a>
              <Link to={'/login'}><a>Login</a></Link>
              <Link to={'/sign-up'}><a>Sign Up</a></Link>
              <Link><a>Misc</a></Link>
              <Link><a>Give Feedback</a></Link>
              </div>
                <form onSubmit={this.handleSubmit} className="video-flex-box">
                  <h2>Share New Video:</h2>
                  <label className='add-link'>
                    Link: 
                    <input
                      type="text"
                      name="link"
                      onChange={this.handleChange}
                      value={this.state.link}
                      className='radius-input'
                    />
                  </label>
                  <label className='add-name'>
                    Name/Title: 
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      className='radius-input'
                    />
                  </label>
                  <label className='add-description'>
                    Video Description: 
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      className='radius-input'
                    />
                  </label>
                  <button type="submit" className='post-video-button'>POST VIDEO</button>
                  <Link to={`/videos/${this.props.match.params.id}`}><button type="submit" 
                    className='add-back-video-button'>BACK TO VIDEOS</button></Link>
                </form>
              </div>
            );
        }
}

const mapStateToProps = state => {
    return {
        newVideo: state.newVideo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addVideo: (userId,newVideo) => {
            dispatch(addVideoThunk(userId,newVideo))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)