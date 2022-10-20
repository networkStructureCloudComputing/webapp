const Pool = require("pg").Pool

// Database Communication
const pool = new Pool({
    user: "postgres",
    password:"cloud@fall2022",
    host: "localhost",
    port: 5432,
    database: "UserDatabase"
})

module.exports = pool;