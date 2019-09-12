import React, { Component } from 'react';
import axios from 'axios'

export default class VehicalView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
    this.getVehicals();
  }

  getVehicals(){
    var that = this;
    axios.get('http://localhost:8080/Vehicals/getVehicals',{
    })
      .then((response) => {
        if(response.data.msg){
          that.setState({vehicles: response.data.table.rows});
        }
        else{
          console.log("Did");
        }

      })
  }

  render(){
    let vehicles = this.state.vehicles;
    return (
      <div className='container col-sm-12' style={{backgroundColor: '#ffffff'}}>
        <table class="table">
            <thead class="thead-light">
              <tr>
                  <th scope="col" class="th-sm">Customer Name</th>
                  <th scope="col" class="th-sm">Vehical No</th>
                  <th scope="col" class="th-sm">Chassis No</th>
                  <th scope="col" class="th-sm">Cylinder Capcity</th>
                  <th scope="col" class="th-sm">Modal</th>
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
      </div>
    )
  }
}
