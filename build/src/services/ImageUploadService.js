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
exports.ImageUploadService = void 0;
const fs_1 = __importDefault(require("fs"));
const util_1 = require("util");
const cloudinary_1 = require("../utils/cloudinary");
const imageModeration_1 = require("../utils/imageModeration");
const unlinkAsync = (0, util_1.promisify)(fs_1.default.unlink);
class ImageUploadService {
    static processImage(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verifica se o arquivo existe
            if (!fs_1.default.existsSync(filePath)) {
                throw new Error('Arquivo não encontrado.');
            }
            // Moderação de conteúdo
            const isSafe = yield (0, imageModeration_1.moderateImage)(filePath);
            if (!isSafe) {
                yield unlinkAsync(filePath); // Remove o arquivo local
                throw new Error('Conteúdo impróprio detectado na imagem.');
            }
            // Upload para o Cloudinary
            const result = yield cloudinary_1.cloudinary.uploader.upload(filePath);
            yield unlinkAsync(filePath); // Remove o arquivo local após o upload
            return { imageUrl: result.secure_url, publicId: result.public_id };
        });
    }
}
exports.ImageUploadService = ImageUploadService;
