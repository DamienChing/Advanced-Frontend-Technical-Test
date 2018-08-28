import React from 'react'
import {connect} from 'react-redux'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {fetchCardsIfNeeded} from '../actions'


class ApiTokenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.apiToken = React.createRef();
  }

  onSubmit = (e) => {
    e.preventDefault(); //prevent form from linking to page
    sessionStorage.setItem('apiToken', this.apiToken.value);
    this.props.fetchCardsIfNeeded(0);
    this.forceUpdate(); //close dialog by refreshing open prop
  }

  render() {
    return (
      <Dialog open={!sessionStorage.getItem('apiToken')}>
        <DialogTitle id="apitoken-dialog-title">Insert API Token</DialogTitle>
        <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <form onSubmit={this.onSubmit}>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="API Token"
                type="text"
                fullWidth
                inputRef={e => this.apiToken = e}
              />
            </form>
          </DialogContent>
        <DialogActions>
          <Button onClick={this.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(null, {fetchCardsIfNeeded})(ApiTokenDialog)