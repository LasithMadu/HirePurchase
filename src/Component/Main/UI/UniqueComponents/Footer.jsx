import React, {Component} from 'react';

import company from '../../../../Assests/images/logo/logo.png'

export default class Footer extends Component{
    render(){
        return(
            <div id="footer">
                <div className="row d-flex justify-content-center">
                    <div className="copyright">
                        <img src={company} class="img-responsive clogo text-center"/><a href="http://i-threesixty.co.uk/"><p className="text-center copytext">© Copyright 2019 by ithreesixty. All rights reserved.</p></a>
                    </div>   
                </div>
            </div>
        )
    }
}