"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFromCli = exports.getGitlabAccessToken = exports.getGitlabBaseUrl = exports.getGithubAccessToken = exports.getGithubBaseUrl = exports.getAzureAccessToken = exports.getAzureBaseUrl = exports.getPlatforms = exports.getEndDate = exports.getStartDate = void 0;
const date_fns_1 = require("date-fns");
const prompts_1 = __importDefault(require("prompts"));
const validators_1 = require("./validators");
// `prompts` package uses generics which accepts string literal values and then uses those values as types
// This means I have to ensure I use a string literal type that matches a string literal value
const PROMPT_NAME = "value";
const getStartDate = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "date",
        message: "Choose a start date: ",
        initial: new Date(Date.now()),
        mask: "DD-MM-YYYY",
    });
    return promptData[PROMPT_NAME];
};
exports.getStartDate = getStartDate;
const getEndDate = async (startDate) => {
    const datePlus2Weeks = (0, date_fns_1.addDays)(new Date(startDate), 14);
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "date",
        message: "Choose an end date: ",
        initial: datePlus2Weeks,
        mask: "DD-MM-YYYY",
        validate: (endDate) => (0, validators_1.validateEndDate)(startDate, endDate),
    });
    return promptData[PROMPT_NAME];
};
exports.getEndDate = getEndDate;
const getPlatforms = async () => {
    const promptData = await (0, prompts_1.default)({
        type: "multiselect",
        name: PROMPT_NAME,
        message: "Select your platforms: ",
        choices: [
            { title: "Azure", value: "Azure", selected: false },
            { title: "Github", value: "Github", selected: true },
            { title: "Gitlab", value: "Gitlab", selected: false },
        ],
        instructions: false,
        min: 1,
    });
    return promptData[PROMPT_NAME];
};
exports.getPlatforms = getPlatforms;
const getAzureBaseUrl = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Azure organisation's base Url: ",
        validate: (url) => (0, validators_1.validateUrl)(url),
    });
    return promptData[PROMPT_NAME];
};
exports.getAzureBaseUrl = getAzureBaseUrl;
const getAzureAccessToken = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Azure personal access token: ",
        validate: (token) => (0, validators_1.validatePersonalAccessToken)(token),
    });
    return promptData[PROMPT_NAME];
};
exports.getAzureAccessToken = getAzureAccessToken;
const getGithubBaseUrl = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Github organisation's base Url: ",
        validate: (url) => (0, validators_1.validateUrl)(url),
    });
    return promptData[PROMPT_NAME];
};
exports.getGithubBaseUrl = getGithubBaseUrl;
const getGithubAccessToken = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Github personal access token: ",
        validate: (token) => (0, validators_1.validatePersonalAccessToken)(token),
    });
    return promptData[PROMPT_NAME];
};
exports.getGithubAccessToken = getGithubAccessToken;
const getGitlabBaseUrl = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Gitlab organisation's base Url: ",
        validate: (url) => (0, validators_1.validateUrl)(url),
    });
    return promptData[PROMPT_NAME];
};
exports.getGitlabBaseUrl = getGitlabBaseUrl;
const getGitlabAccessToken = async () => {
    const promptData = await (0, prompts_1.default)({
        name: PROMPT_NAME,
        type: "text",
        message: "Enter your Gitlab personal access token: ",
        validate: (token) => (0, validators_1.validatePersonalAccessToken)(token),
    });
    return promptData[PROMPT_NAME];
};
exports.getGitlabAccessToken = getGitlabAccessToken;
const getEmptyConfig = () => {
    return {
        startDate: new Date(),
        endDate: new Date(),
        azure: {
            enabled: false,
            baseUrl: "",
            personalAccessToken: "",
        },
        github: {
            enabled: false,
            baseUrl: "",
            personalAccessToken: "",
        },
        gitlab: {
            enabled: false,
            baseUrl: "",
            personalAccessToken: "",
        },
        httpTimeoutInMS: 5000,
    };
};
const getConfigFromCli = async () => {
    const config = getEmptyConfig();
    config.startDate = await (0, exports.getStartDate)();
    config.endDate = await (0, exports.getEndDate)(config.startDate);
    const platforms = await (0, exports.getPlatforms)();
    config.azure.enabled = platforms.includes("Azure");
    config.github.enabled = platforms.includes("Github");
    config.gitlab.enabled = platforms.includes("Gitlab");
    if (config.azure.enabled) {
        config.azure.baseUrl = await (0, exports.getAzureBaseUrl)();
        config.azure.personalAccessToken = await (0, exports.getAzureAccessToken)();
    }
    if (config.github.enabled) {
        config.github.baseUrl = await (0, exports.getGithubBaseUrl)();
        config.github.personalAccessToken = await (0, exports.getGithubAccessToken)();
    }
    if (config.gitlab.enabled) {
        config.gitlab.baseUrl = await (0, exports.getGitlabBaseUrl)();
        config.gitlab.personalAccessToken = await (0, exports.getGitlabAccessToken)();
    }
    return config;
};
exports.getConfigFromCli = getConfigFromCli;
//# sourceMappingURL=prompts.js.map