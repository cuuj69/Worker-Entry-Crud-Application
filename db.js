// variable constant Pool which contains the socket require with postgres abbreviated as pg while Pool in itself is a class which enables connection with postgres database, an instance of it and its assigned to our variables
const Pool =  require('pg').Pool


//Another variable constant is assigned to the instance of the Pool class uitlizing the new keyword which aides to acces an instance of a class in javascript but I have somehow forgotten the usage,however this instance lists a dictionary which contains neccessary info to aid the Pool class created by Node to properly bring to light our details and enhance succesfull connection with our server and database
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "workers",
    password: "@forum500A",
    port: "5432",

})

module.exports = pool
//At the end of our code we need to export the variable constant which we know contains the neccessary handshake requirements of our database so that each query is succesfull