import React, {Component} from 'react';

const styleSheet = {
    styleProfile: {
        overflowY: 'visible'
    }
}

export default class Profile extends Component {
    render(){
        return(
            <div>
                <div class="page-content">
                    <div id="tab-general">
                        <div class="row mbl">
                            <div class="col-lg-12">
                                
                                            <div class="col-md-12">
                                                <div id="area-chart-spline" style={{width: '100%', height: '300px', display: 'none'}}>
                                                </div>
                                            </div>
                                
                            </div>

                            <div class="col-lg-12">
                              
                                    
                              <div class="row">
                    <div class="col-md-12"><h2>Profile: John Doe</h2>

                        <div class="row mtl">
                            <div class="col-md-3">
                                <div class="form-group">
                                    <div class="text-center mbl"><img src="http://lorempixel.com/640/480/business/1/" alt="" class="img-responsive"/></div>
                                    <div class="text-center mbl"><a href="#" class="btn btn-green"><i class="fa fa-upload"></i>&nbsp;
                                        Upload</a></div>
                                </div>
                            </div>
                            <div class="col-md-9">
                                <div id="generalTabContent" class="tab-content">
                                    <div id="tab-edit" class="tab-pane fade in active profile">
                                        <form action="#" class="form-horizontal"><h3>Account Setting</h3>

                                            <div class="form-group"><label class="col-sm-3 control-label">Email</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="email" placeholder="email@yourcompany.com" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Username</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="username" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Password</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-4"><input type="password" placeholder="password" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Confirm Password</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-4"><input type="password" placeholder="password" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <h3>Profile Setting</h3>

                                            <div class="form-group"><label class="col-sm-3 control-label">First Name</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="first name" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Last Name</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="last name" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Birthday</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-4"><input id="datepicker-normal" type="text" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Marital Status</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-4"><select class="form-control">
                                                            <option>Single</option>
                                                            <option>Married</option>
                                                        </select></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Position</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-4"><select class="form-control">
                                                            <option>CEO</option>
                                                            <option>Director</option>
                                                            <option>Manager</option>
                                                            <option>Staff</option>
                                                            <option>Office Boy</option>
                                                        </select></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">About</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><textarea rows="3" class="form-control"></textarea></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <h3>Contact Setting</h3>

                                            <div class="form-group"><label class="col-sm-3 control-label">Mobile Phone</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="mobile phone" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Website</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="website" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Facebook</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="facebook" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="form-group"><label class="col-sm-3 control-label">Twitter</label>

                                                <div class="col-sm-9 controls">
                                                    <div class="row">
                                                        <div class="col-xs-9"><input type="text" placeholder="twitter" class="form-control"/></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr/>
                                            <button type="submit" class="btn btn-green btn-block">Finish</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                              
                                </div>
                                
                            
                     
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}