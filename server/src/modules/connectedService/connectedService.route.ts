import express from 'express' ;
import * as ConnectedServiceController from './connecedService.controller' ;

const router = express.Router() ;

router.post('/', ConnectedServiceController.addConnectedServiceController);
router.get('/:applicationId', ConnectedServiceController.getConnectedServiceByApplication );
router.put('/', ConnectedServiceController.updateConnectedServiceController);
router.delete('/:serviceId', ConnectedServiceController.deleteConnectedServiceController);

export default router ;