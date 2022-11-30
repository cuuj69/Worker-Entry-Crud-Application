//In some sense the constant variable we created turned out to act as a class and is facilitated by the infallibe require method
// A little confusion is why we need to destructure the Router variabe assigned to the require instance. My guess is it's showboating.
const { Router } = require('express')

// In all neccessity a need to point to import the all essential controller utilizing it's path 
const controller = require('./controller')


//In this case we are assigning our constant variable to the unimaginable Router function
const router = Router();

router.get("/", controller.getWorkers)
router.get("/:id", controller.getWorkersbyId)
router.post("/", controller.addWorker)
router.delete("/:id", controller.deleteWorker)
router.put("/:id", controller.updateWorker)

// A side note in all of this is that we can by all means defined our endpoints with our routes but we choose to  outsource that task to controller.js, reason is we don't want our routes.js to be clogged up.

// router.get('/',(req,res)=>{
//     res.send("Using api routes")
// })

module.exports = router