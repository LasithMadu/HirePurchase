import React, {Component} from 'react';
import { TwitterPicker } from 'react-color';

export default class ChangeTheme extends Component {

    render(){
        return(
            <div>
                <div className='themechange bg-white'>
                    <div className="row colorrow">
                        <div className="col-md-2 col-sm-2 col-xs-2 testbgcolor" style={{backgroundColor: this.props.background}}>

                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <form action="#" class="form-horizontal">
                                <label for="inputName" class="col-md-3 control-label">
                                    Theme Color:</label>
                                <div class="col-md-9">
                                    <div>
                                        <TwitterPicker
                                            width = '600px'
                                            triangle = 'hide'
                                            colors ={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548"]}
                                            circleSize = {28}
                                            onChangeComplete={this.props.handleBackground}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col-md-2 col-sm-2 col-xs-2 testbgcolor" style={{backgroundColor: this.props.font}}>

                        </div>
                        <div className="col-md-8 col-sm-8 col-xs-8">
                            <form action="#" class="form-horizontal">
                                <label for="inputName" class="col-md-3 control-label">
                                    Font Color:</label>
                                <div class="col-md-9 fontcolor">
                                    <div>
                                        <TwitterPicker
                                            width = '600px'
                                            triangle = 'hide'
                                            colors ={["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5", "#2196f3", "#03a9f4", "#00bcd4", "#009688", "#4caf50", "#8bc34a", "#cddc39", "#ffeb3b", "#ffc107", "#ff9800", "#ff5722", "#795548"]}
                                            circleSize = {28}
                                            onChangeComplete={this.props.handleFont}
                                        />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}