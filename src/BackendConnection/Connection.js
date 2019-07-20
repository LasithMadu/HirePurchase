const axios = require('axios');
const alert = require('./Alert');

export function post(path, values){
    axios.post(path, {
        data: values
    })
    .then(function (response) {
        alert(response)
    })
    .catch(function (error) {
        console.log(error);
    });
}