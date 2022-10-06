const Pool = require("pg").Pool

// Database Communication
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    port: 5432,
    database: "UserDatabase"
})

module.exports = pool;