import React, {Component} from 'react';
import axios from 'axios'

export default class ViewUser extends Component {

    constructor(props) {
      super(props);
      this.state = {
        users: [],
        isSet: false
      }

      this.getUsers();
    }

    getUsers(){
      var that = this;
      var values = [];
      axios.get('http://localhost:8080/Admin/getUsers',{
      })
      .then((response) => {
        if(response.data.msg){
          for(var i=0; i<response.data.table.rowCount; i++){
            if(response.data.table.rows[i].nic !== ''){
              values.push(response.data.table.rows[i]);
            }
          }
          that.setState({users: values, isSet: true});
        }
        else{
          console.log("Did");
        }
      });
    }

    changeState(value, state){
      this.setState({isSet: false});
      var values = [];
      axios.post('http://localhost:8080/Admin/changeStatus',{
        uid: value,
        state: state
      })
      .then((response) => {
        if(response.data.msg){
          for(var i=0; i<response.data.table.rowCount; i++){
            if(response.data.table.rows[i].nic !== ''){
              values.push(response.data.table.rows[i]);
            }
          }
          this.setState({users: values, isSet: true});
        }
        else{
          console.log("Did");
        }
      });
    }

    render(){
        let users = this.state.users;

        return(
          <div>
            {
              this.state.isSet
              ? (<div>
                  <table class="table">
                    <thead class="thead-light">
                      <tr>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Email</th>
                        <th scope="col">NIC</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map(user =><tr scope="row" key={user.userId}>
                          <td>{user.firstName}</td>
                          <td>{user.lastName}</td>
                          <td>{user.email}</td>
                          <td>{user.nic}</td>
                          <td>
                          {
                            user.isLock ?
                            <button type="button" onClick={() => this.changeState(user.userId, !user.isLock)} class="btn btn-success">Active</button> :
                            <button type="button" onClick={() => this.changeState(user.userId, !user.isLock)} class="btn btn-danger">Deactive</button>
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
          )
    }
}
