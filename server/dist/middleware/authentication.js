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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_model_1 = require("../modules/auth/auth.model");
const protectRoute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.token;
        if (!token) {
            res.status(401).json({ success: false, message: 'Access token required' });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield auth_model_1.Auth.findById(decoded.userId).select("-password");
        if (!user) {
            res.status(404).json({ sucess: false, message: 'User not found' });
            return;
        }
        ;
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error.message);
        let errorMessage = "Authentication failed";
        if (error.name === 'JsonWebTokenError') {
            errorMessage = "Invalid token";
        }
        else if (error.name === 'TokenExpiredError') {
            errorMessage = "Token expired";
        }
        else if (error.name === 'NotBeforeError') {
            errorMessage = "Token not active";
        }
        res.status(401).json({ success: false, message: errorMessage });
    }
});
exports.protectRoute = protectRoute;
