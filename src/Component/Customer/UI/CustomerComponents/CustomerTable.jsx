import React, {Component} from 'react';

export default class Viewagreement extends Component{

  state = {
    status: true
  }

  rowSelected(id){
    var data = this.props.agrrement;
    for(var i=0; i<data.length; i++){
      if (data[i].agreeId === id) {
        sessionStorage.setItem('agreeId', data[i].agreeId);
        window.location.href = '/agreementPDF'
      }
    }
  }

  render(){
    let agreementData = this.props.agrrement;
    
    return (
      <div>
        {
          agreementData !== null
          ? (<div>
              <table className="table">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Agreement ID</th>
                    <th scope="col">Vehicle No</th>
                    <th scope="col">Chassis No</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Expire Date</th>
                    <th scope="col">Status</th>
                    <th scope="col">PDF</th>
                  </tr>
                </thead>
                <tbody>
                  {agreementData.map(agreement =><tr key={agreement.agreeId}>
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
                      <td>
                        <span className="label label-warning" style={{cursor: 'pointer'}} onClick={() => this.rowSelected(agreement.agreeId)}>Genrate PDF</span>
                      </td>
                  </tr>
                  )}
                </tbody>
              </table>
              </div>
          ):
          ("")
          }
          </div>
    );
  }
}
