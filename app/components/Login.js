import React from 'react'
import { login } from '../reducers/auth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email: '',
            password: ''
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

    async handleSubmit(event) {
        event.preventDefault()
        this.props.login(this.state)
        if(this.props.auth){
            this.props.history.push(`/videos/${this.props.auth.id}`);
        }
        
    }

    render() {
            return (
              <div className="add-video-flex">
              <div className="sidenav">
              <Link to={'/login'}><a>Login</a></Link>
              <Link to={'/sign-up'}><a>Sign Up</a></Link>
              <Link><a>Misc</a></Link>
              <Link><a>Give Feedback</a></Link>
              </div>
                <form onSubmit={this.handleSubmit} className="video-flex-box">
                  <h2>Log In:</h2>
                  <label className='add-email'>
                    Email: 
                    <input
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      className='radius-input'
                    />
                  </label>
                  <label className='add-name'>
                    Password: 
                    <input
                      type="text"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      className='radius-input'
                    />
                  </label>
                  <button type="submit" className='log-in-button'>LOG IN</button>
                </form>
              </div>
            );
        }
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => {
            dispatch(login(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)