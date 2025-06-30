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
exports.moderateImage = moderateImage;
const axios_1 = __importDefault(require("axios"));
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const SIGHTENGINE_API_USER = process.env.SIGHTENGINE_API_USER;
const SIGHTENGINE_API_SECRET = process.env.SIGHTENGINE_API_SECRET;
function moderateImage(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        const form = new form_data_1.default();
        form.append('media', fs_1.default.createReadStream(filePath));
        form.append('models', 'nudity-2.1,weapon,recreational_drug,medical,offensive-2.0,scam,text-content,gore-2.0,text,qr-content,violence,self-harm');
        form.append('api_user', SIGHTENGINE_API_USER);
        form.append('api_secret', SIGHTENGINE_API_SECRET);
        try {
            const response = yield axios_1.default.post('https://api.sightengine.com/1.0/check.json', form, {
                headers: form.getHeaders(),
            });
            const { nudity, weapon, recreational_drug: drugs, medical, offensive, scam, gore, violence, self_harm } = response.data;
            const nudityScore = 1 - nudity.none;
            const weaponProb = (_b = (_a = weapon === null || weapon === void 0 ? void 0 : weapon.classes) === null || _a === void 0 ? void 0 : _a.firearm) !== null && _b !== void 0 ? _b : 0;
            const drugsProb = (_c = drugs === null || drugs === void 0 ? void 0 : drugs.prob) !== null && _c !== void 0 ? _c : 0;
            const medicalProb = (_d = medical === null || medical === void 0 ? void 0 : medical.prob) !== null && _d !== void 0 ? _d : 0;
            const scamProb = (_f = (_e = response.data.scam) === null || _e === void 0 ? void 0 : _e.prob) !== null && _f !== void 0 ? _f : 0;
            const goreProb = (_g = gore === null || gore === void 0 ? void 0 : gore.prob) !== null && _g !== void 0 ? _g : 0;
            const violenceProb = (_h = violence === null || violence === void 0 ? void 0 : violence.prob) !== null && _h !== void 0 ? _h : 0;
            const selfHarmProb = (_j = self_harm === null || self_harm === void 0 ? void 0 : self_harm.prob) !== null && _j !== void 0 ? _j : 0;
            const isSafe = nudityScore <= 0.15 &&
                weaponProb <= 0.2 &&
                drugsProb <= 0.2 &&
                medicalProb <= 0.2 &&
                scamProb <= 0.2 &&
                goreProb <= 0.2 &&
                violenceProb <= 0.2 &&
                selfHarmProb <= 0.2;
            return isSafe;
        }
        catch (error) {
            console.error('Erro na moderação de imagem:', error);
            return false;
        }
    });
}
