const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
var inDev = process.env.NODE_ENV !== 'production';
var PORT = inDev ? 8080 : process.env.PORT;
const path = require('path');
const targetBaseUrl = 'https://money360.herokuapp.com/login';

//import JS modules
var superAdmin = require('./src/Component/Users/BEnd/SuperAdmin/SuperAdmin');
var main = require('./src/Component/Main/BEnd/MainTasks/main');
var Admin = require('./src/Component/Users/BEnd/Admin/Admin');
var Customer = require('./src/Component/Customer/BEnd/Customer/Customer');
var Vehicals = require('./src/Component/HigherPurchase/Items/VehicalItem/BEnd/Vehicals/Vehicals');

const app = express();

// function handleRedirect(req, res) {
//     res.redirect(targetBaseUrl);
//   }
  
// app.get('/', handleRedirect);

const pool = new pg.Pool({
    user: "avnadmin",
    password: "ibwxq0baui4aaxqn",
    database: "defaultdb",
    port: 15003,
    host: "pg-1f9d942d-project-2adf.aivencloud.com",
    ssl: true
  });

//   pool.connect();

//   pool.query('SELECT * FROM public."usersTable"', (err, res) => {
//     if (err) throw err;
//     for (let row of res.rows) {
//       console.log(JSON.stringify(row));
//     }
//     pool.end();
//   });

// let pool = new pg.Pool({
//     port: 5432,
//     database: 'd4ps461pnfeas8',
//     password: '912e59bc8f02e39c3390fb7a21ed2c2dd5553a4015837d2ca0e149a8c59f9756',
//     max: 10,
//     host: 'ec2-23-21-177-102.compute-1.amazonaws.com',
//     user: 'lhhqkwktkgjxgt'
// });

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

app.post('/Customer/deleteCutomer', function(request, response){
    Customer.deleteCutomer(request, response, pool);
});



//Vehicals Activity
app.post('/Vehicals/saveVehicals', function(request, response){
    Vehicals.saveVehicals(request, response, pool);
});

app.get('/Vehicals/getVehicals', function(request, response){
    Vehicals.getVehicals(request, response, pool);
});

app.post('/Vehicals/searchVehical', function(request, response){
    Vehicals.searchVehical(request, response, pool);
});

app.post('/Vehicals/updateVehicals', function(request, response){
    Vehicals.updateVehicals(request, response, pool);
});

app.post('/Vehicals/deleteVehicals', function(request, response){
    Vehicals.deleteVehicals(request, response, pool);
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'money360/build')));// Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'money360/build', 'index.html'));
    });
  }

app.use(morgan('dev'));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requesred-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => console.log('Listening on the '+PORT));