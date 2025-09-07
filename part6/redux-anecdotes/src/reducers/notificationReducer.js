import { createSlice } from '@reduxjs/toolkit'

const initialState = 'The Notification shows up here !!'

const notificationSlice = createSlice({
    name: 'notifcation',
    initialState,
    reducers: {
        setNotification(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return action.payload
        }
    }
})

export const { setNotification, removeNotification} = notificationSlice.actions

export const setTimedNotification = (message, timeInSec) => {
    return async dispatch => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification(''))
        }, timeInSec*1000);
    }
}

export default notificationSlice.reducer