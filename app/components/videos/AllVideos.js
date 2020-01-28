import React from 'react'
import YouTube from 'react-youtube'
import { gotVideosThunk } from '../../reducers/videos'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AllVideos extends React.Component {

    async componentDidMount() {
        this.props.getAllVideos()
    }

    onReady(event) {
        event.target.pauseVideo();
      }

    render() {
        console.log(this.props.videos)
        const opts = {
            height: '390',
            width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 1
            }
          };
        if(this.props.videos){
            return (
                <div className='all-videos'>
                <h1 className='all-wow-videos'>ALL WOW VIDEOS</h1>
                <div className="sidenav">
                <Link to={'/'}><a>Login</a></Link>
                <Link to={'/sign-up'}><a>Sign Up</a></Link>
                <Link><a>Misc</a></Link>
                <Link><a>Give Feedback</a></Link>
                </div>
                {this.props.videos.map(video => {
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
                <h1>CANNOT ACCESS VIDEOS</h1>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        videos: state.videos,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllVideos: (userId) => {
            dispatch(gotVideosThunk(userId))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(AllVideos)