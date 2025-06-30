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
exports.setupCrons = setupCrons;
const node_cron_1 = __importDefault(require("node-cron"));
const ProductService_1 = require("../services/ProductService");
const productService = new ProductService_1.ProductService();
function setupCrons() {
    node_cron_1.default.schedule('0 0 * * *', () => __awaiter(this, void 0, void 0, function* () {
        console.log('[CRON] Checando promoções expiradas...');
        yield productService.deleteExpiredProducts();
    }));
    if (process.env.NODE_ENV === 'development') {
        (() => __awaiter(this, void 0, void 0, function* () {
            console.log('[DEV] Executando deletar produtos expirados imediatamente para teste...');
            yield productService.deleteExpiredProducts();
        }))();
    }
}
