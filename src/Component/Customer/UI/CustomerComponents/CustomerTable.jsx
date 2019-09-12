import React, {Component} from 'react';

export default class Viewagreement extends Component{

  state = {
    status: true
  }

  rowSelected(id){
    var data = this.props.agrrement;
    for(var i=0; i<data.length; i++){
      if (data[i].agreeId == id) {
        localStorage.setItem('agreeId', data[i].agreeId);
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
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Agreement ID</th>
                    <th scope="col">Vehical No</th>
                    <th scope="col">Cassis No</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {agreementData.map(agreement =><tr scope="row" key={agreement.agreeId} onClick={() => this.rowSelected(agreement.agreeId)}>
                      <td>{agreement.agreeId}</td>
                      <td>{agreement.vehiNo}</td>
                      <td>{agreement.chassis}</td>
                      <td>{agreement.created}</td>
                      <td>{agreement.last_rental}</td>
                      <td>
                        {
                          this.state.status ? 
                          <span className="label label-success">Active</span> :
                          <span className="label label-danger">Expire</span>
                        }
                      </td>
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
