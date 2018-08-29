import React from 'react'
import PropTypes from 'prop-types'
import Card from './card'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%',
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    transition: 'all 0.3s'
  },
  container: {
    height: 750,
    marginTop: 64,
    position: 'relative',
    overflow: 'hidden',
    padding: 32
  },
}

class CardViewer extends React.Component {
  render() {
    if (!this.props.cards) return null;
    const { classes, cards, currentPage, pageCount } = this.props;
    return (
      <div className={classes.container}>
        {
          [...Array(pageCount).keys()].map((page) => {
            if (Math.abs(currentPage - page) <= 1) {
              return <CardGrid key={page} cards={cards.slice(page * 12, (page + 1) * 12)} classes={classes} offset={page - currentPage} />
            } else return null;
          })
        }
      </div>
    )
  }
}

class CardGrid extends React.Component {
  render() {
    const { classes, cards, offset } = this.props;
    return (
      <div className={classes.gridContainer} style={{ transform: `translateY(calc(${offset * 100}% + ${offset * 32}px))`}}>
        <div className={classes.grid}>
          {cards.map((card, i) => { return <Card coreData={card.coreData} key={i} /> })}
        </div>
      </div>
    )
  }
}

CardGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  offset: PropTypes.number.isRequired
}

CardViewer.propTypes = {
  cards: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardViewer);