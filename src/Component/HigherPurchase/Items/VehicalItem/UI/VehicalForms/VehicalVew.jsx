import React, { Component } from 'react';

export default class VehicalView extends Component{

  render(){
    let vehicles = this.props.vehicles;
    console.log(vehicles.length);
    
    return (
      <div className='container col-sm-12' style={{backgroundColor: '#ffffff'}}>
        {
          vehicles.length === 0 ?
          <h3>Loading</h3> :
          (
            <table class="table">
              <thead class="thead-light">
                <tr>
                    <th scope="col" class="th-sm">Customer Name</th>
                    <th scope="col" class="th-sm">Vehicle No</th>
                    <th scope="col" class="th-sm">Chassis No</th>
                    <th scope="col" class="th-sm">Cylinder Capcity</th>
                    <th scope="col" class="th-sm">Model</th>
                </tr>
              </thead>
              <tbody>
              {vehicles.map(vehicle =><tr key={vehicle.vehiNo}>
                  <td>{vehicle.nameInitials}</td>
                  <td>{vehicle.vehiNo}</td>
                  <td>{vehicle.chassis}</td>
                  <td>{vehicle.capacity}</td>
                  <td>{vehicle.make+' '+vehicle.modal}</td>
                  {/* <td><button onClick={this.update.bind(this, vehicle.customer_id)}>Edit</button>|<button onClick={this.removeCountry.bind(this, vehicle.customer_id)}>Remove</button></td> */}
              </tr>
              )}
              </tbody>
            </table>
          )
        }
        
      </div>
    )
  }
}
