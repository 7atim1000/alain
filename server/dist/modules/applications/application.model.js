"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Application = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const phaseSchema = new mongoose_1.default.Schema({
    phaseName: { type: String, required: true },
    description: { type: String },
    completionDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    order: { type: Number }
}, {
    _id: true,
    timestamps: false
});
const applicationSchema = new mongoose_1.default.Schema({
    appName: { type: String, required: true, unique: true },
    phases: [phaseSchema]
}, {
    timestamps: true
});
exports.Application = mongoose_1.default.model('Application', applicationSchema);
