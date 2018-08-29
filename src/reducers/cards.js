const actionToHandler = {
  RECEIVE_CARDS: (state, action) => {
    let newState = state.slice();
    newState[action.page * 12 + action.cards.length - 1] = null; //make sure that the array is correct length before splicing in new data
    newState.splice(action.page * 12, action.cards.length, ...action.cards);
    return newState;
  },
  REQUEST_CARDS: (state, action) => {
    let newState = state.slice();
    const firstCard = action.page * 12;
    const lastCard = Math.min(firstCard + 48, action.cardCount);
    for (let i = firstCard; i < lastCard; i++) {
      newState[i] = { status: 'fetching' };
    }
    return newState;
  },
};

const cards = (state = [], action) => {
  const handler = actionToHandler[action.type];
  return handler ? handler(state, action) : state; //if handler exists then perform action, otherwise return original state
}

export default cards;