import React, {Component} from 'react';
import {Avatar, Button, Icon, ListItemIcon, ListItemText, Popover, MenuItem, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { hostURL } from '../../main/config/settings';
import history from '../../../history'
import jwtDecode from 'jwt-decode'

import { Redirect } from 'react-router-dom';

class UserMenu extends Component {

    constructor(props)
    {
        super(props);

        this.state={
            userMenu: null
        }
    }

    userMenuClick = event => {
        this.setState({userMenu: event.currentTarget});
    };

    userMenuClose = () => {
        this.setState({userMenu: null});
    };

    logout = () => {
        localStorage.clear();
            history.push({
                pathname: '/'
            })
    }

    render()
    {    
        let adminData = '';
        if(localStorage.getItem('sdz_me'))
        adminData = JSON.parse(localStorage.getItem('sdz_me'));

        const {user} = this.props;
        const {userMenu} = this.state;
     
        console.log('Admin data :: ' + JSON.stringify(adminData));

        const admin = {
            username : adminData.admin_name,
            email    : adminData.admin_email,
            image    : adminData.admin_image,
            role     : adminData.role_name
        }

        return (
            <React.Fragment>

                <Button className="h-64" onClick={this.userMenuClick}>
                    {admin.image ?
                        (
                            <Avatar className="" alt="user photo" src={`${hostURL}${admin.image}`}/>
                        )
                        :
                        (
                            <Avatar className="">
                                {admin.username ? admin.username : user.data.displayName[0]}
                            </Avatar>
                        )
                    }

                    <div className="hidden md:flex flex-col ml-12 items-start">
                        <Typography component="span" className="normal-case font-600 flex">
                            {admin.username ? admin.username : user.data.displayName}
                        </Typography>
                        <Typography className="text-11 capitalize" color="textSecondary">
                            {admin.role ? admin.role : user.role}
                        </Typography>
                    </div>

                    <Icon className="text-16 ml-12 hidden sm:flex" variant="action">keyboard_arrow_down</Icon>
                </Button>

                <Popover
                    open={Boolean(userMenu)}
                    anchorEl={userMenu}
                    onClose={this.userMenuClose}
                    anchorOrigin={{
                        vertical  : 'bottom',
                        horizontal: 'center'
                    }}
                    transformOrigin={{
                        vertical  : 'top',
                        horizontal: 'center'
                    }}
                    classes={{
                        paper: "py-8"
                    }}
                >
                    {user.role === 'admin' ? (
                        <React.Fragment>
                            <MenuItem component={Link} to="/login">
                                <ListItemIcon>
                                    <Icon>lock</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Login"/>
                            </MenuItem>
                            <MenuItem component={Link} to="/register">
                                <ListItemIcon>
                                    <Icon>person_add</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Register"/>
                            </MenuItem>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <MenuItem component={Link} to="/profile" onClick={this.userMenuClose}>
                                <ListItemIcon>
                                    <Icon>account_circle</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="My Profile"/>
                            </MenuItem>
                            {/* <MenuItem component={Link} to="/apps/mail" onClick={this.userMenuClose}>
                                <ListItemIcon>
                                    <Icon>mail</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Inbox"/>
                            </MenuItem> */}
                            <MenuItem
                                onClick={() => {
                                    this.logout();
                                    
                                    // this.props.history.push("/apps/dashboards/analytics");
                                    this.userMenuClose();
                                }}
                            >
                                <ListItemIcon>
                                    <Icon>exit_to_app</Icon>
                                </ListItemIcon>
                                <ListItemText className="pl-0" primary="Logout"/>
                            </MenuItem>
                        </React.Fragment>
                    )}
                </Popover>
            </React.Fragment>
        );
    }
}

function mapStateToProps({auth})
{
    return {
        user: auth.user
    }
}

export default connect(mapStateToProps, null)(UserMenu);
