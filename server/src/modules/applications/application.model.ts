import mongoose from 'mongoose' ;
import { IApplication, IPhase } from './application.Interface';

const phaseSchema = new mongoose.Schema({
  phaseName: { type: String, required: true },
  description: { type: String },
  completionDate: { type: Date, required: true },
  status: { type:String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  order: { type: Number}
}, {
    _id: true, 
    timestamps: false
});


const applicationSchema = new mongoose.Schema({
    appName : {type: String, required: true, unique: true },
    phases: [phaseSchema]

},{
    timestamps: true 
});

export const Application = mongoose.model<IApplication>('Application', applicationSchema)