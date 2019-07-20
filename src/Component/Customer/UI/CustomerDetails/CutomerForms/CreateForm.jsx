import React, {Component} from 'react';

export default class CreateForm extends Component{
    render(){
        return(
            <div className='container'>
                <h3>Customer Register</h3>
                <hr/>
                <form className='col-md-12'>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                        <label for="inputEmail4">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" placeholder="Email"/>
                        </div>
                        <div class="form-group col-md-5">
                        <label for="inputPassword4">Password</label>
                        <input type="password" class="form-control" id="inputPassword4" placeholder="Password"/>
                        </div>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="inputAddress">Address</label>
                        <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St"/>
                    </div>
                    <div class="form-group col-md-11">
                        <label for="inputAddress2">Address 2</label>
                        <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-5">
                        <label for="inputCity">City</label>
                        <input type="text" class="form-control" id="inputCity"/>
                        </div>
                        <div class="form-group col-md-4">
                        <label for="inputState">State</label>
                        <select id="inputState" class="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                        </div>
                        <div class="form-group col-md-2">
                        <label for="inputZip">Zip</label>
                        <input type="text" class="form-control" id="inputZip"/>
                        </div>
                    </div>
                    <div class="form-group col-md-6 row">
                        <div class='col-md-2'>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                        <div class='col-md-2'>
                            <button type="button" class="btn btn-light">Cancel</button>
                        </div>
                    </div>
                    
                </form>
            </div>
        )
    }
}