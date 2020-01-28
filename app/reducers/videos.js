import axios from 'axios'
const GET_VIDEOS = 'GET_VIDEOS'
const GET_VIDEO = 'GET_VIDEO'
const GET_USER = 'GET_USER'
const ADD_VIDEO = 'ADD_VIDEO'
const EDIT_VIDEO = 'EDIT_VIDEO'
const DELETE_VIDEO = 'DELETE_VIDEO'

const getVideos = (videos) => {
    return {
        type: GET_VIDEOS,
        videos
    }
}

const getVideo = (video) => {
    return {
        type: GET_VIDEO,
        video
    }
}

const getUser = (user) => {
    return {
        type: GET_USER,
        user
    }
}

const addVideo = (newVideo) => {
    return {
        type: ADD_VIDEO,
        newVideo
    }
}

const editVideo = (edit) => {
    return {
        type: EDIT_VIDEO,
        edit
    }
}

const deleteVideo = (deleted) => {
    return {
        type: DELETE_VIDEO,
        deleted
    }
}

export const gotVideosThunk = () => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/videos`)
            dispatch(getVideos(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const gotVideoThunk = (videoId) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/videos/${videoId}`)
            dispatch(getVideo(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const gotUsersVideoThunk = (userId) => {
    return async dispatch => {
        try {
            const {data} = await axios.get(`/api/users/${userId}`)
            dispatch(getUser(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const addVideoThunk = (userId,newVideo) => {
    return async dispatch => {
        try {
            console.log(userId, newVideo)
            const {data} = await axios.post(`/api/videos/${userId}`, newVideo)
            console.log('data',data)
            dispatch(addVideo(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const editVideoThunk = (videoId, newVideo, userId) => {
    return async dispatch => {
        console.log(newVideo)
        try {
            const {data} = await axios.put(`/api/videos/${videoId}/${userId}`, newVideo)
            dispatch(editVideo(data))
        } catch (error) {
            console.error(error)
        }
    }
}

export const deleteVideoThunk = (videoId) => {
    return async dispatch => {
        try {
            const {data} = await axios.delete(`/api/videos/${videoId}`)
            dispatch(getVideos(data)) 
        } catch (error) {
            console.error(error)
        }
    }
}

const getVideosReducer = (state = [], action) => {
    switch (action.type) {
        case GET_VIDEOS:
            return action.videos
        default:
            return state
    }
}

export const getVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_VIDEO:
            return action.video
        default:
            return state
    }
}

export const getUserReducer = (state = {videos:[]}, action) => {
    switch (action.type) {
        case GET_USER:
            return action.user
        default:
            return state
    }
}

export const addVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_VIDEO:
            return action.newVideo
        default:
            return state
    }
}

export default getVideosReducer