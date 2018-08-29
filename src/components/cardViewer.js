import React from 'react'
import PropTypes from 'prop-types'
import Card from './card'
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '25% 25% 25% 25%'
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    height: 750,
    marginTop: 64,
  }
}

class CardViewer extends React.Component {
  render() {
    if (!this.props.cards) return null;
    const { classes, cards } = this.props;
    return (
      <div className={classes.container}>
        <CardGrid cards={cards} classes={classes} />
      </div>
    )
  }
}

class CardGrid extends React.Component {
  render() {
    const { classes, cards } = this.props;
    return (
      <div className={classes.grid}>
        {cards.map((card, i) => { return <Card coreData={card.coreData} key={i} /> })}
      </div>
    )
  }
}

CardGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
}

CardViewer.propTypes = {
  cards: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardViewer);