import express from 'express' ;
import * as AppController from './application.controller' ;
const router = express.Router();

router.post('/', AppController.insertApplicationController);
router.get('/', AppController.getApplicationsController);
router.get('/:id', AppController.getApplicationByIdController);
router.put('/:applicationId/app-name', AppController.updateApplicationController);

// Phase routes
router.post('/phases', AppController.addPhaseController);
router.put('/phases', AppController.updatePhaseController);
router.delete('/phases/:phaseId', AppController.deletePhaseController);
router.get('/:applicationId/phases', AppController.getPhasesByApplicationController);

//Route with URL params:
router.delete('/:id', AppController.deleteApplicationController);

export default router ;