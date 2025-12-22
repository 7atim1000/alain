import { ConnectedService } from "./connectedService.model";
import { IConnectedService, AddConnectedServiceRequest, UpdateConnectedServiceRequest } from "./connectedService.interface";

export const addConnectedService = async(serviceData: AddConnectedServiceRequest): Promise<IConnectedService> => {
    
    const { applicationId, serviceName } = serviceData ;
    const existingService = await ConnectedService.findOne({ applicationId, serviceName })
    if (existingService) {
        throw new Error(`Service ${serviceName} is already connected to the application.`)
    }

    const newService = await ConnectedService.create({
        applicationId,
        serviceName 
    });

    return newService.toObject() ;
};



export const getConnectedServiceByApplication = async(applicationId: string): Promise<IConnectedService[]> => {
    
    const services = await ConnectedService.find({ applicationId }).sort({ createdAt: 1 });
    return services ;

};

export const updateConnectedService = async(updateData: UpdateConnectedServiceRequest): Promise<IConnectedService> => {
    const { serviceId, ...updatedFields } = updateData ;

    const service = await ConnectedService.findById(serviceId);
    if (!service) {
        throw new Error('Connected service not found');
    }

    if (updatedFields.serviceName) {
        const duplicate = await ConnectedService.findOne({
            applicationId: service.applicationId,
            serviceName: updatedFields.serviceName,
            _id: { $ne: serviceId }
        });
        if (duplicate) {
            throw new Error(`Service ${updatedFields.serviceName} is already connected to the application`);
        }
    }

    Object.assign(service, updatedFields);
    await service.save();
    
    return service.toObject(); 
};



export const deleteConnectedService = async (serviceId: string): Promise<void> => {
    const service = await ConnectedService.findById(serviceId);
    if (!service) {
        throw new Error('Connected service not found');
    }

    await ConnectedService.findByIdAndDelete(serviceId);
};