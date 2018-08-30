import {combineReducers} from 'redux'
import cards from './cards'
import viewer from './viewer'

// ============================================================================
// Reducer to represent a list of card objects
// ============================================================================
// - cards: card data
// - viewer: other card viewer related state variables
// ============================================================================

const store = combineReducers({
    cards,
    viewer
})

export default store;