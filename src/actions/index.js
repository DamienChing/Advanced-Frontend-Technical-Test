export const REQUEST_CARDS = 'REQUEST_CARDS'
function requestCards(page) {
  return {
    type: REQUEST_CARDS,
    page
  }
}

const url = 'https://atr-test-dh1.aiam-dh.com/atr-gateway/ticket-management/api/v1/tickets?ticketType=incident&sortDirection=DESC'

export const FETCH_CARDS = 'FETCH_CARDS'
export function fetchCards(page) {
  return dispatch => {
    dispatch(requestCards(page));
    return fetch(`${url}&page=${page}&perPage=48`,
      {
        method: 'GET',
        headers: { apiToken: sessionStorage.getItem('apiToken') }
      })
      .then(response => {
        if (!response.ok) throw(response);
        const cardsCount = response.headers.get('X-Total-Count');
        dispatch(setCardsCount(cardsCount))
        return response.json();
      })
      .catch(error => {
          sessionStorage.removeItem('apiToken');
          window.location.reload();
      })
      .then(json => dispatch(receiveCards(page, json)))
  }
}

function shouldFetchCards(state, page) {
  return !state.cards[page * 12]
}

export function fetchCardsIfNeeded(page) {
  return (dispatch, getState) => {
    if (shouldFetchCards(getState(), page))
      dispatch(fetchCards(page));
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

export const SET_CARDS_COUNT = "SET_CARDS_COUNT";
export function setCardsCount(cardsCount) {
  return {
    type: SET_CARDS_COUNT,
    cardsCount
  }
}

export const CHANGE_PAGE = 'CHANGE_PAGE';
function changePage(page) {
  return {
    type: CHANGE_PAGE,
    page
  }
}
