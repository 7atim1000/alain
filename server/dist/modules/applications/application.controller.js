"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhasesByApplicationController = exports.deletePhaseController = exports.updatePhaseController = exports.addPhaseController = exports.deleteApplicationController = exports.getApplicationByIdController = exports.getApplicationsController = exports.updateApplicationController = exports.insertApplicationController = void 0;
const AppService = __importStar(require("./application.service"));
const insertApplicationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appName } = req.body;
        const { app } = yield AppService.insertApplicationService({
            appName
        });
        res.status(201).json({ success: true, appData: app, message: 'Application added successfully' });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.insertApplicationController = insertApplicationController;
const updateApplicationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        const { appName } = req.body;
        if (!applicationId) {
            res.status(400).json({ success: false, message: 'Application ID is required' });
            return;
        }
        if (!appName) {
            res.status(400).json({ success: false, message: 'Application name is required' });
            return;
        }
        const result = yield AppService.updateApplicationService({
            applicationId,
            appName
        });
        res.status(200).json({
            success: true,
            app: result.app,
            message: 'Application updated successfully'
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.updateApplicationController = updateApplicationController;
const getApplicationsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const applications = yield AppService.getApplicationsService();
        res.status(201).json({ success: true, applications });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.getApplicationsController = getApplicationsController;
const getApplicationByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const application = yield AppService.getApplicationByIdService(id);
        res.status(200).json({
            success: true,
            application
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getApplicationByIdController = getApplicationByIdController;
const deleteApplicationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ success: false, message: 'Category ID is required' });
            return;
        }
        const result = yield AppService.deleteApplicationService(id);
        res.status(200).json(result);
    }
    catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.deleteApplicationController = deleteApplicationController;
const addPhaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId, phaseName, completionDate } = req.body;
        const { application } = yield AppService.addPhaseToApplicationService({
            applicationId,
            phaseName,
            completionDate: new Date(completionDate)
        });
        res.status(201).json({
            success: true,
            application,
            message: 'Phase added successfully'
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.addPhaseController = addPhaseController;
const updatePhaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phaseId, phaseName, description, completionDate, status, order } = req.body;
        const { application } = yield AppService.updatePhaseService({
            phaseId,
            phaseName,
            completionDate: completionDate ? new Date(completionDate) : undefined,
        });
        res.status(200).json({
            success: true,
            application,
            message: 'Phase updated successfully'
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.updatePhaseController = updatePhaseController;
const deletePhaseController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phaseId } = req.params;
        if (!phaseId) {
            res.status(400).json({ success: false, message: 'Phase ID is required' });
            return;
        }
        const result = yield AppService.deletePhaseService(phaseId);
        res.status(200).json({
            success: true,
            application: result.application,
            message: 'Phase deleted successfully'
        });
    }
    catch (error) {
        console.error('Error deleting phase:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});
exports.deletePhaseController = deletePhaseController;
const getPhasesByApplicationController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicationId } = req.params;
        const phases = yield AppService.getPhasesByApplicationService(applicationId);
        res.status(200).json({
            success: true,
            phases
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});
exports.getPhasesByApplicationController = getPhasesByApplicationController;
