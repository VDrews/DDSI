'use strict'

const express=require('express')
const bodyParser=require('body-parser')

const app=express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


var cors = require('cors');

app.use(cors());
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'frontend',
  password : 'DDSI2020'
});

connection.connect();

// app.post('/', )

// const config=require('./config')


connection.end();