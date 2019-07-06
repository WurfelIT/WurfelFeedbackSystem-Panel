import {FuseLoadable} from '@fuse'

export const QuestionConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/question/view_question',
            component : FuseLoadable({
                loader: () => import('./ViewQuestion')
            })
        }
    ]
}