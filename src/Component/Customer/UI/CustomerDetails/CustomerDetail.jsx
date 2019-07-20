import React, { Component } from "react";
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";

import CreateForm from './CutomerForms/CreateForm'

export default class CustomerDetails extends Component {
    state = {
      activeItem: "1"
    };

    toggle = tab => e => {
      if (this.state.activeItem !== tab) {
        this.setState({
          activeItem: tab
        });
      }
    };

    render() {
      return (
        <div className='col-md-12' style={{marginTop: '20px'}}>
            <MDBContainer>
            <MDBNav className="nav-tabs mt-7">
            <MDBNavItem>
                <MDBNavLink to="#" className={this.state.activeItem === "1" ? "active" : ""} onClick={this.toggle("1")} role="tab" >
                Add
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="#" className={this.state.activeItem === "2" ? "active" : ""} onClick={this.toggle("2")} role="tab" >
                Edit
                </MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
                <MDBNavLink to="#" className={this.state.activeItem === "3" ? "active" : ""} onClick={this.toggle("3")} role="tab" >
                Delete
                </MDBNavLink>
            </MDBNavItem>
            </MDBNav>
            <MDBTabContent activeItem={this.state.activeItem} >
            <MDBTabPane tabId="1" role="tabpanel">
                <CreateForm/>
            </MDBTabPane>
            <MDBTabPane tabId="2" role="tabpanel">
                <p className="mt-2">
                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                voluptate odit minima. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Nihil odit magnam minima,
                soluta doloribus reiciendis molestiae placeat unde eos
                molestias.
                </p>
                <p>
                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                voluptate odit minima. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Nihil odit magnam minima,
                soluta doloribus reiciendis molestiae placeat unde eos
                molestias.
                </p>
            </MDBTabPane>
            <MDBTabPane tabId="3" role="tabpanel">
                <p className="mt-2">
                Quisquam aperiam, pariatur. Tempora, placeat ratione porro
                voluptate odit minima. Lorem ipsum dolor sit amet,
                consectetur adipisicing elit. Nihil odit magnam minima,
                soluta doloribus reiciendis molestiae placeat unde eos
                molestias.
                </p>
            </MDBTabPane>
            </MDBTabContent>
        </MDBContainer>
      </div>
    );
  }
}