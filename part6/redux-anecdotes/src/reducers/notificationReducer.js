import { createSlice } from '@reduxjs/toolkit'

const initialState = 'The Notification shows up here !!'

const notificationSlice = createSlice({
    name: 'notifcation',
    initialState,
    reducers: {}
})

export default notificationSlice.reducer