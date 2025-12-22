import express from 'express';
import authRoute from '../modules/auth/auth.route';
import appRoute from '../modules/applications/application.route';
import connectedServiceRoute from '../modules/connectedService/connectedService.route';

const router = express.Router();

router.use('/auth', authRoute);
router.use('/app', appRoute);
router.use('/connected-services', connectedServiceRoute);

export default router ;



// {	
// 	"email": "admin@example.com",
// 	"password": "admin"
// } 