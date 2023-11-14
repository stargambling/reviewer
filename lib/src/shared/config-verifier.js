"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inConfigDateRange = exports.verifyConfig = void 0;
const date_fns_1 = require("date-fns");
const config_1 = require("../config");
const verifyAzureConfig = () => {
    if ((0, config_1.getConfig)().azure.baseUrl === "") {
        throw Error(`Azure pull requests are enabled, but you have not set a base URL`);
    }
    if ((0, config_1.getConfig)().azure.personalAccessToken === "") {
        throw Error(`Azure pull requests are enabled, but you have not set a personal access token`);
    }
};
const verifyGithubConfig = () => {
    if ((0, config_1.getConfig)().github.personalAccessToken === "") {
        throw Error(`Github pull requests are enabled, but you have not set a personal access token`);
    }
    if ((0, config_1.getConfig)().github.baseUrl === "") {
        throw Error(`Github pull requests are enabled, but you have not set a base URL`);
    }
};
const verifyGitlabConfig = () => {
    if ((0, config_1.getConfig)().gitlab.personalAccessToken === "") {
        throw Error(`Gitlab pull requests are enabled, but you have not set a personal access token`);
    }
    if ((0, config_1.getConfig)().gitlab.baseUrl === "") {
        throw Error(`Gitlab pull requests are enabled, but you have not set a base URL`);
    }
};
const verifyDateRange = () => {
    if ((0, date_fns_1.isBefore)((0, config_1.getConfig)().endDate, (0, config_1.getConfig)().startDate)) {
        const startDateString = (0, date_fns_1.format)((0, config_1.getConfig)().startDate, "dd/MM/yyyy");
        const endDateString = (0, date_fns_1.format)((0, config_1.getConfig)().endDate, "dd/MM/yyyy");
        throw Error(`endDate (${endDateString}) cannot be earlier than startDate (${startDateString})`);
    }
};
const verifyConfig = () => {
    verifyDateRange();
    if ((0, config_1.getConfig)().azure.enabled) {
        verifyAzureConfig();
    }
    if ((0, config_1.getConfig)().github.enabled) {
        verifyGithubConfig();
    }
    if ((0, config_1.getConfig)().gitlab.enabled) {
        verifyGitlabConfig();
    }
};
exports.verifyConfig = verifyConfig;
const inConfigDateRange = (prDateString) => {
    const prDate = new Date(prDateString);
    const allowedDateRange = { start: (0, config_1.getConfig)().startDate, end: (0, config_1.getConfig)().endDate };
    return (0, date_fns_1.isWithinInterval)(prDate, allowedDateRange);
};
exports.inConfigDateRange = inConfigDateRange;
//# sourceMappingURL=config-verifier.js.map