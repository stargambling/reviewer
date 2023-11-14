"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGithubPullRequests = void 0;
const config_verifier_1 = require("../shared/config-verifier");
const shared_logger_1 = require("../shared/shared-logger");
const github_data_gatherer_1 = require("./github-data-gatherer");
const github_data_parser_1 = require("./github-data-parser");
const github_logger_1 = require("./github-logger");
const getGithubPullRequests = async () => {
    (0, github_logger_1.logRepositoryFetchingStart)();
    const repositoryData = await (0, github_data_gatherer_1.fetchGithubRepositoryData)();
    let allPullRequests = [];
    (0, github_logger_1.logRepositoryFetchingCompletion)(repositoryData.length);
    for (let repoIndex = 0; repoIndex < repositoryData.length; repoIndex++) {
        const pullRequestsData = await (0, github_data_gatherer_1.fetchAllGithubPullRequestsForProject)(repositoryData[repoIndex].name);
        const validPullRequestsData = pullRequestsData.filter((pr) => (0, config_verifier_1.inConfigDateRange)(pr.updated_at));
        const pullRequests = (0, github_data_parser_1.parseGithubPullRequestData)(validPullRequestsData);
        (0, github_logger_1.logPullRequestFetchingProgress)(repoIndex, repositoryData.length, pullRequests.length);
        for (let prIndex = 0; prIndex < pullRequests.length; prIndex++) {
            (0, github_logger_1.logPullRequestNoteFetchingProgress)(repoIndex, repositoryData.length, prIndex, pullRequests.length);
            const threads = await (0, github_data_gatherer_1.fetchPullRequestNotes)(repositoryData[repoIndex].name, validPullRequestsData[prIndex].number);
            const validThreads = threads.filter((pr) => (0, config_verifier_1.inConfigDateRange)(pr.submitted_at));
            pullRequests[prIndex].notes = (0, github_data_parser_1.parseGithubPullRequestNoteData)(validThreads);
        }
        allPullRequests = allPullRequests.concat(pullRequests);
    }
    (0, shared_logger_1.logNoteCount)(allPullRequests);
    return allPullRequests;
};
exports.getGithubPullRequests = getGithubPullRequests;
//# sourceMappingURL=github.js.map