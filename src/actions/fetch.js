import {setCardCount} from './'

import { url, PAGES_PER_BLOCK, PER_PAGE, PER_BLOCK } from '../constants'

// ============================================================================
// Set cards into fetching state
// ============================================================================
// Parameters:
// -page: first page of block to be fetched (0 indexed)
// -cardCount: maximum number of known cards
export const REQUEST_CARDS = 'REQUEST_CARDS'
function requestCards(page, cardCount) {
  return {
    type: REQUEST_CARDS,
    page,
    cardCount
  }
}

// ============================================================================
// perform fetch and then update card count and store cards in redux store if successufl
// if error, reload application
// ============================================================================
// Parameters:
// -page: first page of block to be fetched (0 indexed)
export const FETCH_CARDS = 'FETCH_CARDS'
function fetchCards(page) {
  return (dispatch, getState) => {
    // only create 'fetching' cards after initial fetch
    const cardCount = getState().viewer.cardCount;
    if (cardCount > 0) dispatch(requestCards(page, cardCount));

    return fetch(`${url}&page=${parseInt(page / PAGES_PER_BLOCK, 10)}&perPage=${PER_BLOCK}`,
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
        window.location.reload();
      })
      .then(json => dispatch(receiveCards(page, json)))
  }
}

// ============================================================================
// checks if block isn't loaded or in fetching state
// ============================================================================
// Parameters:
// -page: first page of block to be fetched (0 indexed)
function shouldFetchCards(state, page) {
  return (page === 0 || page / PAGES_PER_BLOCK >= 1) && !state.cards[page * PER_PAGE] // exclude pages 1, 2 and 3 (0 indexed)
}

// ============================================================================
// from the current page number, check if current or next block needs to be
// fetched.
// ============================================================================
// Parameters:
// -page: current page number (0 indexed)
export function fetchCardsIfNeeded(page) {
  return (dispatch, getState) => {
    const currentBlockStart = page - page % PAGES_PER_BLOCK;
    const nextBlockStart = currentBlockStart + PAGES_PER_BLOCK;

    // fetch for current block of 4 pages
    if (shouldFetchCards(getState(), currentBlockStart))
      dispatch(fetchCards(currentBlockStart));

    // fetch for next block of 4 if not first page
    if (page !== 0 && shouldFetchCards(getState(), nextBlockStart)) {
      dispatch(fetchCards(nextBlockStart));
    }
  }
}

// ============================================================================
// Load card data into redux store
// ============================================================================
// Parameters:
// -page: first page of block to be loaded into (0 indexed)
// -json: list of cards to be loaded
export const RECEIVE_CARDS = 'RECEIVE_CARDS'
function receiveCards(page, json) {
  return {
    type: RECEIVE_CARDS,
    page,
    cards: json
  }
}
