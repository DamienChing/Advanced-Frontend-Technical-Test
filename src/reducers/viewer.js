const initialState = {
  cardCount: -1,
  pageCount: -1,
  currentPage: 0,
  selectedCard: null,
};

const actionToHandler = {
  SET_CARDS_COUNT: (state, action) => {
    return {...state, cardCount: parseInt(action.cardsCount, 10),
      pageCount: action.cardsCount !== 0 ? parseInt(action.cardsCount / 12 + 1, 10) : 0}
  },
  CHANGE_PAGE: (state, action)=> {
    return {...state, currentPage: action.page};
  },
  SELECT_CARD: (state, action) => {
    return {...state, selectedCard: action.id}
  }
};

const cardViewer = (state = initialState, action) => {
  const handler = actionToHandler[action.type];
  return handler ? handler(state, action) : state; //if handler exists then perform action, otherwise return original state
}

export default cardViewer