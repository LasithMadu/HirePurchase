import React, {Component} from 'react';
import { FilePond } from 'react-filepond';
import $ from 'jquery';
import axios from 'axios'
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import 'filepond/dist/filepond.min.css';

const styleSheet = {
    dropzone: {
        backgroundColor: '#b8b8b8',
        height: '140px',
        color: '#000000',
        borderRadius: '10px',
        margin: '10px'
    }
}

export default class Settings extends Component {
    
    constructor(props){
        super(props)
        this.getCompanyList();
    }

    changeTheme(){
        var company;
        if($("#inputCompany").prop('selectedIndex') === 0){
            ToastsStore.warning("Select The Company")
        }else{
            company = $("#inputCompany").val();
        }
        var values = [company, $('#color').val()];
        var path = 'https://money360-server.herokuapp.com/setColor';

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

    getCompanyList(){
        var path = 'https://money360-server.herokuapp.com/companyList';

        axios.get(path)
          .then(function (response) {
            if(response.data.msg){
                var option;
                option = '<option selected>Choose Company</option>';
                for(var i=0; i<response.data.table.length; i++){
                    option += '<option value='+response.data.table[i]+'>'+response.data.table[i]+'</option>'
                }
                $("#inputCompany").html(option);
                
            }else{
                ToastsStore.error("Can't get company list")
            }
          })
          .catch(function (error) {
            ToastsStore.error("Connection Error")
          });
    }

    render(){
        return(
            <div class="container">
                <br/>
                <form>
                    <div class="form-group col-sm-8" >
                        <label for="inputCompany">Select Company</label>
                        <select id="inputCompany" class="form-control">
                            <option selected>Choose Company</option>
                        </select>
                    </div>
                </form>
                <br/>
                <div className='row justify-content-md-center' style={{marginTop: '20px'}}>
                    <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.BOTTOM_RIGHT} />
                    <div className='col-md-5 col-sm-6 col-xs-11' style={styleSheet.dropzone}>
                        <h4 className='text-center'>Upload Logo</h4>
                        <FilePond />
                    </div>
                    <div className='col-md-5 col-sm-6 col-xs-11' style={styleSheet.dropzone}>
                        <h4 className='text-center'>Change Theme</h4>
                        <div className='row'>
                            <div className='col-sm-12 col-xs-12'>
                                <div class="form-group">
                                    <input type="text" class="form-control" id="color" placeholder="#b8b8b8"/>
                                </div>
                            </div>
                            <div className='col-sm-2 col-xs-2'>
                                <button type="button" class="btn btn-primary" onClick={this.changeTheme}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}