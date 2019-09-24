import React, {Component} from 'react'
import $ from 'jquery'

import PasswordInput from '../../SingleComponent/PasswordInput'

export default class ChangePass extends Component{

    state = {
        err: '',
        conErr: ''
    }

    newPass(value){
        var strength = 1;
        var regex = [];
        regex.push(".{8,}"); //For length
        regex.push("[A-Z]"); //For Uppercase Alphabet
        regex.push("[a-z]"); //For Lowercase Alphabet
        regex.push("[0-9]"); //For Numeric Digits
        regex.push("[$@$!%*#?&]"); //For Special Characters
        $.map(regex, function(regexp) {
        if(value.match(regexp))
            strength++;
        });

        if(value === ''){
            this.setState({err: 'Please input new password'})
        }else if(strength === 6){
            this.setState({err: ''})
        }else{
            this.setState({err: 'Password should contain more than 8 characters and at least 1 upper case character, 1 lower case character, 1 number and 1 special character'})
        }
    }

    conPass(value){
        if(value === ''){
            this.setState({conErr: 'Please input confirm password'})
        }else if($('#InputNew').val() === ''){
            this.setState({err: 'Please input new password'})
        }else if(value !== $('#InputNew').val()){
            this.setState({conErr: 'Two passwords that you enter are inconsistent!'})
        }else{
            this.props.changePass(value)
            this.setState({conErr: ''})
        }
    }

    render(){
        return(
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12" style={{margin: '10px', color: '#000000'}}>
                <PasswordInput
                    size = {[12, 12, 12, 12]}
                    id = "InputNew"
                    label = "New Password"
                    placeholder = "New password"
                    msg = "Please Input new password"
                    handleChange = {this.newPass.bind(this)}
                    err = {this.state.err}
                />
                <br/>
                <PasswordInput
                    size = {[12, 12, 12, 12]}
                    id = "InputConfirm"
                    label = "Confirm Password"
                    placeholder = "confirm password"
                    msg = "Please Input confirm password"
                    handleChange = {this.conPass.bind(this)}
                    err = {this.state.conErr}
                />
            </div>
        )
    }
}