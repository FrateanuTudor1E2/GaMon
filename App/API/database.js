const Pool= require("pg").Pool;

const pool= new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password: "web123",
    database: "postgres"
})
pool.connect();

module.exports = pool;