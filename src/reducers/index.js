import {combineReducers} from 'redux'
import cards from './cards'
import cardsViewer from './cardViewer'

const store = combineReducers({
    cards,
    cardsViewer
})

export default store;