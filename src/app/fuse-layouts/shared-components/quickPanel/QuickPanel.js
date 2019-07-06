import React, {Component} from 'react';
import {withStyles, Divider, ListSubheader, Drawer, Typography} from '@material-ui/core/';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from './store/actions/index'
import moment from 'moment';
import {FuseScrollbars} from '@fuse';

const styles = theme => ({
    root: {
        width  : 280,
        padding: 24
    }
});

class QuickPanel extends Component {

    render()
    {
        const {classes, state, toggleQuickPanel} = this.props;
        return (
            <Drawer
                classes={{paper: classes.root}}
                open={state}
                anchor="right"
                onClose={() => toggleQuickPanel(false)}
            >
               <FuseScrollbars>

                    <ListSubheader component="div"><img
                      className="w-24 sm:w-32 mr-8 sm:mr-16 rounded"
                      src="assets/images/component_icons/date_range_black_48dp.png"
                      alt="{form.name}"/>Today</ListSubheader>

                    <div className="mb-0 py-16 px-24">
                        <Typography className="mb-12 text-32" color="textSecondary">
                            {moment().format('dddd')}
                        </Typography>
                        <div className="flex">
                            <Typography className="leading-none text-32" color="textSecondary">{moment().format('DD')}</Typography>
                            <Typography className="leading-none text-16" color="textSecondary">th</Typography>
                            <Typography className="leading-none text-32" color="textSecondary">{moment().format('MMMM')}</Typography>
                        </div>
                    </div>
                    <Divider/>
                </FuseScrollbars>

            </Drawer>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        toggleQuickPanel: Actions.toggleQuickPanel
    }, dispatch);
}

function mapStateToProps({quickPanel})
{
    return {
        state: quickPanel.state
    }
}

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(QuickPanel));
