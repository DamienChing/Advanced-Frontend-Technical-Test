import React from "react";
import PropTypes from "prop-types";
import Card from "./Card";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import debounceRender from 'react-debounce-render'
import { PER_PAGE } from "../constants";

// ============================================================================
// Component display pages of CardGrids, or display circular progress if
// waiting for inital fetch.
// ============================================================================
// Props:
// - cards: redux store of all cards
// - currentPage: current page, 0 indexed
// - pageCount: total number of pages
// - classes: JSS styles
// - selectCard: action creator to select a specific card
// ============================================================================
class CardViewer extends React.Component {

  renderPage = page => {
    const { cards, currentPage, selectCard } = this.props;
    if (Math.abs(currentPage - page) <= 1) {
      return (
        <StyledCardGrid
          key={page}
          cards={cards.slice(page * PER_PAGE, (page + 1) * PER_PAGE)}
          offset={page - currentPage}
          selectCard={selectCard}
        />
      );
    } else return null;
  };

  update(nextProps, nextState){
    return true;
  }

  // shouldComponentUpdate = _.throttle(this.update, 1000, {leading: true});

  render() {
    const { classes, cards, pageCount } = this.props;
    const loading = pageCount === -1 || !cards.length;
    return (
      <div className={classes.container + (loading ? " loading" : "")}> {/* toggle loading classname to fade out */}
        {loading && <CircularProgress size={50} />}
        {[...Array(Math.max(pageCount, 0)).keys()].map(this.renderPage)}
      </div>
    );
  }
}

CardViewer.propTypes = {
  cards: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  selectCard: PropTypes.func.isRequired
};

// ============================================================================
// Component that represents each page of cards in a grid
// ============================================================================
// Props:
// - cards: redux store of all cards
// - offset: pages from current page
// - classes: JSS styles
// - selectCard: action creator to select a specific card
// ============================================================================
class CardGrid extends React.Component {
  render() {
    const { classes, cards, offset, selectCard } = this.props;
    return (
      <div
        className={classes.gridContainer}
        style={{
          // use offset value to slide cards in
          transform: `translateY(calc(${offset * 100}% + ${offset * 32}px))`
        }}
      >
        <div className={classes.grid}>
          {cards.map((card, i) => {
            return (
              <Card
                cardData={card}
                key={i}
                selectCard={selectCard}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

CardGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  offset: PropTypes.number.isRequired,
  selectCard: PropTypes.func.isRequired
};

const viewerStyles = {
  container: {
    height: 750,
    marginTop: 64,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    padding: 32,
    opacity: 1,
    "& > div": {
      transition: "all 0.3s ease"
    },
    "&.loading > div:not(:first-child)": {
      opacity: "0 !important"
    }
  }
};

const gridStyles = {
  grid: {
    width: 1140,
    maxWidth: "100%",
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    gridTemplateRows: "250px 250px"
  },
  gridContainer: {
    position: "absolute",
    width: "100%",
    height: 750,
    display: "flex",
    justifyContent: "center",
    transition: "opacity  0.3s ease"
  }
};

export const StyledCardGrid = withStyles(gridStyles)(CardGrid);
// export default withStyles(viewerStyles)(CardViewer);
export default debounceRender(withStyles(viewerStyles)(CardViewer), 150, {leading:true});
