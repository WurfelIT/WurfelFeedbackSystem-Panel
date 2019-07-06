import React, { Component } from 'react'

import {
    Button, 
    Icon,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    Slide,
} from '@material-ui/core'

import Formsy from 'formsy-react';

import { 
    FusePageCarded, 
    FuseAnimateGroup, 
    FuseAnimate,
    FuseScrollbars,
    TextFieldFormsy,
    SelectFormsy
} from '@fuse';

import BootstrapTable from "react-bootstrap-table-next";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import '../../../styles/tables.css'

import {Link} from 'react-router-dom'
import {hostURL} from '../config/settings'

import store from 'app/store';
import * as Actions from 'app/store/actions';

// ... COMPONENTS...
// import SnackbarComponent, {showSnackbarNotification} from '../Utilities/SnackbarComponent';

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class ViewQuestion extends Component {

  constructor(props)
    {
        super(props);

        this.state = {
            questionsData: [],
            canSubmit: false,
            toggleDialog: false,
        }
    }

    componentDidMount()
    {
        this.fetchQuestions();
    }
    
    fetchQuestions()
    {
        let token = localStorage.getItem('sdzToken');

        fetch(hostURL + '/api/admin/questions/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === true)
            {
                
                this.setState({
                    questionsData: data.data
                }, () => {
                    console.log('Data Fetched Successfully :: ' + JSON.stringify(this.state.questionsData))
                })
                store.dispatch(Actions.showMessage({message: data.msg,variant:'success'}));
            }
            else {
                console.log('Unable to get the result :: ' + data);
                store.dispatch(Actions.showMessage({message: data.msg,variant:'error'}));
            }
        })
        .catch(err => {
            store.dispatch(Actions.showMessage({message: "Error communicating with server \n" + err.msg, variant:'error'}));  
        });
    }

    updateQuestions()
    {
        let token = localStorage.getItem('jwtToken');

        fetch(hostURL + '/api/admin/questions/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === true)
            {
                console.log('Data Fetched Successfully :: ' + data.data)
                this.setState({
                    questionsData: data.data
                })
                // store.dispatch(Actions.showMessage({message: data.msg,variant:'success'}));
                // showSnackbarNotification.call(this, data.msg, 'success');
            }
            else {
                console.log('Unable to get the result :: ' + data);
                store.dispatch(Actions.showMessage({message: data.msg,variant:'error'}));
                // showSnackbarNotification.call(this, data.msg, 'error');
            }
        })
        .catch(err => {
            store.dispatch(Actions.showMessage({message: "Error communicating with server \n" + err.msg, variant:'error'}));
            // showSnackbarNotification.call(this, "Error communicating with server \n" + err.msg, 'error');  
        });
    }

    // ... HANDLERS ...

    handleClickOpen = () => {    
        this.setState({ toggleDialog: true });
    };
          
    handleClose = () => {    
        this.setState({ toggleDialog: false });  
    };

    disableButton = () => {
        this.setState({ canSubmit: true });
    };
    
    enableButton = () => {
        this.setState({ canSubmit: false });
    };

    handleSubmit = () =>{
         let {question} = this.form.getModel();
        let formBody = new FormData();
        formBody.append("question", question);
    
        let token = localStorage.getItem("sdzToken");

        fetch(hostURL + "/api/admin/questions/add", {

        method: "POST",
        headers: {

            Authorization: "Bearer " + token
        },
        body: formBody

        })
        .then(response => response.json())
        .then(data => {
        if (data.status === true) {
            store.dispatch(Actions.showMessage({message: data.msg,variant:'success'}));
            this.handleClose();
            this.updateQuestions();
        }
        else {
            store.dispatch(Actions.showMessage({message: data.msg,variant:'error'})); 
            this.handleClose();
        }
        })
        .catch(err => {
            store.dispatch(Actions.showMessage({message: "Error communicating with server \n" + err.msg, variant:'error'}));
        });
    }


    // ... FORMATTERS ...

    deleteFormatter = (cell, row, rowIndex) => {
        return (
            <Button
                bsSize="small"
                className="btn-custom"
                onClick={() => this.onClickSliderDeleted(cell, row, rowIndex)}
                icon="delete"
                labelPosition="center"
            >
                <Icon className="mr-4 text-20">delete</Icon>
            </Button>
        );
    };

    onClickSliderDeleted(cell, row, rowIndex) {
        //eslint-disable-next-line
        if (confirm("Are you sure you want to delete this Question ? ")) {

            let id = row["id"]
            let token = localStorage.getItem("sdzToken");

            fetch(hostURL + `/api/admin/questions/delete?id=${id}`, {
                headers: {
                    Authorization: "Bearer " + token
                },
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    store.dispatch(Actions.showMessage({message: data.msg,variant:'success'}));
                    this.updateQuestions();
                }
                else {
                    store.dispatch(Actions.showMessage({message: data.msg,variant:'error'}));
                }
            })
            .catch(err => {
                store.dispatch(Actions.showMessage({message: "Error communicating with server \n" + err.msg, variant:'error'}));
            });
        }
    }

    columns = [
        {
            dataField: "id",
            text: "ID",
            isKey: true,
            editable: false
        },
        {
            dataField: "question",
            text: "Question"
        },
        {
            text: "Action",
            formatter: this.deleteFormatter,
            editable: false
        }

    ];

  render() {
    return (
      <> 
        <FusePageCarded
            header={
                <div className="flex flex-1 w-full items-center justify-between">
                            <div className="flex flex-col items-start max-w-full">
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                <Typography
                                    className="normal-case flex items-center sm:mb-12"
                                    component={Link}
                                    role="button"
                                    to="/apps/dashboards/analytics"
                                >
                                    <Icon className="mr-4 text-20">arrow_back</Icon>
                                    Dashboard
                                </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img
                                        className="w-32 sm:w-48 mr-8 sm:mr-16 rounded"
                                        src="assets/images/component_icons/question_white_24dp.png"
                                        alt="{form.name}"
                                        />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {"Questions"}
                                        </Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-end">
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={this.handleClickOpen}
                                >
                                    Add QUESTION
                                </Button>

                                <Dialog
                                    maxWidth='sm'
                                    fullWidth='true'
                                    open={this.state.toggleDialog}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-slide-title"
                                    color="primary.light"
                                    TransitionComponent={Transition}
                                    keepMounted

                                >
                                    <DialogTitle id="form-dialog-slide-title">
                                        Add new Question
                                    </DialogTitle>

                                    <DialogContent>
                                        <DialogContentText style={{ marginBottom: "10px" }}>
                                        Fill the Form and Submit to add Question.
                                        </DialogContentText>

                                        <Grid className="pr-md-1">
                                            <Formsy
                                                onValid={this.enableButton}
                                                onInvalid={this.disableButton}
                                                ref={form => (this.form = form)}
                                                className="flex flex-col justify-center"
                                            >
                                                <TextFieldFormsy
                                                type="text"
                                                name="question"
                                                label="Question"
                                                className="mb-16"
                                                validations={{
                                                    minLength: 10
                                                }}
                                                variant="outlined"
                                                validationErrors={{
                                                    minLength: "Min character length is 10"
                                                }}
                                                required
                                                />
                                            </Formsy>
                                        
                                        </Grid>
                                    </DialogContent>

                                    <DialogActions>
                                        <Button onClick={this.handleClose} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button onClick={this.handleSubmit} ref={btn => this.submitButton = btn} disabled={this.state.canSubmit} color="secondary">
                                            Submit
                                        </Button>
                                    </DialogActions>                                
                                </Dialog>
                            </div>
                        </div>
            }
            content={
                <div className="md:flex max-w-3xl sm:p-24">
                    <div className="flex flex-col flex-1 md:pr-32">
                        <FuseAnimateGroup
                            enter={{
                                animation: "transition.slideUpBigIn"
                            }}
                        >
                            <FuseScrollbars className="flex-grow overflow-x-auto">
                                <BootstrapTable
                                    classes="table-responsive"
                                    striped
                                    keyField="Id"
                                    data={this.state.questionsData}
                                    columns={this.columns}
                                    hover
                                    overflow="scroll"
                                />
                            </FuseScrollbars>
                        </FuseAnimateGroup>
                    </div>
                </div>
            }
        />
        {/* <SnackbarComponent notificationToggle={this.state.notificationToggle || false} notificationMsg = {this.state.notificationMsg || ""} variant = {this.state.variant || "success"} /> */}
      </>
    )
  }
}


// export default(connect(mapStateToProps, mapDispatchToProps)(ViewQuestion));

export default ViewQuestion;