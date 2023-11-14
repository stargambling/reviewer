"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRepositoryFetchingCompletion = exports.logPullRequestNoteFetchingProgress = exports.logPullRequestFetchingProgress = exports.logRepositoryFetchingStart = void 0;
const shared_logger_1 = require("../shared/shared-logger");
const logRepositoryFetchingStart = () => {
    shared_logger_1.terminalSpinner.start("Fetching Azure repositories...");
};
exports.logRepositoryFetchingStart = logRepositoryFetchingStart;
const logPullRequestFetchingProgress = (repoIndex, numRepos, numPRs) => {
    if (repoIndex === 0) {
        shared_logger_1.terminalSpinner.start("");
    }
    shared_logger_1.terminalSpinner.text = `Fetching pull requests for each repository... ${repoIndex + 1}/${numRepos}`;
    if (repoIndex + 1 === numRepos && numPRs === 0) {
        shared_logger_1.terminalSpinner.stopAndPersist();
    }
};
exports.logPullRequestFetchingProgress = logPullRequestFetchingProgress;
const logPullRequestNoteFetchingProgress = (repoIndex, numRepos, prIndex, numPRs) => {
    const repoText = `Fetching pull requests for each repository... ${repoIndex + 1}/${numRepos}`;
    const prText = `Fetching comments and approvals for pull request ${prIndex + 1}/${numPRs}...`;
    shared_logger_1.terminalSpinner.text = `${repoText}\n  ${prText}`;
    if (repoIndex + 1 === numRepos && prIndex + 1 === numPRs) {
        shared_logger_1.terminalSpinner.stopAndPersist();
    }
};
exports.logPullRequestNoteFetchingProgress = logPullRequestNoteFetchingProgress;
const logRepositoryFetchingCompletion = (numRepos) => {
    shared_logger_1.terminalSpinner.stopAndPersist();
    shared_logger_1.terminalSpinner.succeed(`Found ${numRepos} repositories!`);
};
exports.logRepositoryFetchingCompletion = logRepositoryFetchingCompletion;
//# sourceMappingURL=azure-logger.js.map