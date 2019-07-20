import React, {Component} from 'react';


export function alert(response){
    if(response.data.msg){
        <Alert/>;
    }else{
        console.log('Fail');
    }
}