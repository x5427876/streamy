import streams from "../apis/streams"
import history from "../history"
import {
    SIGN_IN, SIGN_OUT, CREATE_STREAM,
    FETCH_STREAMS, FETCH_STREAM,
    DELETE_STREAM, EDIT_STREAM
} from "./types"

export const signIn = (userId) => {
    return {
        type: SIGN_IN,
        payload: userId
    }
}

export const signOut = () => {
    return {
        type: SIGN_OUT
    }
}

export const createStream = (formVales) => async (dispatch, getState) => {
    const { userId } = getState().auth
    const response = await streams.post('/streams', { ...formVales, userId })

    dispatch({
        type: CREATE_STREAM,
        payload: response.data
    })
    history.push('/')  //push為導至特定route
}

export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams')
    dispatch({
        type: FETCH_STREAMS,
        payload: response.data
    })
}

export const fetchStream = (id) => async dispatch => {
    const response = await streams.get(`/streams/${id}`)
    dispatch({
        type: FETCH_STREAM,
        payload: response.data
    })
}

export const editStream = (id, formVales) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formVales)  //put request 會複寫已擁有內容，若無複寫到則刪除，patch只會修改
    dispatch({
        type: EDIT_STREAM,
        payload: response.data
    })
    history.push('/')
}

export const deleteStream = (id) => async dispatch => {
    await streams.delete(`/streams/${id}`)
    dispatch({
        type: DELETE_STREAM,
        payload: id
    })
    history.push('/')
}
