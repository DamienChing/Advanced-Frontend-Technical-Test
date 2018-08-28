import {combineReducers} from 'redux'
import cards from './cards'
import viewer from './viewer'

const store = combineReducers({
    cards,
    viewer
})

export default store;