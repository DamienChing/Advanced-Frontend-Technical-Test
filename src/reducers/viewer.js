import { PER_PAGE } from "../constants";

// ============================================================================
// Reducer that represents the state of the card viewer.
// ============================================================================

const initialState = {
  cardCount: -1, // card count is -1 before initial load
  pageCount: -1, // page count is calculated when cardCound is changed
  currentPage: 0, // current page indexed to 0
  selectedCard: null // data of the selected card. null if no card selected
};

const actionToHandler = {
  // Set cardCount and calculate pageCount from cardCount. if cardCount 0, pageCount is also 0
  SET_CARD_COUNT: (state, action) => {
    const cardCount = action.cardCount;
    return {
      ...state,
      cardCount: parseInt(cardCount, 10),
      pageCount:
        action.cardsCount !== 0 ? parseInt(cardCount / PER_PAGE + 1, 10) : 0
    };
  },

  // Set current page, 0 indexed
  CHANGE_PAGE: (state, action) => {
    return { ...state, currentPage: action.page };
  },

  // Set selected card, value is the card's data object
  SELECT_CARD: (state, action) => {
    return { ...state, selectedCard: action.card };
  }
};

const cardViewer = (state = initialState, action) => {
  const handler = actionToHandler[action.type];
  return handler ? handler(state, action) : state; //if handler exists then perform action, otherwise return original state
};

export default cardViewer;
