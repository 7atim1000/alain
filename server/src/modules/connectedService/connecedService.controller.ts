import * as ConnectedServiceService from './connectedService.service' ;
import { Request, Response } from 'express';

export const addConnectedServiceController= async(req: Request, res: Response): Promise<void> => {
    try {
        
        const { applicationId, serviceName } = req.body ;
        const service = await ConnectedServiceService.addConnectedService({
            applicationId,
            serviceName
        });

        res.status(201).json({ success: true, service, message: 'Connected serviceadd successfully'})
    
    } catch (error: any) {
        res.status(500).json({success: false, message: error.message})
    }
};


export const getConnectedServiceByApplication = async(req: Request, res: Response): Promise<void> => {
    try {
        
        const { applicationId } = req.params;
        const services = await ConnectedServiceService.getConnectedServiceByApplication(applicationId);
        
        res.status(200).json({sucess: true , services});

    } catch (error: any) {
        res.status(500).json({success: false, message: error.message})
    }
};


export const updateConnectedServiceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { serviceId, serviceName } = req.body;

        const service = await ConnectedServiceService.updateConnectedService({
            serviceId,
            serviceName,
        });

        res.status(200).json({ success: true, service, message: 'Connected service updated successfully' });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteConnectedServiceController = async (req: Request, res: Response): Promise<void> => {
    try {
        
        const {serviceId} = req.params ;
        await ConnectedServiceService.deleteConnectedService(serviceId);

        res.status(200).json({success: true, message: 'Connected service deleted successfully'});

    } catch (error: any) {
       res.status(500).json({success: false, message: error.message})    
    }
};

