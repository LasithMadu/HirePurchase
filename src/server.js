const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
const PORT = 8080;

//import JS modules
var superAdmin = require('../src/Component/Users/BEnd/SuperAdmin/SuperAdmin');
var main = require('../src/Component/Main/BEnd/MainTasks/main');
var Admin = require('../src/Component/Users/BEnd/Admin/Admin');
var Customer = require('../src/Component/Customer/BEnd/Customer/Customer');
var Vehicals = require('../src/Component/HigherPurchase/Items/VehicalItem/BEnd/Vehicals');

let app = express();

let pool = new pg.Pool({
    port: 5432,
    database: 'd65k4du9hki5be',
    password: 'e23af610a0e35ebcf978134a8c627dd6f4405a3fdeca9cf4af2b4b3fd7b15aa7',
    max: 10,
    host: 'ec2-107-20-173-2.compute-1.amazonaws.com',
    user: 'cianfeueooefwv'
});

// let pool = new pg.Pool({
//     port: 5432,
//     database: 'postgres',
//     password: '123',
//     max: 90,
//     host: 'localhost',
//     user: 'postgres'
// });

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

//Super Admin Activity
app.post('/superAdmin/create', function(request, response){
    superAdmin.createAdmin(request, response, pool);
});

app.post('/getColor', function(request, response){
    superAdmin.getColor(request, response, pool);
});

app.post('/setColor', function(request, response){
    superAdmin.setColor(request, response, pool);
});



//Main Activity
app.post('/signin', function(request, response){
    main.signin(request, response, pool);
});

app.get('/companyList', function(request, response){
    main.companyList(request, response, pool);
});


//Admin Activity
app.post('/Admin/create', function(request, response){
    Admin.createUser(request, response, pool);
});

app.post('/Admin/profileData', function(request, response){
    Admin.profileData(request, response, pool);
});

app.post('/Admin/changePass', function(request, response){
    Admin.changePass(request, response, pool);
});

app.post('/Admin/updateData', function(request, response){
    Admin.updateData(request, response, pool);
});

app.post('/Admin/signin', function(request, response){
    Admin.signin(request, response, pool);
});



//Customer Activity
app.post('/Customer/saveData', function(request, response){
    Customer.saveCustomer(request, response, pool);
});

app.post('/Customer/searchCutomer', function(request, response){
    Customer.searchCustomer(request, response, pool);
});

app.post('/Customer/updateCustomer', function(request, response){
    Customer.updateCustomer(request, response, pool);
});


//Vehicals Activity
app.post('/Vehicals/saveVehicals', function(request, response){
    Vehicals.saveVehicals(request, response, pool);
});

app.get('/Vehicals/getVehicals', function(request, response){
    Vehicals.getVehicals(request, response, pool);
});


app.use(morgan('dev'));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requesred-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => console.log('Listening on the '+PORT));