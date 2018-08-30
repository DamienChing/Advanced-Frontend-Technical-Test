export const REQUEST_CARDS = 'REQUEST_CARDS'
function requestCards(page, cardCount) {
  return {
    type: REQUEST_CARDS,
    page,
    cardCount
  }
}

const url = 'https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets?ticketType=incident&sortDirection=DESC'

export const FETCH_CARDS = 'FETCH_CARDS'
export function fetchCards(page) {
  return (dispatch, getState) => {
    // only create 'fetching' cards afetr initial fetch
    const cardCount = getState().viewer.cardCount;
    if (cardCount > 0) dispatch(requestCards(page, cardCount));

    return fetch(`${url}&page=${parseInt(page / 4, 10)}&perPage=48`,
      {
        method: 'GET',
        headers: { apiToken: sessionStorage.getItem('apiToken') }
      })
      .then(response => {
        if (!response.ok) throw (response);
        const cardCount = response.headers.get('X-Total-Count');
        dispatch(setCardCount(cardCount))
        return response.json();
      })
      .catch(error => {
        sessionStorage.removeItem('apiToken');
        // window.location.reload();
      })
      .then(json => dispatch(receiveCards(page, json)))
  }
}

function shouldFetchCards(state, page) {
  return !state.cards[page * 12]
}

export function fetchCardsIfNeeded(page) {
  return (dispatch, getState) => {
    // fetch for current block of 4 pages
    if (shouldFetchCards(getState(), page - page % 4))
      dispatch(fetchCards(page - page % 4));
    // fetch for next block of 4 if not first page
    if (page !== 0 && shouldFetchCards(getState(), page - page % 4 + 4)) {
      dispatch(fetchCards(page - page % 4 + 4));
    }
  }
}

export const RECEIVE_CARDS = 'RECEIVE_CARDS'
function receiveCards(page, json) {
  return {
    type: RECEIVE_CARDS,
    page,
    cards: json
  }
}

export const SET_CARD_COUNT = "SET_CARD_COUNT";
export function setCardCount(cardCount) {
  return {
    type: SET_CARD_COUNT,
    cardCount
  }
}

export const CHANGE_PAGE = 'CHANGE_PAGE';
export function changePage(page) {
  return (
    dispatch => {
      dispatch(fetchCardsIfNeeded(page));
      dispatch ({
        type: CHANGE_PAGE,
        page
      });
    }
  )
}

export const SELECT_CARD = 'SELECT_CARD';
export function selectCard(card) {
  return {
    type: SELECT_CARD,
    card
  }
}