import React, { Component } from 'react';
import $ from 'jquery'

export default class Configure extends Component {

    componentDidMount(){
        var countAdmin = $("#countAdmin");
        var countOparator = $("#countOparator");
        for (var i = 1; i <= this.props.countAdmin; i++) {
            countAdmin.append("<option value=" + i + ">" + i + "</option>");
        }
        for (i = 1; i <= this.props.countOparator; i++) {
            countOparator.append("<option value=" + i + ">" + i + "</option>");
        }
    }

    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{marginTop: '15px'}}>
                <form className='col-md-12 col-sm-12 col-xs-12'>
                    <div class="form-row">
                        <div class="form-group col-md-6 col-sm-6 col-xs-12 text-dark">
                            <label for="countAdmin">Admin Accounts</label>
                            <select id="countAdmin" class="form-control">
                                
                            </select>
                        </div>
                        <div class="form-group col-md-6 col-sm-6 col-xs-12 text-dark">
                            <label for="countOparator">Oparator Accounts</label>
                            <select id="countOparator" class="form-control">
                                
                            </select>
                        </div>
                    </div>
                    <div class="form-group col-sm-4 row">
                        <div class='col-xs-6 col-md-3'>
                            <button type="button" class="btn btn-primary" onClick={this.saveVehicals}>Save</button>
                        </div>
                        <div class='col-xs-6 col-md-3'>
                            <button type="button" class="btn btn-light text-dark">Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}