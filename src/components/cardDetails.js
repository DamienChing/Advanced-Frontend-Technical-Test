import React from 'react'
import PropTypes from 'prop-types'
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  list: {
    width: 640,
    '& > li': {
      display: 'flex',
      '& > div:first-child': {
        maxWidth: '25%'
      },
      '& > div:last-child': {
        flex: 1
      }
    }
  },
  header: {
    height: 64,
    padding: "4px 16px",
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& h1': {
      fontSize: 32,
    },
    '& > button': {
      marginRight: -8
    }
  }
};

class CardDetails extends React.Component {
  close = () => {
    this.props.selectCard(null);
  }
  render() {
    const { card, classes } = this.props;
    const serviceData = card && card.serviceData;
    return (
      <Drawer anchor="right" open={card} onClose={this.close}>
        {card &&
          <div>
            <div className={classes.header}>
              <Typography variant="headline" component="h1">
                {card.coreData.number}
              </Typography>
              <IconButton color="primary" className={classes.button} aria-label="Add to shopping cart" onClick={this.close}>
                <CloseIcon/>
              </IconButton>
            </div>
            <List className={classes.list} component="nav">
              <ListItem>
                <ListItemText primary="Assigned To" />
                <Input value={card.coreData.assignee} inputProps={{ 'aria-label': 'Assigned To' }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Short Description" />
                <Input value={card.coreData.shortDescription} inputProps={{ 'aria-label': 'Short Description' }} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Application" />
                <Input value={card.coreData.application} inputProps={{ 'aria-label': 'Application' }} />
              </ListItem>
              {Object.keys(serviceData).map((key) => {
                return (
                  <ListItem>
                    <ListItemText primary={key} />
                    <Input value={serviceData[key]} inputProps={{ 'aria-label': key }} />
                  </ListItem>
                )
              })}
            </List>
          </div>
        }
      </Drawer>
    )
  }
}

CardDetails.propTypes = {
  card: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CardDetails);