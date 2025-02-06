require('dotenv').config()

const { Pool } = require('pg')

const poll = new Pool({
    connectionString: process.env.CONNECT_STRING
})

async function query(queryString, params, callback){
    return poll.query(queryString, params, callback)
}

module.exports = { query }