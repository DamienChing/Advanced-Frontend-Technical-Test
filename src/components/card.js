import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  card: {
    height: 240,
    overflow: 'hidden',
    maxWidth: 275,
    margin: 5,
    transition: 'all 0.15s',
    '&:hover': {
      transform: 'scale(1.05)',
    },
    '& > .content': {
      width: 275,
      padding: 0, 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class card extends React.Component {
  state = {raised: false}
  onButtonClick = () => {
    this.props.selectCard(this.props.cardData);
  }

  onMouseEnter = () => {
    this.setState({raised: true});
  }

  onMouseLeave = () => {
    this.setState({raised: false});
  }

  render() {
  const { classes, coreData} = this.props;

  return (
    coreData ?
      <Card raised={this.state.raised} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={classes.card} >
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            {coreData.state}
          </Typography>
          <Typography variant="headline" component="h2">
            {coreData.number}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Application: {coreData.application}
            <br />
            Assignee: {coreData.assignee}
          </Typography>
          <Typography component="p">
            {coreData.shortDescription}
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={this.onButtonClick} size="small">Learn More</Button>
        </CardActions>
      </Card >
      :
      <Card className={classes.card}>
        <CardContent className="content">
          <CircularProgress className={classes.progress} size={50} color="primary" />
        </CardContent>
      </Card>
  )
  }
}

card.propTypes = {
  cardData: PropTypes.object.isRequired,
  coreData: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    type: PropTypes.string,
    state: PropTypes.string,
    shortDescription: PropTypes.string,
    application: PropTypes.string,
    assignee: PropTypes.string,
  }),
  selectCard: PropTypes.func.isRequired
}

export default withStyles(styles)(card);