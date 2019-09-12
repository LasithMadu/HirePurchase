import React, { Component } from 'react';
import jsPDF from 'jspdf';

export default class AgreementPDF extends Component {

    state = {
      values: [],
      agreeid: null
    }

    componentDidMount(){
        var doc = new jsPDF({
            orientation: 'landscape',
            unit: 'in',
            format: [4, 2]
          })
           
          doc.text('Hello world!', 1, 1)
    }

    render(){
      var data = this.state.values;
        return(
            <div className="col-md-12 col-sm-12 col-xs-12" style={{marginTop: '3%', backgroundColor: '#ffffff'}}>
                
            </div>
        )
    }
}
