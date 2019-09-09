import React, { Component } from "react";

import VehicalAdd from './VehicalForms/VehicalAdd'
import VehicalEdit from './VehicalForms/VehicalEdit'
import VehicalDelete from './VehicalForms/VehicalDelete'
import VehicalView from './VehicalForms/VehicalVew'
import FormControl from '../../../../Main/UI/SingleComponent/FormControl'

export default class Vehical extends Component {

    render() {

        const title = ['Add New Vehicle', 'Edit Vehicle', 'Delete Vehicle', 'View Vehicle'];
        const com = [<VehicalAdd/>, <VehicalEdit/>, <VehicalDelete/>, <VehicalView/>];

      return (
        <FormControl
            titles = {title}
            startPos = {3}
            components = {com}
            viewBtn = {true}
            editBtn = {true}
            createBtn = {true}
            deleteBtn = {true}
        />
    );
  }
}