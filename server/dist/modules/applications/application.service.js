"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhasesByApplicationService = exports.deletePhaseService = exports.updatePhaseService = exports.addPhaseToApplicationService = exports.getApplicationByIdService = exports.deleteApplicationService = exports.getApplicationsService = exports.updateApplicationService = exports.insertApplicationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const application_model_1 = require("./application.model");
const insertApplicationService = (appData) => __awaiter(void 0, void 0, void 0, function* () {
    const { appName } = appData;
    const existingApp = yield application_model_1.Application.findOne({ appName });
    if (existingApp) {
        throw new Error(`Sorry this application ${appName} is already exist`);
    }
    const newApp = yield application_model_1.Application.create({
        appName,
        phases: []
    });
    return { app: newApp.toObject() };
});
exports.insertApplicationService = insertApplicationService;
const updateApplicationService = (updateApp) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationId, appName } = updateApp;
    if (!appName || appName.trim() === '') {
        throw new Error('Application name is required');
    }
    const application = yield application_model_1.Application.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    const existingApp = yield application_model_1.Application.findOne({
        appName: appName,
        _id: { $ne: applicationId }
    });
    if (existingApp) {
        throw new Error('Application name already exists');
    }
    application.appName = appName.trim();
    yield application.save();
    return { app: application.toObject() };
});
exports.updateApplicationService = updateApplicationService;
const getApplicationsService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield application_model_1.Application.find().sort({ createdAt: 1 });
        return applications;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
exports.getApplicationsService = getApplicationsService;
const deleteApplicationService = (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedApplication = yield application_model_1.Application.findByIdAndDelete(applicationId);
        if (!deletedApplication) {
            throw new Error('Application not found');
        }
        return { success: true, message: 'Application removed succesfully' };
    }
    catch (error) {
        throw new Error(error.message || 'Field to delete application');
    }
});
exports.deleteApplicationService = deleteApplicationService;
const getApplicationByIdService = (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trimmedId = (applicationId || '').trim();
        if (!trimmedId || !mongoose_1.default.Types.ObjectId.isValid(trimmedId)) {
            throw new Error('Invalid applicationId');
        }
        console.log('getApplicationByIdService: searching id=', trimmedId);
        console.log('Mongoose readyState=', mongoose_1.default.connection.readyState);
        const application = yield application_model_1.Application.findById(trimmedId).lean();
        if (!application) {
            console.warn('Application not found for id:', trimmedId);
            throw new Error('Application not found');
        }
        return application;
    }
    catch (error) {
        throw new Error(error.message || 'Failed to get application');
    }
});
exports.getApplicationByIdService = getApplicationByIdService;
const addPhaseToApplicationService = (phaseData) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationId, phaseName, completionDate } = phaseData;
    const application = yield application_model_1.Application.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    const existingPhase = application.phases.find(phase => phase.phaseName === phaseName);
    if (existingPhase) {
        throw new Error(`Phase "${phaseName}" already exists in this application`);
    }
    const newPhase = {
        phaseName,
        completionDate: new Date(completionDate),
    };
    application.phases.push(newPhase);
    yield application.save();
    return { application: application.toObject() };
});
exports.addPhaseToApplicationService = addPhaseToApplicationService;
const updatePhaseService = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const { phaseId } = updateData, updateFields = __rest(updateData, ["phaseId"]);
    const application = yield application_model_1.Application.findOne({ 'phases._id': phaseId });
    if (!application) {
        throw new Error('Phase not found');
    }
    const phase = application.phases.find(p => { var _a; return ((_a = p._id) === null || _a === void 0 ? void 0 : _a.toString()) === phaseId; });
    if (!phase) {
        throw new Error('Phase not found');
    }
    if (updateFields.phaseName)
        phase.phaseName = updateFields.phaseName;
    if (updateFields.completionDate)
        phase.completionDate = new Date(updateFields.completionDate);
    yield application.save();
    return { application: application.toObject() };
});
exports.updatePhaseService = updatePhaseService;
const deletePhaseService = (phaseId) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield application_model_1.Application.findOneAndUpdate({ 'phases._id': phaseId }, { $pull: { phases: { _id: phaseId } } }, { new: true });
    if (!application) {
        throw new Error('Phase not found');
    }
    return { application: application.toObject() };
});
exports.deletePhaseService = deletePhaseService;
const getPhasesByApplicationService = (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    const application = yield application_model_1.Application.findById(applicationId);
    if (!application) {
        throw new Error('Application not found');
    }
    return application.phases.sort((a, b) => a.order - b.order);
});
exports.getPhasesByApplicationService = getPhasesByApplicationService;
