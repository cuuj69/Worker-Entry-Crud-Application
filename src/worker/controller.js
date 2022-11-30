//We are trying to subsidize sql queries for so that we can get the contents of our database already defined in db.js
//In the function right below this paragraph pool (An instance of a class for connecting our database) is imported, apparently when a folder exists far from our current directory we need extra characters are needed to point to it
//(./ means current folder) (../means a folder outside the current working directory)
const pool = require('../../db')

//Importing the queries folder since we are doing a lot of referencing
// Right here in my opinion is how how we get to use queries in our pool.query method
const queries = require("./queries")


//I am assuming that is a function fully loaded which makes the endpoint function (get) in this sense easier since the call back function of the endpoint is defined here indicating neccessary parameters,
//We utilizee the pool.query which is obviously a method of the pool class instance cleary for database related business
//Good to note how we cater for likely errors
//As predicted the response is used to display results
const getWorkers = (req, res) => {

    // pool.query is a dedicated method to fetch our query request
    // In place of queries.(The function defined) we can simply insert the sql query which is expected, along with a call back(error,results) collab
    pool.query(queries.getWorkers,(error, results) => {
        //Error instances catered for, even though they may not be too detailed
        if (error) throw error;
        
        // res.(ie is response which is the initial callback function second parameter is utilized to relay a message while passing in a conditional(.status) which translates to when the status code is 200.{pull out one of the callback parameters of the pool method. In this case results, closely associated with the  success (200) status code})

        // In the instance where the attached query failed, we also utilize the first parameter(error) then an error is thrown 
        res.status(200).json(results.rows)
    })
}


//A critical note down is how to make room for accepting intergers
const getWorkersbyId = (req,res) => {
    //We need to define what type of request we will be getting from the user which in this case is an interger, utilizing the req.params.id
    const id = parseInt(req.params.id)
    //Further down now the id defined is now passed as a requirements or a heads-up when receiving incoming get requests by the client

    // A side note is that we indicate that a further query into the type will be made, indicating that out of the getWorkersbyId an int will be passed to specify

    pool.query(queries.getWorkersbyId, [id],(error,results) => {
        if (error) throw error;
        res.status(200).json(results.rows)
    })
}


const addWorker = (req,res) => {
    // In adding (I think I have a theory on destructuring which indicates multiple parameteres will be passed)
    // Outlining the requests to be expected in the req.body which is associated with a post request where will utilze the req body and send json
    const { name, email, age, dob } = req.body

    //For this feature we prepped up a checkEmailExists function, which is a query to determine and entry already exists to avoid conflicts while creating another with same credentials
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        //Here we make use of the results parameter which in the event the entry(credential(email in this case) will contain something in its field(equated) to its length)
        //Hence if its length is true, which indicates the presence of elements it means emails already exists because the underlying query was to check for the existence of an email
        if(results.rows.length){
            res.send("Email already exists.")
        }
        //In the other scenario
        // after clearance is given to use credentials because it does not exist
        //This is genius, passing a query whose operation is to create a new entry and passing the params to fill along wiht the queries.(function)
        pool.query(queries.addWorker,[name, email, age, dob], (error, results) => {
            if (error)throw error;
            
            //res.status code(201) indicates operation success
            res.status(201).send("Student Created Successfully")


        } )
    })
    
}


const deleteWorker = (req,res) => {
    //Likened to getworkerbyId deletion is directed by id of existing entry
    const id = parseInt(req.params.id)
    

    //Feasibility studies to ascertain status of entry,candid/phantom
    //getworkersid or deleteworker play similar func
    pool.query(queries.getWorkersbyId, [id], (error,results) => {
        //Error margin,error message
        const noWorkerIdFound = !results.rows.length;
        //
        if (noWorkerIdFound){
            res.send("Worker entry does not exist")
        }
        
        //
        pool.query(queries.deleteWorker, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send("Worker entry succesfully removed")
        })
    })

}


const updateWorker = (req, res) => {

    //Intricate, Id will be passed to the endpoint
    const id = parseInt(req.params.id)

    // paramater => req.body will be name
    const { name } = req.body;


    //Check if workerId exist as norm
    pool.query(queries.getWorkersbyId, [id], (error,results) => {
        const noWorkerIdFound = !results.rows.length;
        if(noWorkerIdFound){
            res.send("Worker entry does not exist")
        }   


        //params for operation entail name, id as we already know 
        pool.query(queries.updateWorker,[name, id],(error, results) => {
            if (error) throw error;
            res.status(200).send("Worker credentials updated successfully")
        })
    })
}

//Exports as usual to enable imports
//In this event of exporting multiple functions we can choose to export them as objects
module.exports = {
    getWorkers,
    getWorkersbyId,
    addWorker,
    deleteWorker,
    updateWorker,
}