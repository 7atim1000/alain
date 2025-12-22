export interface IConnectedService {
    _id?: string;
    applicationId: string;
    serviceName: string;
    createdAt: Date;
    updatedAt: Date;
};

export interface AddConnectedServiceRequest{
    applicationId: string;
    serviceName: string;
};

export interface UpdateConnectedServiceRequest{
    serviceId: string;
    serviceName?: string;
};