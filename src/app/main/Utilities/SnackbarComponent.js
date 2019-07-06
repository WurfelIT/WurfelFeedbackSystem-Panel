import React, { Component } from "react";
import PropTypes from "prop-types";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContentWrapper from "./SnackbarContentWrapper"
import {withStyles} from "@material-ui/core"

const SnackbarStyles = theme => ({
  margin: {
    margin: theme.spacing.unit
  }
});

export function showSnackbarNotification(msg, variant) {
  this.setState({
    [`notificationMsg`]: msg, 
    [`notificationToggle`]: true,
    [`variant`]: variant
  })

  setTimeout(()=>{
    this.setState({
      [`notificationMsg`]: msg, 
      [`notificationToggle`]: false,
      [`variant`]: variant
    })
  } , 1500)
}

class SnackbarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationMsg: props.notificationMsg,
      notificationToggle: props.notificationToggle,
      variant: props.variant
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      notificationMsg: newProps.notificationMsg,
      notificationToggle: newProps.notificationToggle,
      variant: newProps.variant 
    });
  }

  handleNotificationClose = () => {
    this.setState({
      notificationToggle: false
      //notificationMsg: "",
    });
  };

  render() {
    let { classes } = this.props;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={this.state.notificationToggle}
        autoHideDuration={2300}
        onClose={this.handleNotificationClose}
      >
        <SnackbarContentWrapper
          onClose={this.handleNotificationClose}
          variant={this.state.variant}
          message={this.state.notificationMsg}
          className={classes.margin}
        />
      </Snackbar>
    );
  }
}

export default withStyles(SnackbarStyles)(SnackbarComponent) ;

SnackbarComponent.propTypes = {
  notificationToggle: PropTypes.bool.isRequired,
  notificationMsg: PropTypes.string.isRequired
};
