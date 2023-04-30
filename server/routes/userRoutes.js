import express from 'express'
const router = express.Router();
import UserController from '../controllers/userController.js'
import checkUserAuth from '../middlewares/auth-middleware.js';
//Route level middleware 
router.use('/loggeduser',checkUserAuth)
//router.use('/add-new-lead',checkUserAuth)
//router.use('/all-lead',checkUserAuth)


//PUBLIC ROUTES

router.post('/sign-up',UserController.userRegistration)
router.post('/login',UserController.userLogin)



//protected routes

router.get('/loggeduser',UserController.loggedUser)

{/*
router.get('/',leadController.getDetails)
router.get('/getAllEmployee',UserController.getAllEmployee)
router.delete('/getAllEmployee',UserController.deleteEmployee)
router.post('/add-new-lead',leadController.createLead)
router.get('/all-lead',leadController.getAllLead)
router.delete('/all-lead',leadController.deleteUser)
router.get('/all-lead/:id',leadController.getUserById)
router.put('/all-lead/:id/edit-lead',leadController.editLead)
router.get('/admin/all-lead',leadController.getAllUserLead)
router.put('/all-lead/:id/user-specific-details',leadController.addCallback)
router.put('/admin/all-lead/:id/user-specific-details',leadController.addCallback)
router.post('/admin/add-new-employee',UserController.addEmployee)
*/}






export default router;