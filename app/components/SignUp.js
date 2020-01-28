import React from 'react'
import { signup } from '../reducers/auth'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class AddVideo extends React.Component {
    constructor(){
        super()
        this.state = {
            name: '',
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

    handleSubmit(event) {
        event.preventDefault()
        this.props.signup(this.state)
        if(this.props.auth){
            this.props.history.push(`/videos/${this.props.auth.id}`);
        }
        
    }

    render() {
            return (
              <div className="add-video-flex">
              <div className="sidenav">
              <Link to={'/login'}><a>Login</a></Link>
              <Link><a>Misc</a></Link>
              <Link><a>Give Feedback</a></Link>
              </div>
                <form onSubmit={this.handleSubmit} className="video-flex-box">
                  <h2>Sign Up:</h2>
                  <label className='sign-up-name'>
                    Name: 
                    <input
                      type="text"
                      name="name"
                      onChange={this.handleChange}
                      value={this.state.name}
                      className='radius-input'
                    />
                  </label>
                  <label className='sign-up-email'>
                    Email: 
                    <input
                      type="text"
                      name="email"
                      onChange={this.handleChange}
                      value={this.state.email}
                      className='radius-input'
                    />
                  </label>
                  <label className='sign-up-password'>
                    Password: 
                    <input
                      type="text"
                      name="password"
                      onChange={this.handleChange}
                      value={this.state.password}
                      className='radius-input'
                    />
                  </label>
                  <button type="submit" className='sign-up-button'>SIGN UP</button>
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
        signup: (user) => {
            dispatch(signup(user))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVideo)