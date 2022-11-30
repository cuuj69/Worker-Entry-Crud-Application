//constant named express which contains class instance of express
const express = require('express')

//Defining our constant variable which directs to the routes we created in src/worker/routes
const workerRoutes = require('./src/worker/routes')

// constant named = variable name to run instance of server
const app = express()

// constant to contain our port number, usually above 1024(non privledged port)
const port = 3000

//Subsidizing the use of json so that the results of the query will be display in json format
app.use(express.json())

//Absence of a get endpoint causes a cannot get error. this 
//this get method we use it to define the end point. It also takes 
//Call back function with predefined parameters
//request and response,my guess is the request is the client reaching the endpoint
//and we utilize the response to send the client a message when it reaches the defined endpoint
app.get('/', (req,res) => {
    res.send("Hello World!")
})

//This is a defined endpoint with callback function and other import res.send details but the get endpoint is located in "src/worker/routes" so we git app.use the path which is stored in workerRoutes constant variable
app.use("/api/v1/workers", workerRoutes)


// (app) our server listening for connections and displaying a message in our terminal once it starts listening
app.listen(port, () => console.log(`app listening on port`))