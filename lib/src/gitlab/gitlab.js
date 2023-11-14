"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGitlabPullRequests = void 0;
const shared_logger_1 = require("../shared/shared-logger");
const gitlab_data_gatherer_1 = require("./gitlab-data-gatherer");
const gitlab_data_parser_1 = require("./gitlab-data-parser");
const gitlab_logger_1 = require("./gitlab-logger");
const getGitlabPullRequests = async () => {
    (0, gitlab_logger_1.logPullRequestFetchingStart)();
    const pullRequestsData = await (0, gitlab_data_gatherer_1.fetchAllGitlabPullRequestData)();
    const pullRequests = (0, gitlab_data_parser_1.parseGitlabPullRequestData)(pullRequestsData);
    (0, gitlab_logger_1.logPullRequestFetchingCompletion)(pullRequestsData.length);
    for (let prIndex = 0; prIndex < pullRequests.length; prIndex++) {
        (0, gitlab_logger_1.logPullRequestFetchingProgress)(prIndex, pullRequests.length);
        const noteData = await (0, gitlab_data_gatherer_1.fetchGitlabPullRequestNoteData)(pullRequestsData[prIndex].project_id, pullRequestsData[prIndex].iid);
        pullRequests[prIndex].notes = (0, gitlab_data_parser_1.parseGitlabPullRequestNoteData)(noteData);
    }
    (0, shared_logger_1.logNoteCount)(pullRequests);
    return pullRequests;
};
exports.getGitlabPullRequests = getGitlabPullRequests;
//# sourceMappingURL=gitlab.js.map