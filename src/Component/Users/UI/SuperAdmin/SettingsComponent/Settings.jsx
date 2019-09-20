import React, {Component} from 'react';
import $ from 'jquery';
import axios from 'axios'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.

import LogoUpload from './SubSettings/LogoUpload'
import ChangeTheme from './SubSettings/ChangeTheme'
import Configure from './SubSettings/Configure'

export default class Settings extends Component {

    constructor(props){
        super(props)
        this.state = {
            logo: false,
            background: false,
            bgColor: sessionStorage.getItem('bgColor'),
            font: '#0072bb',
            saveIcon: [false, false, false],
            expArr: [false, false, false],
            countAdmin: 0,
            countOparator: 0
        }
        this.handleBackground = this.handleBackground.bind(this)
    }

    componentDidMount(){
        var self = this;
        axios.get(sessionStorage.getItem('url') + '/getConfigure')
        .then(function (response) {
            if (response.data.msg) {
                self.setState({ countAdmin: response.data.values[0], countOparator: response.data.values[1]})
            }
        })
        .catch(function (error) {
            console.log("Connection Error");
        });
    }

    handleBackground(color){
        this.setState({ bgColor: color.hex });
    };

    handleFont = (color, event) => {
        this.setState({ font: color.hex });
    };

    changeTheme(){
        var company;
        if($("#inputCompany").prop('selectedIndex') === 0){
            alert("Select The Company")
        }else{
            company = $("#inputCompany").val();
        }
        var values = [company, $('#color').val()];
        var path = sessionStorage.getItem('url')+'/setColor';

        if(values[1] === ''){
            alert("Color Not Set")
        }else{
            axios.post(path, {
                data: values
              })
              .then(function (response) {
                if(response.data.msg){
                    alert("Theme Color Changed")
                    sessionStorage.setItem('bgColor', values[1]);

                    window.location.href = "/settings";
                }else{
                    alert("Theme Color Changed Fail")
                }
              })
              .catch(function (error) {
                  console.log("Connection Error");
              });
        }
    }

    logoShow(value){
        if(this.state.expArr[value-1]){
           this.state.expArr[value-1] = false;
            this.forceUpdate()
        }else{
            this.state.expArr[value-1] = true;
            this.forceUpdate()
        }        
    }

    backgroundShow(){
        this.setState({background: !this.state.background});
    }

    changeColor(bgColor){
        this.setState({bgColor: bgColor.hex});
        if(bgColor.hex !== ''){
            axios.post(sessionStorage.getItem('url')+'/saveBackground', {
                backColor: bgColor.hex,
                company: sessionStorage.getItem('company')
            })
            .then(function (response) {
                if(response.data.msg){
                    console.log(response);
                    sessionStorage.setItem('bgColor', bgColor.hex);
                    window.location.replace('/settings');
                }else{
                    //ToastsStore.error("Update Fail")
                }
            })
            .catch(function (error) {
                //ToastsStore.error("Connection Fail")
            });
        }
        // if(this.state.font !== ''){
        //     axios.post(sessionStorage.getItem('url')+'/saveFont', {
        //         fontColor: this.state.font,
        //         company: sessionStorage.getItem('company')
        //     })
        //     .then(function (response) {
        //         if(response.data.msg){
        //             sessionStorage.setItem('fontColor', this.state.fontColor);
        //         }else{
        //             //ToastsStore.error("Update Fail")
        //         }
        //     })
        //     .catch(function (error) {
        //         //ToastsStore.error("Connection Fail")
        //     });
        // }

        // if(self.state.bgColor !== '' || self.state.font != ''){
        //     axios.post('sessionStorage.getItem('url')+/getColor', {
        //         company: sessionStorage.getItem('company')
        //     })
        //     .then(function (response) {
        //         if(response.data.msg){
        //             sessionStorage.setItem('bgColor', response.data.table.rows[0].backColor);
        //             sessionStorage.setItem('fontColor', response.data.table.rows[0].fontColor);
        //             window.location.replace('/settings');
        //             //window.location.href = "";
        //         }else{
        //             //ToastsStore.error("Color Not Loaded")
        //         }
        //     })
        //     .catch(function (error) {
        //         //ToastsStore.error(error)
        //     })
        // }
    }

    render(){
        return(
            <div className="container" style={{marginTop: '20px'}}>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+sessionStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(1)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[0]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Upload logo</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[0] && this.state.expArr[0]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[0]
                            ? <LogoUpload changeCustomer={this.changeCustomer} setNic={this.setNic}/>
                            : ""
                        }
                </div>
                <br/>
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{border: '2px solid '+sessionStorage.getItem('bgColor')}}>
                    <div className="itemTitle" onClick={() => this.logoShow(2)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[1]
                                    ? <i class="fa fa-angle-down arrowicon" style={{fontSize: '20px'}}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{fontSize: '20px'}}></i>
                                }
                                <h4 className="uploadTitle">Change Theme</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[1] && this.state.expArr[1]
                                    ? <i className="fa fa-save saveicon" style={{fontSize: '20px'}}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                        {this.state.expArr[1]
                            ? <ChangeTheme
                                background = {this.state.bgColor}
                                font = {this.state.font}
                                handleBackground = {this.handleBackground}
                                handleFont = {this.handleFont}
                                changeColor = {this.changeColor}
                                handleBackground = {this.handleBackground}
                            />
                            : ""
                        }
                </div>
                <br />
                <div className="col-md-12 col-sm-12 col-xs-12 topItem" style={{ border: '2px solid ' + sessionStorage.getItem('bgColor') }}>
                    <div className="itemTitle" onClick={() => this.logoShow(3)}>
                        <div className="row">
                            <div className="col-md-10 col-sm-10 col-xs-10">
                                {this.state.expArr[2]
                                    ? <i class="fa fa-angle-down arrowicon" style={{ fontSize: '20px' }}></i>
                                    : <i class="fa fa-angle-right arrowicon" style={{ fontSize: '20px' }}></i>
                                }
                                <h4 className="uploadTitle">Configure</h4>
                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">

                            </div>
                            <div className="col-md-1 col-sm-1 col-xs-1">
                                {this.state.saveIcon[2] && this.state.expArr[2]
                                    ? <i className="fa fa-save saveicon" style={{ fontSize: '20px' }}></i>
                                    : ""
                                }
                            </div>
                        </div>
                    </div>
                    {this.state.expArr[2]
                        ? <Configure
                            countAdmin = {this.state.countAdmin}
                            countOparator={this.state.countOparator}
                        />
                        : ""
                    }
                </div>
            </div>
        )
    }
}
