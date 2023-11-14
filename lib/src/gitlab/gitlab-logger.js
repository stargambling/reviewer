"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logPullRequestFetchingCompletion = exports.logPullRequestFetchingProgress = exports.logPullRequestFetchingStart = void 0;
const shared_logger_1 = require("../shared/shared-logger");
const logPullRequestFetchingStart = () => {
    shared_logger_1.terminalSpinner.start("Fetching GitLab pull requests...");
};
exports.logPullRequestFetchingStart = logPullRequestFetchingStart;
const logPullRequestFetchingProgress = (prIndex, numPRs) => {
    if (prIndex === 0) {
        shared_logger_1.terminalSpinner.start("");
    }
    shared_logger_1.terminalSpinner.text = `Fetching comments and approvals for each pull request... ${prIndex + 1}/${numPRs}`;
    if (prIndex + 1 === numPRs) {
        shared_logger_1.terminalSpinner.stopAndPersist();
    }
};
exports.logPullRequestFetchingProgress = logPullRequestFetchingProgress;
const logPullRequestFetchingCompletion = (numPullRequests) => {
    shared_logger_1.terminalSpinner.stopAndPersist();
    shared_logger_1.terminalSpinner.succeed(`Found ${numPullRequests} pull requests!`);
};
exports.logPullRequestFetchingCompletion = logPullRequestFetchingCompletion;
//# sourceMappingURL=gitlab-logger.js.map