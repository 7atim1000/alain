// business logic
import mongoose from 'mongoose';
import { Application } from "./application.model"; 
import {  
            IApplication,
            IPhase,
            AddAppRequest, 
            AddPhaseRequest,
            UpdatePhaseRequest,
            UpdateAppRequest,
            
        } from './application.Interface' ;


export const insertApplicationService = async(appData: AddAppRequest): Promise<{app: IApplication}> => {
    const { appName } = appData ;
    // check if app name is already exist
    const existingApp = await Application.findOne({appName});
    if (existingApp) {
        throw new Error(`Sorry this application ${appName} is already exist`)
    }

    const newApp = await Application.create({
        appName ,
        phases: [] // initialize for empty phases array
    });

    return { app: newApp.toObject() };
};

export const updateApplicationService = async(updateApp: UpdateAppRequest): Promise<{app: IApplication}> => {
    const { applicationId, appName } = updateApp ;

    // validate input 
    if (!appName || appName.trim() === '') {
        throw new Error('Application name is required')
    }
    // find the application by ID 
    const application = await Application.findById(applicationId) ;
    if (!application) {
        throw new Error('Application not found');
    }

    // check for duplicate appName (if appName should be unique)
    const existingApp = await Application.findOne({
        appName: appName,
        _id: { $ne: applicationId }
    });
    if (existingApp) {
        throw new Error('Application name already exists');
    }

    // update the application
    application.appName= appName.trim();
    await application.save();

    return {app: application.toObject()};
};


