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
exports.UpdateProfileService = exports.loginSerivce = exports.RegisterService = void 0;
const generateToken_1 = require("../../utils/generateToken");
const auth_model_1 = __importDefault(require("./auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const cloudinary_1 = __importDefault(require("../../config/cloudinary"));
const RegisterService = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = userData;
    const existingUser = yield auth_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error(`Sorry this email ${email} is already token`);
    }
    const salt = yield bcryptjs_1.default.genSalt(10);
    const hashedPassword = yield bcryptjs_1.default.hash(password, salt);
    const newUser = yield auth_model_1.default.create({
        fullName,
        email,
        password: hashedPassword
    });
    const token = (0, generateToken_1.generateToken)(newUser._id);
    return { user: newUser.toObject(), token };
});
exports.RegisterService = RegisterService;
const loginSerivce = (loginData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = loginData;
    const userData = yield auth_model_1.default.findOne({ email });
    if (!userData) {
        throw new Error('Sorry user not found');
    }
    const isPasswordCorrect = yield bcryptjs_1.default.compare(password, userData.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials');
    }
    const token = (0, generateToken_1.generateToken)(userData._id);
    return { user: userData.toObject(), token };
});
exports.loginSerivce = loginSerivce;
const UpdateProfileService = (userId, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullName, email, password, imageFile } = updateData;
        const updateFields = { fullName, email };
        if (password) {
            const saltRounds = 10;
            updateFields.password = yield bcryptjs_1.default.hash(password, saltRounds);
        }
        yield auth_model_1.default.findByIdAndUpdate(userId, updateFields);
        if (imageFile) {
            const imageUpload = yield cloudinary_1.default.uploader.upload(imageFile.path, {
                resource_type: 'image'
            });
            const imageURL = imageUpload.secure_url;
            yield auth_model_1.default.findByIdAndUpdate(userId, { image: imageURL });
        }
        return { success: true, message: 'Profile updated' };
    }
    catch (error) {
        console.error('Profile update error:', error);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return { success: false, message: errorMessage };
    }
});
exports.UpdateProfileService = UpdateProfileService;
