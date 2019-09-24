import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'

import Input from '../../SingleComponent/InputField'

export default class CustomerDetails extends Component{

    constructor(props){
        super(props)

        this.answe1 = this.answe1.bind(this);
        this.answe2 = this.answe2.bind(this);
    }

    componentDidMount(){
        axios.get(sessionStorage.getItem('url')+"/getSecurityQuestion")
        .then(function (response) {
            if(response.data.msg){
                $(function () { 
                    var sq1 = $("#sq1");
                    var sq2 = $("#sq2");
                    for(var i=0; i<response.data.values.length; i++){
                        sq1.append("<option value="+response.data.values[i]+">" + response.data.values[i] + "</option>");
                        sq2.append("<option value="+response.data.values[i]+">" + response.data.values[i] + "</option>");
                    }
                });
            }
        })
        .catch(function (error) {
            console.log(error)
        });
    }

    answe1(value){
        var q1 = $('#sq1').val();
        this.props.changeAns1(q1, value)
    }

    answe2(value){
        var q2 = $('#sq2').val();
        this.props.changeAns2(q2, value)
    }

    render(){
        return(
            <div className="col-lg-11 col-md-11 col-sm-11 col-xs-12" style={{margin: '10px', color: '#000000'}}>
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="sq1">Security Question 1</label>
                    <select className="form-control" id="sq1">
                        
                    </select>
                </div>
                <Input
                    size = {[12, 12, 12, 12]}
                    id = "InputAnswer1"
                    label = "Answer 1"
                    placeholder = "Answer 1"
                    msg = "Please Input answer"
                    handleChange = {this.answe1.bind(this)}
                />
                <br/>
                <div className="form-group col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="sq1">Security Question 2</label>
                    <select className="form-control" id="sq2">
                        
                    </select>
                </div>
                <Input
                    size = {[12, 12, 12, 12]}
                    id = "InputAnswer2"
                    label = "Answer 2"
                    placeholder = "Answer 2"
                    msg = "Please Input answer"
                    handleChange = {this.answe2.bind(this)}
                />
            </div>
        )
    }
}