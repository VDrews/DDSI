'use strict'

const express=require('express')
const bodyParser=require('body-parser')

const app=express()
const api=require('./routes')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api', api)



const express=require('express')
const app=express()
var cors = require('cors');
var bodyParser = require('body-parser')

app.use(cors());
app.use( bodyParser.json() ); 
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', )

// const config=require('./config')
