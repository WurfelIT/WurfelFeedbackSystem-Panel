import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';

import {appsConfigs} from 'app/main/apps/appsConfigs';
import {LoginConfig} from 'app/main/Login/LoginPageConfig'
import {CustomerConfig} from 'app/main/Customer/CustomerConfig'
import {QuestionConfig} from 'app/main/Question/QuestionConfig'
import {ProfileConfig} from 'app/main/Profile/ProfileConfig'

const routeConfigs = [
    ...appsConfigs,
    LoginConfig,
    CustomerConfig,
    QuestionConfig,
    ProfileConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/login"/>
    },
    {
        component: () => <Redirect to="/pages/errors/error-404"/>
    }
];

 export default routes;
