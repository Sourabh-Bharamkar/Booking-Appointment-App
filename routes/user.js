const express=require('express')
const app=express();

const userController=require('../controllers/user')

const router=express.Router();

router.get('/',userController.getAppointmentForm)

router.post('/book-appointment',userController.postBookAppointment)

router.post('/verify-user',userController.postVerifyUser)

router.get('/appointments',userController.getAllAppointments)


router.post('/delete-appointment',userController.postDeleteAppointment)

router.get('/delete-appointment/:id',userController.getDeleteAppointment)

router.get('/edit-appointment/:id',userController.getEditAppointment)

router.post('/update-user/:id',userController.getUpdateUser)


module.exports=router;