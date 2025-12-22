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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteConnectedService = exports.updateConnectedService = exports.getConnectedServiceByApplication = exports.addConnectedService = void 0;
const connectedService_model_1 = require("./connectedService.model");
const addConnectedService = (serviceData) => __awaiter(void 0, void 0, void 0, function* () {
    const { applicationId, serviceName } = serviceData;
    const existingService = yield connectedService_model_1.ConnectedService.findOne({ applicationId, serviceName });
    if (existingService) {
        throw new Error(`Service ${serviceName} is already connected to the application.`);
    }
    const newService = yield connectedService_model_1.ConnectedService.create({
        applicationId,
        serviceName
    });
    return newService.toObject();
});
exports.addConnectedService = addConnectedService;
const getConnectedServiceByApplication = (applicationId) => __awaiter(void 0, void 0, void 0, function* () {
    const services = yield connectedService_model_1.ConnectedService.find({ applicationId }).sort({ createdAt: 1 });
    return services;
});
exports.getConnectedServiceByApplication = getConnectedServiceByApplication;
const updateConnectedService = (updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const { serviceId } = updateData, updatedFields = __rest(updateData, ["serviceId"]);
    const service = yield connectedService_model_1.ConnectedService.findById(serviceId);
    if (!service) {
        throw new Error('Connected service not found');
    }
    if (updatedFields.serviceName) {
        const duplicate = yield connectedService_model_1.ConnectedService.findOne({
            applicationId: service.applicationId,
            serviceName: updatedFields.serviceName,
            _id: { $ne: serviceId }
        });
        if (duplicate) {
            throw new Error(`Service ${updatedFields.serviceName} is already connected to the application`);
        }
    }
    Object.assign(service, updatedFields);
    yield service.save();
    return service.toObject();
});
exports.updateConnectedService = updateConnectedService;
const deleteConnectedService = (serviceId) => __awaiter(void 0, void 0, void 0, function* () {
    const service = yield connectedService_model_1.ConnectedService.findById(serviceId);
    if (!service) {
        throw new Error('Connected service not found');
    }
    yield connectedService_model_1.ConnectedService.findByIdAndDelete(serviceId);
});
exports.deleteConnectedService = deleteConnectedService;
