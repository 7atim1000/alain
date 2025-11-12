"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectedService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectedServiceSchema = new mongoose_1.default.Schema({
    applicationId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Application', required: true },
    serviceName: { type: String, required: true },
}, {
    timestamps: true
});
exports.ConnectedService = mongoose_1.default.model('ConnectedService', connectedServiceSchema);
