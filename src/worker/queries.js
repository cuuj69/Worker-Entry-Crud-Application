const getWorkers = "SELECT * FROM workers"
const checkEmailExists = "SELECT s FROM workers s WHERE s.email = $1"
//A serious note is also the indication of the $ atr when querying numbers
const getWorkersbyId = "SELECT * FROM workers WHERE id = $1"

const addWorker = "INSERT INTO workers (name, email, age, dob) VALUES ($1, $2, $3, $4)"

const deleteWorker = "DELETE FROM workers WHERE id= $1"

const updateWorker = "UPDATE workers SET name = $1 WHERE id = $2"

module.exports = {
    getWorkers,
    getWorkersbyId,
    checkEmailExists,
    addWorker,
    deleteWorker,
    updateWorker,
}