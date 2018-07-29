'use strict'

//-- Require
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const config = require('./config.js')

const pg = require('pg')
const connection = config.DB_CONNECTION_STRING
const client = new pg.Client(connection)
client.connect()

//-- JWT check

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${config.CLIENT_DOMAIN}/.well-known/jwks.json`
  }),
  audience: config.AUTH0_AUDIENCE,
  issuer: `https://${config.CLIENT_DOMAIN}/`,
  algorithm: 'RS256'
})

//--- Set up app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

//--- POST protected applications route
app.post('/api/applications', jwtCheck, async function (req, res) {
  // await client.connect()

  const results = []
  var application = req.body
  const sqlResponse = await client.query('INSERT INTO applications(public_address,contract_address, name, birthdate, destination, valid_from, valid_till, created_at) values ($1, $2, $3, $4, $5, $6, $7, $8)', [application.public_address, application.contract_address, application.name, application.birthdate, application.destination, application.valid_from, application.valid_till, new Date()])
  sqlResponse.rows.forEach( row => {
    results.push(row)
    console.log(row)
  })
  // await client.end()
  return res.json(results)
})

//--- GET protected applications route
// TODO: In this version not needed.
// app.get('/api/applications', jwtCheck, async function (req, res) {
//   await client.connect()
//
//   const results = []
//   var application = req.body
//   const sqlResponse = await client.query('SELECT * FROM applications')
//   sqlResponse.rows.forEach( row => {
//     results.push(row)
//     console.log(row)
//   })
//   await client.end()
//   return res.json(results)
// })



//--- Port
app.listen(3001)
console.log('Listening on localhost:3001')
