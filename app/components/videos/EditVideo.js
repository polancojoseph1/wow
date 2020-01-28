import React from 'react'
import { editVideoThunk, deleteVideoThunk, gotVideoThunk } from '../../reducers/videos'
import YouTube from 'react-youtube'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class EditVideo extends React.Component {
    constructor(){
        super()
        this.state = {
            link: '',
            name: '',
            description: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.onReady = this.onReady.bind(this)
    }

    componentDidMount() {
        this.props.getVideo(this.props.match.params.id)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit() {
        if(this.state.link !== '' && this.state.name !== ''){
            this.props.editVideo(this.props.match.params.id,this.state,this.props.userId)
        }
          this.props.history.push('/videos');
          window.location.reload(true);
    }

    handleDelete() {
        event.preventDefault()
        const removeVideo = confirm('Click OK if you want to delete this video.')
        if(removeVideo){
            this.props.deleteVideo(this.props.match.params.id)
            this.props.history.push('/videos');
        }  
    }

    onReady(event) {
        event.target.pauseVideo();
      }

    render() {
            const opts = {
            height: '200',
            width: '300',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
                }
            };
            return (
              <div className="edit-video-flex">
              <div className="sidenav">
              <a><Link to={'/videos'}>View Videos</Link></a>
              <Link to={'/addVideo'}><a>Add Video</a></Link>
              <Link to={'/login'}><a>Login</a></Link>
              <Link to={'/sign-up'}><a>Sign Up</a></Link>
              <Link><a>Misc</a></Link>
              <Link><a>Give Feedback</a></Link>
              </div>
                <form onSubmit={this.handleSubmit} className="edit-video-flex-box" value={this.state}>
                  <h2>Update Video:</h2>
                  <div className='edit-move'>
                  <YouTube
                key='video'
                videoId={this.props.video.link}
                opts={opts}
                onReady={this.onReady}
                className='video-edit'
                />
                </div>
                  <label className='edit-link'>
                    Link: 
                    <input
                      type="text"
                      name="link"
                      onChange={this.handleChange}
                      value={this.state.link}
                      className='radius-input-link'
                    /><a className='required-field'>*</a>
                  </label>
                  <label className='edit-name'>
                    Name/Title: 
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      className='radius-input-name'
                    /> <a className='required-field-two'>*</a>
                  </label>
                  <label className='edit-description'>
                    Video Description: 
                    <input
                      type="text"
                      name="description"
                      onChange={this.handleChange}
                      value={this.state.description}
                      className='radius-input-description'
                    />
                  </label>
                  <button type="submit" 
                    className='update-video-button'>UPDATE</button>
                  <button type="click" 
                  onClick={this.handleDelete}className='delete-video-button'>DELETE</button>
                  <Link to={'/videos'}><button type="submit" 
                    className='back-video-button'> VIDEOS</button></Link>
                </form>
              </div>
            );
        }
}

const mapStateToProps = state => {
    return {
        video: state.video
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getVideo: (videoId) => {
            dispatch(gotVideoThunk(videoId))
        },
        editVideo: (videoId, newVideo, userId) => {
            dispatch(editVideoThunk(videoId,newVideo,userId))
        },
        deleteVideo: (videoId) => {
            dispatch(deleteVideoThunk(videoId))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditVideo)