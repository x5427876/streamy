import _ from 'loadsh'
import {
    CREATE_STREAM,
    FETCH_STREAMS, FETCH_STREAM,
    DELETE_STREAM, EDIT_STREAM
} from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_STREAMS:
            return { ...state, ..._.mapKeys(action.payload, 'id') }  //mapKeys為lodash函數，可將參數2(id)作為新object key，參數1(aciton.payload)作為object value
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }
        case DELETE_STREAM:
            return _.omit(state, action.payload)  //omit為lodash函數，可建立新object從參數1(state)中刪除參數2(action.payload)
        default:
            return state
    }
}