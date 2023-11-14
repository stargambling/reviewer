"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = exports.calculateAndShowLeaderboard = exports.getAllPullRequestData = void 0;
const azure_1 = require("../azure/azure");
const config_1 = require("../config");
const github_1 = require("../github/github");
const gitlab_1 = require("../gitlab/gitlab");
const result_calculator_1 = require("../shared/result-calculator");
const config_verifier_1 = require("./config-verifier");
const shared_logger_1 = require("./shared-logger");
const getAllPullRequestData = async () => {
    let pullRequests = [];
    if ((0, config_1.getConfig)().gitlab.enabled) {
        const gitlabPullRequests = await (0, gitlab_1.getGitlabPullRequests)();
        pullRequests = pullRequests.concat(gitlabPullRequests);
    }
    if ((0, config_1.getConfig)().github.enabled) {
        const githubPullRequests = await (0, github_1.getGithubPullRequests)();
        pullRequests = pullRequests.concat(githubPullRequests);
    }
    if ((0, config_1.getConfig)().azure.enabled) {
        const azurePullRequests = await (0, azure_1.getAzurePullRequests)();
        pullRequests = pullRequests.concat(azurePullRequests);
    }
    return pullRequests;
};
exports.getAllPullRequestData = getAllPullRequestData;
const calculateAndShowLeaderboard = (pullRequests) => {
    const results = (0, result_calculator_1.calculateResults)(pullRequests);
    const sortedResults = (0, result_calculator_1.sortResults)(results);
    const tableResults = (0, result_calculator_1.createResultsTable)(sortedResults);
    (0, result_calculator_1.logResults)(tableResults);
};
exports.calculateAndShowLeaderboard = calculateAndShowLeaderboard;
const run = async () => {
    try {
        (0, config_verifier_1.verifyConfig)();
        const pullRequests = await (0, exports.getAllPullRequestData)();
        (0, exports.calculateAndShowLeaderboard)(pullRequests);
    }
    catch (error) {
        (0, shared_logger_1.logError)(error);
    }
};
exports.run = run;
//# sourceMappingURL=leaderboard.js.map