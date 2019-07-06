import React from "react"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


export default class ConfirmDialog extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      open: props.open,
      content: props.content
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      open: newProps.open,
      contnet: newProps.content,
    });
  }

  handleClose = () => {
    this.setState({
      open: false,
      content: ""
    });
  };

  onDisagree = () => {
    this.props.handleDialogOutput(false)
    this.handleClose()
  }

  onAgree = () => {
    this.props.handleDialogOutput(true)
    this.handleClose()
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {this.state.content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.onDisagree} color="primary">
              Disagree
            </Button>
            <Button onClick={this.onAgree} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}


      