// import Customer from './Customer'
import {FuseLoadable} from '@fuse'

export const CustomerConfig = {
    settings: {
        layout: {
            config:{}
        }
    },
    routes: [
        {
            path : '/customers',
            component: FuseLoadable({
                loader: () => import('./Customer')
            })
        }
    ]
}