import React from 'react';
import {ToastsContainer, ToastsStore, ToastsContainerPosition} from 'react-toasts';
import axios from 'axios'
import { MDBDataTable } from 'mdbreact';

var array = [new Array()];

var data = {
  columns: [
    {
      label: 'Customer Name',
      field: 'Customer Name',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Vehical No',
      field: 'Vehical No',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Chassi No',
      field: 'Chassi No',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Cylinder Capacity',
      field: 'Cylinder Capacity',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Modal',
      field: 'Modal',
      sort: 'asc',
      width: 150
    }
  ],
  rows: [
    
  ]
}

function getName(nic){
  var path = 'http://localhost:8080/Customer/searchCutomer';

  axios.post(path, {
    data: nic
  })
  .then(function (response) {
    if(response.data.msg){
      //array.push ( {"name":response.data.table.rows[0].nameInitials} );
    }else{
        ToastsStore.error("Fail To Load Vehicals Data")
    }
  })
  .catch(function (error) {
    console.log(error)
  });
}

function getVehicals(){
    var path = 'http://localhost:8080/Vehicals/getVehicals';

    axios.get(path, {
      })
      .then(function (response) {
        if(response.data.msg){
            for(var i=0; i<response.data.table.rowCount; i++){
              getName(response.data.table.rows[i].cusNic)
            }
            
        }else{
            ToastsStore.error("Fail To Load Vehicals Data")
        }
      })
      .catch(function (error) {
        console.log(error)
      });

     return data;   
}


        const VehicalView = () => {

          return (
            <MDBDataTable
              striped
              bordered
              pagination={true}
              data={getVehicals()}
            />
          );
        }

        export default VehicalView;