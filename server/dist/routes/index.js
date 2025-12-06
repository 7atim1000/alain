"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("../modules/auth/auth.route"));
const application_route_1 = __importDefault(require("../modules/applications/application.route"));
const connectedService_route_1 = __importDefault(require("../modules/connectedService/connectedService.route"));
const router = express_1.default.Router();
router.use('/auth', auth_route_1.default);
router.use('/app', application_route_1.default);
router.use('/connected-services', connectedService_route_1.default);
exports.default = router;
