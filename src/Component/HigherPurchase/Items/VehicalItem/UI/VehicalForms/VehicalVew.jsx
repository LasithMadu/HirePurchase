import React, { Component } from 'react';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import axios from 'axios'
import $ from 'jquery'
import DataTable from 'datatables.net';

export default class VehicalView extends Component{

  constructor(props) {
    super(props);
    this.state = {
      vehicles: []
    }
    this.getVehicals();

    $('#dtBasicExample').DataTable( {
      paginate: true
    } );
  }

  getVehicals(){
    var that = this;
    axios.get('https://money360-server.herokuapp.com/Vehicals/getVehicals',{
    })
      .then((response) => {
        if(response.data.msg){
          that.setState({vehicles: response.data.table.rows});
        }
        else{
          console.log("Did");
        }

      })
      console.log(this.vehicles);
  }

  render(){
    let vehicles = this.state.vehicles;
    return (
      <div className='container col-sm-12' style={{backgroundColor: '#ffffff'}}>
        <table id="dtBasicExample" className="table table-striped table-bordered table-sm" cellspacing="0" width="100%" style={{marginTop: '20px'}}>
          <thead className="bg-success">
              <tr>
                  <th scope="col" class="th-sm">Customer Name</th>
                  <th scope="col" class="th-sm">Vehical No</th>
                  <th scope="col" class="th-sm">Chassis No</th>
                  <th scope="col" class="th-sm">Cylinder Capcity</th>
                  <th scope="col" class="th-sm">Modal</th>
              </tr>
          </thead>
          <tbody>
          {vehicles.map(vehicle =><tr scope="row" key={vehicle.vehiNo}>
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