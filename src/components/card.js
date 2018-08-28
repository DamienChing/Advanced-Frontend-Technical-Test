import React from 'react'
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';


const styles = {
  card: {
    maxWidth: 275,
    margin: 5,
    transition: 'all 0.15s',
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

const card = (props) => {
  const { classes, coreData } = props;
  if (!coreData) return null;
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {coreData.state}
        </Typography>
        <Typography variant="headline" component="h2">
          {coreData.number}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Application: {coreData.application}
          <br/>
          Assignee: {coreData.assignee}
        </Typography>
        <Typography component="p">
          {coreData.shortDescription}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  )
}

card.propTypes = {
  coreData: PropTypes.shape({
    id: PropTypes.string,
    number: PropTypes.string,
    type: PropTypes.string,
    state: PropTypes.string,
    shortDescription: PropTypes.string,
    application: PropTypes.string,
    assignee: PropTypes.string,
  })
}

export default withStyles(styles)(card);