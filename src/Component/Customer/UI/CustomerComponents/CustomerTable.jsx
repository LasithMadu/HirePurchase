import React, {Component} from 'react';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

export default class Viewagreement extends Component{

  rowSelected(id){
    var data = this.props.agrrement;
    for(var i=0; i<data.length; i++){
      if (data[i].agreeId == id) {
        localStorage.setItem('agreement', JSON.stringify(data[i]));
        window.location.href = '/agreementPDF'
      }
    }
  }

  render(){
    let agreementData = this.props.agrrement;
    return (
      <div>
        {
          agreementData != null
          ? (<div>
              <table class="table">
                <thead class="thead-light">
                  <tr>
                    <th scope="col">Vehical No</th>
                    <th scope="col">Cassis No</th>
                    <th scope="col">Agreement ID</th>
                    <th scope="col">Version</th>
                    <th scope="col">Created Date</th>
                  </tr>
                </thead>
                <tbody>
                  {agreementData.map(agreement =><tr scope="row" key={agreement.agreeId} onClick={() => this.rowSelected(agreement.agreeId)}>
                      <td>{agreement.vehiNo}</td>
                      <td>{agreement.chassis}</td>
                      <td>{agreement.agreeId}</td>
                      <td>{agreement.version}</td>
                      <td>{agreement.created}</td>
                  </tr>
                  )}
                </tbody>
              </table>
              </div>
          ):
          (<div><h3>Loading</h3></div>)
          }
          </div>
    );
  }
}
