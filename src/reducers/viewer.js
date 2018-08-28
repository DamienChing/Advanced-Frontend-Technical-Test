const initialState = {
  cardCount: 0,
  currentPage: 0
};

const actionToHandler = {
  SET_CARDS_COUNT: (state, action) => {
    return {...state, cardCount: action.cardsCount}
  },
  CHANGE_PAGE: (state, action)=> {
    return {...state, currentPage: action.page};
  }
};

const cardViewer = (state = initialState, action) => {
  const handler = actionToHandler[action.type];
  return handler ? handler(state, action) : state; //if handler exists then perform action, otherwise return original state
}

export default cardViewer