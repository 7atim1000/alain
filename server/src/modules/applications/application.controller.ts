// HTTP handling
import { Request, Response } from 'express' ;
import * as AppService from './application.service' ;

export const insertApplicationController = async(req: Request, res: Response): Promise<void> => {
    try {
        const {appName} = req.body ;

        // connect service
        const {app} = await AppService.insertApplicationService({
            appName
        })

        res.status(201).json({success: true, appData: app, message: 'Application added successfully'});

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({success: false, message:error.message})
    }
};

export const updateApplicationController = async(req:Request, res: Response): Promise<void> => {
  try {
    const { applicationId } = req.params ;
    const { appName } = req.body;

    // validate inputs
    if (!applicationId) {
      res.status(400).json({ success: false, message: 'Application ID is required'});
      return;
    }
    if (!appName) {
      res.status(400).json({ success: false, message: 'Application name is required' });
      return;
    }

    const result = await AppService.updateApplicationService({
      applicationId,
      appName
    });

    res.status(200).json({
      success: true,
      app: result.app,
      message: 'Application updated successfully' 
    })

  } catch (error: any) {
    res.status(500).json({success: false, message: error.message})
  }
}


export const getApplicationsController = async(req: Request, res: Response): Promise<void> => {
    try {
        
        const applications = await AppService.getApplicationsService() ;
        // The issue is in your controller - you're not actually calling the service function. 
        // You're just referencing the function without invoking it.
        res.status(201).json({success: true, applications});

    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({success: false, message: error.message})
    }
};

export const getApplicationByIdController = async(req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const application = await AppService.getApplicationByIdService(id);
    res.status(200).json({ 
      success: true, 
      application 
    });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

// export const deleteApplicatonController = async(req: Request, res:Response): Promise<void> => {
//   try {
//     const {id} = req.body ;
//     if (!id) {
//       res.status(400).json({success: false, message: 'Application ID is required'})
//       return ;
//     }

//     const result = await AppService.deleteApplicationService(id);
//     res.status(200).json(result);

//   } catch (error: any) {
//     res.status(500).json({success: false, message: error.message})
//   }
// };

// Alternative: Using URL Parameters (Recommended)
// If you prefer using URL parameters instead of request body:

// Service (same as above)
// Controller with URL params:
// typescript


export const deleteApplicationController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params; // Get from URL instead of body

        if (!id) {
            res.status(400).json({ success: false, message: 'Category ID is required' });
            return;
        }

        const result = await AppService.deleteApplicationService(id);

        res.status(200).json(result);
        
    } catch (error: any) {
        console.error('Error deleting category:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};


// Phase Controllers
export const addPhaseController = async(req: Request, res: Response): Promise<void> => {
  try {
    const { applicationId, phaseName, completionDate } = req.body;

    const { application } = await AppService.addPhaseToApplicationService({
      applicationId,
      phaseName,
      completionDate: new Date(completionDate)

    });

    res.status(201).json({ 
      success: true, 
      application, 
      message: 'Phase added successfully' 
    });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export const updatePhaseController = async(req: Request, res: Response): Promise<void> => {
  try {
    const { phaseId, phaseName, description, completionDate, status, order } = req.body;

    const { application } = await AppService.updatePhaseService({
      phaseId,
      phaseName,
      //description,
      completionDate: completionDate ? new Date(completionDate) : undefined,
      //status,
      //order: order ? parseInt(order) : undefined
    });

    res.status(200).json({ 
      success: true, 
      application, 
      message: 'Phase updated successfully' 
    });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};


export const deletePhaseController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { phaseId } = req.params;

        if (!phaseId) {
            res.status(400).json({ success: false, message: 'Phase ID is required' });
            return;
        }

        const result = await AppService.deletePhaseService(phaseId);

        res.status(200).json({ 
            success: true, 
            application: result.application,
            message: 'Phase deleted successfully' 
        });
    } catch (error: any) {
        console.error('Error deleting phase:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getPhasesByApplicationController = async(req: Request, res: Response): Promise<void> => {
  try {
    const { applicationId } = req.params;
    
    const phases = await AppService.getPhasesByApplicationService(applicationId);

    res.status(200).json({ 
      success: true, 
      phases 
    });

  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};