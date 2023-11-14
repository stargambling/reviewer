"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePersonalAccessToken = exports.validateUrl = exports.validateEndDate = void 0;
const date_fns_1 = require("date-fns");
const url_regex_1 = __importDefault(require("url-regex"));
const validateEndDate = (startDate, endDate) => {
    if ((0, date_fns_1.isBefore)(endDate, startDate)) {
        const startDateString = (0, date_fns_1.format)(startDate, "dd/MM/yyyy");
        const endDateString = (0, date_fns_1.format)(endDate, "dd/MM/yyyy");
        return `endDate (${endDateString}) cannot be earlier than startDate (${startDateString})`;
    }
    else {
        return true;
    }
};
exports.validateEndDate = validateEndDate;
const validateUrl = (url) => {
    const isValidUrl = (0, url_regex_1.default)().test(url);
    const isEmptyUrl = url.length === 0;
    if (isValidUrl) {
        return true;
    }
    else if (isEmptyUrl) {
        return "You must enter a URL";
    }
    else {
        return "That URL is invalid";
    }
};
exports.validateUrl = validateUrl;
const validatePersonalAccessToken = (token) => {
    const isEmptyString = token.length === 0;
    if (isEmptyString) {
        return "You must enter your personal access token";
    }
    else {
        return true;
    }
};
exports.validatePersonalAccessToken = validatePersonalAccessToken;
//# sourceMappingURL=validators.js.map