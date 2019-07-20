const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const cors = require('cors');
const PORT = 8080;

//import JS modules
var superAdmin = require('./SuperAdmin/SuperAdmin');
var main = require('./MainTasks/main');
var Admin = require('./Admin/Admin');

let app = express();

let pool = new pg.Pool({
    port: 5432,
    database: 'postgres',
    password: '123',
    max: 10,
    host: 'localhost',
    user: 'postgres'
});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}));

app.post('/superAdmin/create', function(request, response){
    superAdmin.createAdmin(request, response, pool);
});

app.post('/signin', function(request, response){
    main.signin(request, response, pool);
});

app.post('/getColor', function(request, response){
    superAdmin.getColor(request, response, pool);
});

app.post('/setColor', function(request, response){
    superAdmin.setColor(request, response, pool);
});

app.get('/companyList', function(request, response){
    main.companyList(request, response, pool);
});

app.post('/Admin/create', function(request, response){
    Admin.createUser(request, response, pool);
});


app.use(morgan('dev'));

app.use(function(request, response, next){
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requesred-With, Content-Type, Accept");
    next();
});

app.listen(PORT, () => console.log('Listening on the '+PORT));