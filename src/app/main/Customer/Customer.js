import React, { Component } from 'react'

import {
    Button, 
    Icon,
    Typography,
    Chip
} from '@material-ui/core'

import { withStyles } from '@material-ui/core/styles';

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

import paginationFactory from 'react-bootstrap-table2-paginator';
import cellEditFactory from 'react-bootstrap-table2-editor';

import {Link} from 'react-router-dom'
import {hostURL} from '../config/settings'

// ... COMPONENTS...
import SnackbarComponent, {showSnackbarNotification} from '../Utilities/SnackbarComponent';

const sizePerPageRenderer = ({
    options,
    currSizePerPage,
    onSizePerPageChange
}) => (
        <div className="btn-group" role="group">
            {
                options.map((option) => {
                    const isSelect = currSizePerPage === `${option.page}`;
                    return (
                        <button
                            key={option.text}
                            type="button"
                            onClick={() => onSizePerPageChange(option.page)}
                            className={`btn ${isSelect ? 'btn-secondary' : 'btn-warning'}`}
                        >
                            {option.text}
                        </button>
                    );
                })
            }
        </div>
    );


const useStyles = withStyles(theme => ({
    chip: {
        margin: theme.spacing(1),
    },
}));

class Customer extends Component {

  constructor(props)
    {
        super(props);

        this.state = {
            customersData: [],
            canSubmit: false,
            toggleDialog: false,
        }
    }

    componentDidMount()
    {
        this.fetchCustomers();
    }
    
    fetchCustomers()
    {
        let token = localStorage.getItem('sdzToken');

        fetch(hostURL + '/api/admin/customers/', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.status === true)
            {
                console.log('Data Fetched Successfully :: ' + data.data.name)
                this.setState({
                    customersData: data.data
                })
                showSnackbarNotification.call(this, data.msg, 'success');
            }
            else {
                console.log('Unable to get the result :: ' + data);
                showSnackbarNotification.call(this, data.msg, 'error');
            }
        })
        .catch(err => {
            showSnackbarNotification.call(this, "Error communicating with server \n" + err.msg, 'error');  
        });
    }

    // ... HANDLERS ...

    handleClickOpen = () => {    
        this.setState({ toggleDialog: true });
    };
          
    handleClose = () => {    
        this.setState({ toggleDialog: false });  
    };


    // ... FORMATTERS ...

    imageFormatter = (cell, row, rowIndex) => {
        
            try {
                let obj = JSON.parse(row['images'])

            let objects = [];
            for(let i=0; i<Object.keys(obj).length; i++)
            {
                let format = obj[`image${i}`].substring(obj[`image${i}`].length-4);
                let imageName = obj[`image${i}`].substring(0, obj[`image${i}`].length-4);
                let thumbImage = `${hostURL}`+imageName.concat('_thumb').concat(format);

                console.log(thumbImage);
                
                 objects.push ( <img style={{ width: "30%", margin:'5px' }} src={thumbImage} alt="" /> ) ;
            }

            return ( <div>{objects}</div> );
            } catch (error) {
                return (<div></div>);
            }
    }

    feedbackFormatter = (cell, row, rowIndex) => {
        if(row['feedback'].includes('@'))
        {
            let feedbackArray = row['feedback'].split('@')
            return(this.popFeedback(feedbackArray));
        }       
    };

    deleteFormatter = (cell, row, rowIndex) => {
        return (
            <Button
                bsSize="small"
                className="btn-custom"
                onClick={() => this.onClickCouponDeleted(cell, row, rowIndex)}
                icon="delete"
                labelPosition="center"
            >
                <Icon className="mr-4 text-20">delete</Icon>
            </Button>
        );
    };

    popFeedback(feedbackArray)
    {
        let {classes} = this.props;
        return(feedbackArray.map((item) => {
            if(item)
            {
                if(item.includes('Excellent'))
                {
                    return(<Chip label={item} className={[classes.chip,'bg-green']} style={{margin:'2px'}}/>);
                }
                else if(item.includes('Good'))
                {
                    return(<Chip label={item} className={[classes.chip,'bg-orange']} style={{margin:'2px'}}/>);
                }
                else if(item.includes('Poor'))
                {
                    return(<Chip label={item} className={[classes.chip,'bg-red']} style={{margin:'2px'}}/>);
                }
            }
        }))       
    }

    onClickCouponDeleted(cell, row, rowIndex) {
        //eslint-disable-next-line
        if (confirm("Are you sure you want to delete this Customer ? ")) {

            let id = row["id"]
            let token = localStorage.getItem("jwtToken");

            fetch(hostURL + `/api/admin/customers/delete?id=${id}`, {

                headers: {
                    Authorization: "Bearer " + token
                },

            })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    this.Getallcoupons()
                    showSnackbarNotification.call(this, data.msg, 'success');
                }
                else {
                    showSnackbarNotification.call(this, data.msg, 'error');
                }
            })
            .catch(err => {
                showSnackbarNotification.call(this, "Error communicating with server \n" + err.msg, 'error');
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
            dataField: "name",
            text: "Name"
        },
        {
            dataField: "email",
            text: "Email",
        },
        {
            dataField: "number",
            text: "Number",
        },
        {
            dataField: "feedback",
            text: "Feedback",
            formatter: this.feedbackFormatter,
            style: {minWidth:'220px', maxWidth:'300px',textAlign:'center' }
        },
        {
            dataField: "images",
            text: "Images",
            formatter: this.imageFormatter,
            style: {minWidth:'220px', maxWidth:'300px'}
        },
        {
            text: "Delete",
            formatter: this.deleteFormatter,
            editable: false
        }
    ];

  render() {
    const options = {
        sizePerPageRenderer
    }
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
                                        src="assets/images/component_icons/group_white_24dp.png"
                                        alt="{form.name}"
                                        />
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                        <Typography className="text-16 sm:text-20 truncate">
                                            {"Customers"}
                                        </Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
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
                                    bordered={true}
                                    bootstrap4
                                    keyField="Id"
                                    data={this.state.customersData}
                                    columns={this.columns}
                                    hover
                                    overflow="scroll"
                                    noDataIndication="Table is Empty"
                                    pagination={paginationFactory(options)}
                                />
                            </FuseScrollbars>
                        </FuseAnimateGroup>
                    </div>
                </div>
            }
        />
        <SnackbarComponent notificationToggle={this.state.notificationToggle || false} notificationMsg = {this.state.notificationMsg || ""} variant = {this.state.variant || "success"} />
      </>
    )
  }
}

export default withStyles(useStyles)(Customer);