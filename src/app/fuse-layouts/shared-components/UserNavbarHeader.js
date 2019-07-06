import React from 'react';
import {AppBar, Avatar, Typography, withStyles} from '@material-ui/core';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import { hostURL } from '../../main/config/settings';

const styles = theme => ({
    root  : {
        '& .user': {
            '& .username, & .email': {
                transition: theme.transitions.create('opacity', {
                    duration: theme.transitions.duration.shortest,
                    easing  : theme.transitions.easing.easeInOut
                })
            }
        }
    },
    avatar: {
        width     : 72,
        height    : 72,
        position  : 'absolute',
        top       : 92,
        padding   : 8,
        background: theme.palette.background.default,
        boxSizing : 'content-box',
        left      : '50%',
        transform : 'translateX(-50%)',
        '& > img' : {
            borderRadius: '50%'
        }
    }
});

const UserNavbarHeader = ({user, classes}) => {
    
    let adminData = '';
    if(localStorage.getItem('sdz_me'))
    adminData = JSON.parse(localStorage.getItem('sdz_me'));

    const admin = {
        username : adminData.admin_name,
        email    : adminData.admin_email,
        image    : adminData.admin_image,
        role     : adminData.role_name
    }

    return (
        <AppBar
            position="static"
            color="primary"
            elevation={0}
            classes={{root: classes.root}}
            className="user relative flex flex-col items-center justify-center pt-24 pb-64 mb-32 z-0"
        >
            <Typography className="username text-16 whitespace-no-wrap" color="inherit">{admin.username ? admin.username : user.data.displayName}</Typography>
            <Typography className="email text-13 mt-8 opacity-50 whitespace-no-wrap" color="inherit">{admin.email ? admin.email : user.data.email}</Typography>
            <Avatar
                className={classNames(classes.avatar, "avatar")}
                alt="user photo"
                src={admin.image ? `${hostURL}${admin.image}` : "assets/images/avatars/profile.jpg"}
            />
        </AppBar>
    );
};

function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps)(UserNavbarHeader));
