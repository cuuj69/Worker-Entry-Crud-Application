//Simply selecting all from our worker database
const getWorkers = "SELECT * FROM workers"

//  A point of importance is how we select an email from our worker table utilizing the variable .email (s.email in this case) and assigning them to $1

const checkEmailExists = "SELECT s FROM workers s WHERE s.email = $1"


//A serious note is also the indication of the $ atr when querying numbers
const getWorkersbyId = "SELECT * FROM workers WHERE id = $1"


// As we know a simple INSERT INTO query works this way
//Nicely defined to suit the controller paramas assigned
const addWorker = "INSERT INTO workers (name, email, age, dob) VALUES ($1, $2, $3, $4)"

//As expected the $ atr is emminent, as shown while deleting an entry
const deleteWorker = "DELETE FROM workers WHERE id= $1"

//During a update operationg we use the UPDATE keyword accompanied by the SET parameter been updated is a new $1 atr, also while utilizing the id = $2 we will be using as a pointer
const updateWorker = "UPDATE workers SET name = $1 WHERE id = $2"



//As always, a critical aspert of defining our queries is to import them 
//Also in this case we export our functions as objects

module.exports = {
    getWorkers,
    getWorkersbyId,
    checkEmailExists,
    addWorker,
    deleteWorker,
    updateWorker,
}


//In this example where the controller.js is the sole benefactor of our queries, we can say that the queries.js can be a standalone where no imports are required, but rather exports are emminent