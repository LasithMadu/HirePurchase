import React, {Component} from 'react';
import { FilePond } from 'react-filepond';
import $ from 'jquery';
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';
import 'filepond/dist/filepond.min.css';

import LogoUpload from './SubSettings/LogoUpload'
import ChangeTheme from './SubSettings/ChangeTheme'

export default class Settings extends Component {

    constructor(props){
        super(props)
        this.state = {
            logo: false,
            background: false,
            bgColor: localStorage.getItem('bgColor'),
            font: '#0072bb'
        }
    }

    componentDidMount(){

    }

    handleBackground = (color, event) => {
        this.setState({ bgColor: color.hex });
    };

    handleFont = (color, event) => {
        this.setState({ font: color.hex });
    };

    changeTheme(){
        var company;
        if($("#inputCompany").prop('selectedIndex') === 0){
            ToastsStore.warning("Select The Company")
        }else{
            company = $("#inputCompany").val();
        }
        var values = [company, $('#color').val()];
        var path = 'http://localhost:8080/setColor';

        if(values[1] === ''){
            ToastsStore.warning("Color Not Set")
        }else{
            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    ToastsStore.success("Theme Color Changed")
                    localStorage.setItem('bgColor', values[1]);

                    window.location.href = "/settings";
                }else{
                    ToastsStore.error("Theme Color Changed Fail")
                }
              })
              .catch(function (error) {
                ToastsStore.error("Connection Error")
              });
        }
    }

    logoShow(){
        this.setState({logo: !this.state.logo});
    }

    backgroundShow(){
        this.setState({background: !this.state.background});
    }

    changeColor(){
        this.setState({background: true});
        if(this.state.bgColor != ''){
            axios.post('http://localhost:8080/saveBackground', {
                backColor: this.state.bgColor,
                company: localStorage.getItem('company')
            })
            .then(function (response) {
                if(response.data.msg){
                    localStorage.setItem('bgColor', this.state.bgColor);
                }else{
                    //ToastsStore.error("Update Fail")
                }
            })
            .catch(function (error) {
                //ToastsStore.error("Connection Fail")
            });
        }
        if(this.state.font != ''){
            axios.post('http://localhost:8080/saveFont', {
                fontColor: this.state.font,
                company: localStorage.getItem('company')
            })
            .then(function (response) {
                if(response.data.msg){
                    localStorage.setItem('fontColor', this.state.bgColor);
                }else{
                    //ToastsStore.error("Update Fail")
                }
            })
            .catch(function (error) {
                //ToastsStore.error("Connection Fail")
            });
        }

        if(this.state.bgColor != '' || this.state.font != ''){
            axios.post('http://localhost:8080/getColor', {
                company: localStorage.getItem('company')
            })
            .then(function (response) {
                if(response.data.msg){
                    localStorage.setItem('bgColor', response.data.table.rows[0].backColor);
                    localStorage.setItem('fontColor', response.data.table.rows[0].fontColor);
                    window.location.replace('/settings');
                    //window.location.href = "";
                }else{
                    //ToastsStore.error("Color Not Loaded")
                }
            })
            .catch(function (error) {
                //ToastsStore.error(error)
            })
        }
    }

    render(){
        return(
            <div className="container">
                <div className="col-md-12 col-sm-12 col-xs-12 logoupload text-dark">
                    <div className="logoTitle" onClick={this.logoShow.bind(this)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {!this.state.logo
                                    ? <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Upload logo</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.logo
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    {this.state.logo
                        ? <LogoUpload/>
                        : ""
                    }
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 bgcolor text-dark">
                    <div className="logoTitle" onClick={this.backgroundShow.bind(this)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {!this.state.background
                                    ? <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Change Theme</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.background
                                    ? <i className="fa fa-save saveicon" onClick={this.changeColor.bind(this)} style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    {this.state.background
                        ? <ChangeTheme
                            background = {this.state.bgColor}
                            font = {this.state.font}
                            handleBackground = {this.handleBackground}
                            handleFont = {this.handleFont}
                        />
                        : ""
                    }
                </div>
            </div>
        )
    }
}
