import React, { Component } from 'react';
import { Avatar, AppBar, Button, Card, CardContent, Toolbar, Typography, withStyles } from '@material-ui/core';
import { FusePageSimple, FuseAnimateGroup, FuseAnimate } from '@fuse';
import { hostURL } from '../config/settings'
import {connect} from 'react-redux';


import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'


const styles = theme => ({
    success: {
        background: green[600]
    },
    error: {
        backgrouns: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    close: {
        padding: theme.spacing.unit / 2
    }
})


class Profileview extends Component {
    constructor(props) {
        super(props)

        this.state = {
            profile: null,
        };

    }

    render() {

        let adminData = '';
        if(localStorage.getItem('sdz_me'))
        adminData = JSON.parse(localStorage.getItem('sdz_me'));

        let {user} = this.props;

        return (
            <>
                <FusePageSimple
                    header={
                        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
                            <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
                                <FuseAnimate animation="transition.expandIn" delay={300}>
                                    <Avatar className="w-96 h-96" src={adminData.admin_image ? `${hostURL}${adminData.admin_image}` : `assets/images/avatars/Velazquez.jpg`} />
                                </FuseAnimate>
                                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                    <Typography className="md:ml-24" variant="h4" color="inherit">{adminData.admin_name ? adminData.admin_name : ""}</Typography>
                                </FuseAnimate>
                            </div>

                            {/* <div className="flex items-center justify-end">
                                <Button className="mr-8 normal-case" variant="contained" color="secondary" aria-label="Follow">Follow</Button>
                                <Button className="normal-case" variant="contained" color="primary" aria-label="Send Message">Send Message</Button>
                            </div> */}
                        </div>
                    }
                    content={
                        <div className="md:flex max-w-lg p-16 sm:p-24">

                            <div className="flex flex-col flex-1 md:pr-32">
                                <FuseAnimateGroup
                                    enter={{
                                        animation: "transition.slideUpBigIn"
                                    }}
                                >

                                    <Card className="w-full mb-16">
                                        <AppBar position="static" elevation={0}>
                                            <Toolbar className="pl-16 pr-8">
                                                <Typography variant="subtitle1" color="inherit" className="flex-1">
                                                    Profile Information
                                            </Typography>
                                            </Toolbar>
                                        </AppBar>

                                        <CardContent>
                                            <div className="mb-24">
                                                <Typography className="font-bold mb-4 text-15">Name</Typography>
                                                <Typography>{adminData.admin_name ? adminData.admin_name : ""}</Typography>
                                            </div>

                                            <div className="mb-24">
                                                <Typography className="font-bold mb-4 text-15">Email</Typography>
                                                <Typography>{adminData.admin_email ? adminData.admin_email : ""}</Typography>
                                            </div>

                                        </CardContent>
                                    </Card>

                                </FuseAnimateGroup>
                            </div>
                        </div>
                    }
                />
            </>
        );
    }
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles)(connect(mapStateToProps)(Profileview));
