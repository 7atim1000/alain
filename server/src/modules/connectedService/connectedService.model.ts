import mongoose from 'mongoose' ;
import { IConnectedService } from './connectedService.interface';

const connectedServiceSchema = new mongoose.Schema({
    applicationId: { type: mongoose.Schema.Types.ObjectId , ref: 'Application', required: true },
    serviceName: { type: String, required: true },

}, {
    timestamps: true
});

export const ConnectedService = mongoose.model<IConnectedService>('ConnectedService', connectedServiceSchema) ;