"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.overrideConfig = exports.setConfig = exports.getConfig = void 0;
const lodash_1 = require("lodash");
const code_review_leaderboard_config_1 = __importDefault(require("../code-review-leaderboard.config"));
let selectedConfig = code_review_leaderboard_config_1.default;
const getConfig = () => {
    return selectedConfig;
};
exports.getConfig = getConfig;
const setConfig = (newConfig) => {
    selectedConfig = newConfig;
};
exports.setConfig = setConfig;
const overrideConfig = (newConfig) => {
    const overiddenConfig = (0, lodash_1.merge)((0, exports.getConfig)(), newConfig);
    (0, exports.setConfig)(overiddenConfig);
};
exports.overrideConfig = overrideConfig;
//# sourceMappingURL=config.js.map