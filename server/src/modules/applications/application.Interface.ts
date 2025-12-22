// Type defenitions
import mongoose from 'mongoose';

export interface IPhase {
    // _id?: string;
    _id?: mongoose.Types.ObjectId | string;
    phaseName: string;
    completionDate: Date;
    status: 'pending' | 'in-progress' | 'completed' ;

    order: number;
}

export interface IApplication {
    _id?: string;
    appName: string; 
    phases: IPhase[];
    createdAt?: Date;
    updatedAt?: Date;
};

export interface AddAppRequest {
    appName: string;
};

export interface UpdateAppRequest {
    applicationId: string;
    appName: string ;
}

export interface AddPhaseRequest{
    applicationId: string;
    phaseName: string;
    description?: string;
    completionDate: Date;
    // status?: 'pending' | 'in-progress' | 'completed';
    // order: number ;
};

export interface UpdatePhaseRequest {
    phaseId: string;
    phaseName?: string; 
    description?: string;
    completionDate?: Date;
    status?: 'pending' | 'in-progress' | 'completed' ;
    order?: number;
}


