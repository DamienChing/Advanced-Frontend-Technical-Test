import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

// ============================================================================
// Component to display current and maximum page, and controls to go to next or
// last page.
// ============================================================================
// Props:
// - viewer: redux store of card viewer state variables
// - classes: JSS styles
// - changePage: action creator to change page number, 0 indexed
// ============================================================================

class PaginationControls extends React.Component {
  onBackward = () => {
    this.props.changePage(this.props.viewer.currentPage - 1);
  };

  onForward = () => {
    this.props.changePage(this.props.viewer.currentPage + 1);
  };

  render() {
    const { viewer, classes } = this.props;
    const display = viewer.pageCount < 1; //used to fade in controls
    return (
      <div className={classes.container} style={{ opacity: display ? 0 : 1 }}>
        <Button onClick={this.onBackward} disabled={viewer.currentPage === 0}>
          Back
        </Button>
        <span style={{ width: 300, display: "inline-block" }}>
          {`Page ${viewer.currentPage + 1} of ${viewer.pageCount}`}
        </span>
        <Button
          onClick={this.onForward}
          disabled={viewer.currentPage + 1 === viewer.pageCount}
        >
          Forward
        </Button>
      </div>
    );
  }
}

PaginationControls.propTypes = {
  viewer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  changePage: PropTypes.func.isRequired
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    transition: "opacity 0.3s"
  }
};

export default withStyles(styles)(PaginationControls);
