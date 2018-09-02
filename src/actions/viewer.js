import {fetchCardsIfNeeded} from './fetch'

// ============================================================================
// Set max cards count
// ============================================================================
// Parameters:
// -cardCount: total number of cards
export const SET_CARD_COUNT = "SET_CARD_COUNT";
export function setCardCount(cardCount) {
  return {
    type: SET_CARD_COUNT,
    cardCount
  }
}

// ============================================================================
// Set current page
// ============================================================================
// Parameters:
// -page: page number to change to (0 indexed)
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

// ============================================================================
// Set selected card to show in details panel
// ============================================================================
// Parameters:
// -card: card data object
export const SELECT_CARD = 'SELECT_CARD';
export function selectCard(card) {
  return {
    type: SELECT_CARD,
    card
  }
}
