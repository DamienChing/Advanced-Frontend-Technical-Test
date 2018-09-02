import { PER_PAGE, PER_BLOCK } from "../constants";

// ============================================================================
// Reducer to represent a list of card objects
// ============================================================================

const actionToHandler = {
  // Receive cards from AP and merge cards into cache
  RECEIVE_CARDS: (state, action) => {
    let newState = state.slice();
    const { page, cards } = action;
    const numCards = cards.length;
    const firstCardIndex = page * PER_PAGE;
    const lastCardIndex = page * PER_PAGE + numCards - 1; //subtract 1 for INDEX
    newState[lastCardIndex] = null; //make sure that the array is correct length before splicing in new data, otherwise it gets truncated
    newState.splice(firstCardIndex, numCards, ...cards);
    return newState;
  },

  // Set requested cards to fetching state, so they display loading indicator
  REQUEST_CARDS: (state, action) => {
    let newState = state.slice();
    const { cardCount } = action;
    const firstCardIndex = action.page * PER_PAGE;
    const lastCardIndex = Math.min(firstCardIndex + PER_BLOCK, cardCount - 1); // trim to number of cards count
    const numCards = lastCardIndex - firstCardIndex;
    if (numCards <= 0) return newState;
    newState[lastCardIndex] = null; //make sure that the array is correct length before splicing in new data, otherwise it gets truncated
    newState.splice(
      firstCardIndex,
      numCards,
      ...Array(lastCardIndex - firstCardIndex).fill({ status: "fetching" })
    );
    return newState;
  }
};

const cards = (state = [], action) => {
  const handler = actionToHandler[action.type];
  return handler ? handler(state, action) : state; //if handler exists then perform action, otherwise return original state
};

export default cards;
