import React, { Component } from 'react';
import { Button, InputAdornment, Icon } from '@material-ui/core';
import { TextFieldFormsy } from '@fuse';
import Formsy from 'formsy-react';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as authActions from 'app/auth/store/actions';
import { hostURL } from '../../config/settings';

class JWTLoginTab extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            Password: "",
            token: "",
            canSubmit: false,
            data: [],
            errorMsg: ''
        };
    }

    form = React.createRef();

    disableButton = () => {
        this.setState({ canSubmit: false });
    };

    enableButton = () => {
        this.setState({ canSubmit: true });
    };
    
    

    handlenamechange = (event) => {
        this.setState({
            userName: event.target.value
        })

    }

    handlepasswordchange = (event) => {
        this.setState({
            password: event.target.value
        })
    }
        
   onSubmit = (event) => {
  
        let formBody = [];
        let encodednamekey = encodeURIComponent("email");
        let encodednamevalue = encodeURIComponent(this.state.userName);
        formBody.push(encodednamekey + "=" + encodednamevalue)
        let encodedpasswordkey = encodeURIComponent("password");
        let encodedpasswordvalue = encodeURIComponent(this.state.password);
        formBody.push(encodedpasswordkey + "=" + encodedpasswordvalue)
        formBody = formBody.join("&")

        fetch(hostURL + "/api/admin/login", {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: formBody
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === true) {
                    localStorage.setItem('sdz_me', JSON.stringify(data.data));
                    localStorage.setItem("sdzToken", data.token)

                    this.props.history.push("/profile");
                    
                }
                else {
                    // alert("Wrong Credentials")
                    this.setState({
                        errorMsg:'Wrong Credentials'
                    })
                }
            })

    }; 

// ───────────────────────────────────END─────────────────────────────────────────────

    componentDidUpdate(prevProps, prevState) {
        if (this.props.login.error && (this.props.login.error.email || this.props.login.error.password)) {
            this.form.updateInputsWithError({
                ...this.props.login.error
            });

            this.props.login.error = null;
            this.disableButton();
        }

        return null;
    }

    render() {
        return (
            <div className="w-full">
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center w-full"
                >
                    <TextFieldFormsy
                        className="mb-16"
                        type="text"
                        name="name"
                        value={this.state.userName}
                        onChange={this.handlenamechange}
                        label="Username/Email"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">email</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />

                    <TextFieldFormsy
                        className="mb-16"
                        type="password"
                        name="password"
                        value={this.state.Password}
                        onChange={this.handlepasswordchange}
                        label="Password"
                        validations={{
                            minLength: 4
                        }}
                        validationErrors={{
                            minLength: 'Min character length is 4'
                        }}
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Icon className="text-20" color="action">vpn_key</Icon></InputAdornment>
                        }}
                        variant="outlined"
                        required
                    />
                    <p style= {{color:'red', textAlign:'center', fontSize:'1.2em'}}> {this.state.errorMsg} </p>

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className="w-full mx-auto mt-16 normal-case"
                        aria-label="LOG IN"
                        value="legacy"
                    >
                        Login
                    </Button>

                </Formsy>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        submitLogin: authActions.submitLogin
    }, dispatch);
}

function mapStateToProps({ auth }) {
    return {
        login: auth.login,
        user: auth.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(JWTLoginTab));
