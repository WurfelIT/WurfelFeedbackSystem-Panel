// import {MaterialUINavigation} from 'app/main/components/material-ui/MaterialUINavigation';
// import {authRoles} from 'app/auth';

const navigationConfig = [
    {
        'id'   : 'Profileview',
        'title': 'Profile',
        'type' : 'item',
        'icon' : 'person',
        'url'  : '/profile',
    },
    {
        'id'      : 'customer',
        'title'   : 'Customer',
        'type'    : 'item',
        'icon'    : 'group',
        'url'     : '/customers'
    },
    {
        'id'      : 'question',
        'title'   : 'Question',
        'type'    : 'collapse',
        'icon'    : 'question_answer',
        'children': [
            {
                'id'     : 'view_question',
                'title'  : 'View Question',
                'type'   : 'item',
                'icon'   : 'view_list',
                'url'    : '/question/view_question'
            }
        ]
    }
];

export default navigationConfig;
