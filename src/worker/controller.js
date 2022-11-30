//We are trying to subsidize sql queries for so that we can get the contents of our database already defined in db.js
//In the function right below this paragraph pool (An instance of a class for connecting our database) is imported, apparently when a folder exists far from our current directory we need extra characters are needed to point to it
//(./ means current folder) (../means a folder outside the current working directory)
const pool = require('../../db')

//Importing the queries folder since we are doing a lot of referencing
const queries = require("./queries")


//I am assuming that is a function fully loaded which makes the endpoint function (get) in this sense easier since the call back function of the endpoint is defined here indicating neccessary parameters,
//We utilizee the pool.query which is obviously a method of the pool class instance cleary for database related business
//Good to note how cater for likely errors
//As predicted the response is used to display results
const getWorkers = (req, res) => {
    pool.query(queries.getWorkers,(error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}


//A critical note down is how to make room for accepting intergers
const getWorkersbyId = (req,res) => {
    //We need to define what type of request we will be getting from the user which in this case is an interger, utilizing the req.params.id
    const id = parseInt(req.params.id)
    //Further down now the id defined is now passed as a requirements or a heads-up when receiving incoming get requests by the client
    pool.query(queries.getWorkersbyId, [id],(error,results) =>{
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}

const addWorker = (req,res) => {
    const { name, email, age, dob } = req.body

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if(results.rows.length){
            res.send("Email already exists.")
        }
        //after clearance is given to use credentials
        pool.query(queries.addWorker,[name, email, age, dob], (error, results) => {
            if (error)throw error;
            res.status(201).send("Student Created Successfully")


        } )
    })
    
}

const deleteWorker = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getWorkersbyId, [id], (error,results) => {
        const noWorkerIdFound = !results.rows.length;
        if (noWorkerIdFound){
            res.send("Worker entry does not exist")
        }
        
        pool.query(queries.deleteWorker, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Worker entry succesfully removed")
        })
    })

}


const updateWorker = (req, res) => {
    const id = parseInt(req.params.id)

    const { name } = req.body;

    pool.query(queries.getWorkersbyId, [id], (error,results) => {
        const noWorkerIdFound = !results.rows.length;
        if(noWorkerIdFound){
            res.send("Worker entry does not exist")
        }

        pool.query(queries.updateWorker,[name, id],(error, results) => {
            if (error) throw error;
            res.status(200).send("Worker credentials updated successfully")
        })
    })
}

//Exports as usual to enable imports
module.exports = {
    getWorkers,
    getWorkersbyId,
    addWorker,
    deleteWorker,
    updateWorker,
}