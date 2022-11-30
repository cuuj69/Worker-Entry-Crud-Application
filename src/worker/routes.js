//In some sense the constant variable we created turned out to act as a class and is facilitated by the infallibe require method
const { Router } = require('express')
const controller = require('./controller')


//In this case we are assigning our constant variable to the unimaginable Router function
const router = Router();

router.get("/", controller.getWorkers)
router.get("/:id", controller.getWorkersbyId)
router.post("/", controller.addWorker)
router.delete("/:id", controller.deleteWorker)
router.put("/:id", controller.updateWorker)
// router.get('/',(req,res)=>{
//     res.send("Using api routes")
// })

module.exports = router