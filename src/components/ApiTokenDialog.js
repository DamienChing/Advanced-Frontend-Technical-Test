import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Component to retrieve API Token from user input and save to browser session storage.
// Then attempts and initial fetch of the first block.
// If the token is rejected, the token is wiped and another token is reuquest.
class ApiTokenDialog extends React.Component {
  constructor(props) {
    super(props);
    this.apiToken = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault(); //prevent form from linking to page
    sessionStorage.setItem("apiToken", this.apiToken.value);
    this.props.fetchCardsIfNeeded(0);
    this.forceUpdate(); //close dialog by refreshing open prop
  };

  render() {
    return (
      <Dialog open={!sessionStorage.getItem("apiToken")}>
        <DialogTitle id="apitoken-dialog-title">Insert API Token</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To enter this website, please provide an API Token.
          </DialogContentText>
          <form onSubmit={this.onSubmit}>
            <TextField
              autoFocus
              margin="dense"
              id="api_token"
              label="API Token"
              type="text"
              fullWidth
              inputRef={e => (this.apiToken = e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.onSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

ApiTokenDialog.propTypes = {
  fetchCardsIfNeeded: PropTypes.func.isRequired
};

export default ApiTokenDialog;
