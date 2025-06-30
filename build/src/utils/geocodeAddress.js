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
Object.defineProperty(exports, "__esModule", { value: true });
exports.geocodeAddress = geocodeAddress;
function geocodeAddress(address) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!address)
            return null;
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
        const response = yield fetch(url, {
            headers: {
                "User-Agent": "promo-app-vitor/1.0"
            }
        });
        const data = yield response.json();
        if (!data || !data[0])
            return null;
        return {
            address: data[0].display_name,
            latitude: parseFloat(data[0].lat),
            longitude: parseFloat(data[0].lon),
        };
    });
}
