import React from 'react'
import axios from 'axios'
import YouTube from 'react-youtube'
import { gotUsersVideoThunk } from '../../reducers/videos'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Videos extends React.Component {
    constructor(){
        super()
        this.state = {
            videos: [],
            id: 0,
            name: ''
        }
        this.onReady = this.onReady.bind(this)
    }

    async UNSAFE_componentWillMount() {
        const {data} = await axios.get(`/api/users/${this.props.match.params.id}`)
        this.setState({
            videos: data.videos,
            id: data.id,
            name: data.name
        })
    }
    

    async componentDidMount() {
        const {data} = await axios.get(`/api/users/${this.props.match.params.id}`)
        if(this.state.videos !== data.videos){
        this.setState({
            videos: data.videos,
            id: data.id,
            name: data.name
        })
        }
    }

    onReady(event) {
        event.target.pauseVideo();
      }

    render() {
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };
        if(this.state.videos.length){
            return (
                <div className='all-videos'>
                <h1 className='wow-videos'>WOW VIDEOS</h1>
                <div className="sidenav">
                <Link to={`/addVideo/${this.props.match.params.id}`}><a>Add Video</a></Link>
                <Link to={'/login'}><a>Log Out</a></Link>
                <Link><a>Misc</a></Link>
                <Link><a>Give Feedback</a></Link>
                </div>
                {this.state.videos.map(video => {
                    return (
                        <div key='video-frame' className='video-frame'>
                    <div className='name-frame'>   
                    <a href={video.originalLink}>
                    {video.name}
                    </a>
                    </div>
                    <YouTube
                    key='video'
                    videoId={video.link}
                    opts={opts}
                    onReady={this.onReady}
                    className='video-margin-top'
                    />
                    <div key='under-video'className='under-video'>
                    <div className='edit-hover'>
                    <a>
                    <Link to={`/editVideo/${video.id}`}>
                    <img
                      src="icons8-settings-50.png"
                      width="25px"
                    />
                    </Link>
                    </a>
                    </div>
                    <div className='date-frame'>Released Date: {video.date}</div>
                    <div>
                    </div>
                    </div>
                    </div>
                    )
                })}
                
                </div>
              );
        }
        else {
            return (
                <div>
                <h1>YOU CURRENTLY HAVE NO VIDEOS</h1>
                <div className="sidenav">
                <Link to={`/addVideo/${this.props.match.params.id}`}><a>Add Video</a></Link>
                <Link to={'/login'}><a>Log Out</a></Link>
                <Link><a>Misc</a></Link>
                <Link><a>Give Feedback</a></Link>
                </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        videos: state.user.videos,
        id: state.user.id,
        username: state.user.name
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUser: (userId) => {
            dispatch(gotUsersVideoThunk(userId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Videos)