export const getApplicationsService = async(): Promise<IApplication[]> => {
    try {
        const applications = await Application.find().sort({createdAt: 1});
        return applications;

    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const deleteApplicationService = async(applicationId: string): Promise<{success: boolean; message: string}> => {
    try {
        const deletedApplication = await Application.findByIdAndDelete(applicationId);
        if (!deletedApplication) {
            throw new Error('Application not found')
        }

        return {success: true, message: 'Application removed succesfully'};

    } catch (error: any) {
        throw new Error(error.message || 'Field to delete application')
    }
}




// export const getApplicationByIdService = async(applicationId: string): Promise<IApplication> => {
//     try {
//         const application = await Application.findById(applicationId) ;
//         if (!application) {
//             throw new Error('Application not found');
//         }

//         return application.toObject();

//     } catch (error: any) {
//         throw new Error(error.message)
//     }
// };

export const getApplicationByIdService = async(applicationId: string): Promise<IApplication> => {
    try {
        // basic validation
        const trimmedId = (applicationId || '').trim();
        if (!trimmedId || !mongoose.Types.ObjectId.isValid(trimmedId)) {
            throw new Error('Invalid applicationId');
        }

        // debug helpers
        console.log('getApplicationByIdService: searching id=', trimmedId);
        console.log('Mongoose readyState=', mongoose.connection.readyState); // 1 = connected

        // query
        const application = await Application.findById(trimmedId).lean();
        if (!application) {
            // helpful debug information before throwing
            console.warn('Application not found for id:', trimmedId);
            throw new Error('Application not found');
        }

        return application as IApplication;
    } catch (error: any) {
        // rethrow same message so controller can handle it
        throw new Error(error.message || 'Failed to get application');
    }
};

// PHASES : 
export const addPhaseToApplicationService = async(phaseData: AddPhaseRequest): Promise<{application: IApplication}> => {
    
    const { applicationId, phaseName, completionDate } = phaseData;
    const application = await Application.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }

    // check if phase name already exists in this application 
    const existingPhase = application.phases.find(phase => phase.phaseName === phaseName) ;
    if (existingPhase) {
        throw new Error(`Phase "${phaseName}" already exists in this application`);
    }

    // create a new phase 
    const newPhase = {
        phaseName ,
        completionDate: new Date(completionDate),
    
    };
    // add phase to application 
    application.phases.push(newPhase as any);
    // sort phases by order 
    // application.phases.sort((a, b) => a.order - b.order);

    await application.save();
    return { application: application.toObject() };
    
};

// export const addPhaseToApplicationService = async(phaseData: AddPhaseRequest): Promise<{application: IApplication}> => {
//     const { applicationId, phaseName, completionDate } = phaseData;
//     const appId = (applicationId || '').trim();
//     if (!mongoose.Types.ObjectId.isValid(appId)) {
//         throw new Error('Invalid applicationId');
//     }

//     const application = await Application.findById(appId);
//     if (!application) {
//         console.warn('addPhaseToApplicationService: application not found', appId);
//         throw new Error('Application not found');
//     }

//     // check if phase name already exists in this application 
//     const existingPhase = application.phases.find(phase => phase.phaseName === phaseName);
//     if (existingPhase) {
//         throw new Error(`Phase "${phaseName}" already exists in this application`);
//     }

//     // create a new phase 
//     const newPhase = {
//         phaseName,
//         completionDate: completionDate ? new Date(completionDate) : undefined,
//     };

//     application.phases.push(newPhase as any);
//     await application.save();

//     // re-fetch fresh application (ensure consistent shape)
//     const updatedApp = await Application.findById(appId).lean();
//     if (!updatedApp) throw new Error('Application not found after save');
//     return { application: updatedApp as unknown as IApplication };
// };

// update phases

export const updatePhaseService = async(updateData: UpdatePhaseRequest): Promise<{application: IApplication}> => {
    const {phaseId, ...updateFields} = updateData ;

    const application = await Application.findOne({ 'phases._id': phaseId });
    if (!application) {
        throw new Error('Phase not found');
    }


    // const phase = application.phases.id(phaseId);
    //Solution 2: Use Array.find() Method (Recommended)
    const phase = application.phases.find(p => p._id?.toString() === phaseId);
    if (!phase) {
        throw new Error('Phase not found')
    }

    // update phase field 
    if (updateFields.phaseName) phase.phaseName = updateFields.phaseName;
    // if (updateFields.description !== undefined) phase.description = updateFields.description;
    if (updateFields.completionDate) phase.completionDate = new Date(updateFields.completionDate);
    // if (updateFields.status) phase.status = updateFields.status;
    // if (updateFields.order !== undefined) phase.order = updateFields.order;

    // sort phases by order if order was updated
    // if (updateFields.order !==undefined) {
    //     application.phases.sort((a, b) => a.order - b.order);
    // }

    await application.save();
    return { application: application.toObject() };
};

// export const updatePhaseService = async(updateData: UpdatePhaseRequest): Promise<{application: IApplication}> => {
//     const { phaseId, ...updateFields } = updateData;
//     const pid = (phaseId || '').trim();
//     if (!mongoose.Types.ObjectId.isValid(pid)) {
//         throw new Error('Invalid phaseId');
//     }

//     const application = await Application.findOne({ 'phases._id': pid });
//     if (!application) {
//         console.warn('updatePhaseService: phase/application not found', pid);
//         throw new Error('Phase not found');
//     }

//     const phase = application.phases.id(pid);
//     if (!phase) {
//         throw new Error('Phase not found');
//     }

//     // update fields
//     if (updateFields.phaseName) phase.phaseName = updateFields.phaseName;
//     if (updateFields.description !== undefined) phase.description = updateFields.description;
//     if (updateFields.completionDate) phase.completionDate = new Date(updateFields.completionDate);
//     if (updateFields.status) phase.status = updateFields.status;
//     if (updateFields.order !== undefined) phase.order = updateFields.order;

//     if (updateFields.order !== undefined) {
//         application.phases.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
//     }

//     await application.save();

//     const updatedApp = await Application.findById(application._id).lean();
//     if (!updatedApp) throw new Error('Application not found after update');
//     return { application: updatedApp as unknown as IApplication };
// };


// export const deletePhaseService = async(phaseId: string): Promise<{application: IApplication}> => {
//     const application = await Application.findOne({'phases._id': phaseId});
//     if (!application) {
//         throw new Error('Phase not found');
//     }

//     application.phases.pull(phaseId);
    
//     await application.save();
//     return{ application: application.toObject() };
// };

export const deletePhaseService = async(phaseId: string): Promise<{application: IApplication}> => {
    const application = await Application.findOneAndUpdate(
        { 'phases._id': phaseId },
        { $pull: { phases: { _id: phaseId } } },
        { new: true }
    );
    
    if (!application) {
        throw new Error('Phase not found');
    }
    
    return { application: application.toObject() };
};




export const getPhasesByApplicationService = async(applicationId: string): Promise<IPhase[]> => {
  const application = await Application.findById(applicationId);
  if (!application) {
    throw new Error('Application not found');
  }

  return application.phases.sort((a, b) => a.order - b.order);
};

// export const getPhasesByApplicationService = async(applicationId: string): Promise<IPhase[]> => {
//   if (!mongoose.Types.ObjectId.isValid(applicationId || '')) {
//     throw new Error('Invalid applicationId');
//   }
//   const application = await Application.findById(applicationId).lean();
//   if (!application) throw new Error('Application not found');
//   // cast then sort
//   const phases = (application.phases || []) as IPhase[];
//   return phases.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
// };