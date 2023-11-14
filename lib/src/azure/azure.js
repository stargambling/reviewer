"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAzurePullRequests = void 0;
const config_verifier_1 = require("../shared/config-verifier");
const shared_logger_1 = require("../shared/shared-logger");
const azure_data_gatherer_1 = require("./azure-data-gatherer");
const azure_data_parser_1 = require("./azure-data-parser");
const azure_logger_1 = require("./azure-logger");
const getAzurePullRequests = async () => {
    (0, azure_logger_1.logRepositoryFetchingStart)();
    const repositoryData = await (0, azure_data_gatherer_1.fetchAzureRepositoryData)();
    let allPullRequests = [];
    (0, azure_logger_1.logRepositoryFetchingCompletion)(repositoryData.length);
    for (let repoIndex = 0; repoIndex < repositoryData.length; repoIndex++) {
        const pullRequestsData = await (0, azure_data_gatherer_1.fetchAzurePullRequestsByProject)(repositoryData[repoIndex].name);
        const validPullRequestsData = pullRequestsData.filter((pr) => (0, config_verifier_1.inConfigDateRange)(pr.creationDate));
        const pullRequests = (0, azure_data_parser_1.parseAzurePullRequestData)(validPullRequestsData);
        (0, azure_logger_1.logPullRequestFetchingProgress)(repoIndex, repositoryData.length, pullRequests.length);
        for (let prIndex = 0; prIndex < pullRequests.length; prIndex++) {
            (0, azure_logger_1.logPullRequestNoteFetchingProgress)(repoIndex, repositoryData.length, prIndex, pullRequests.length);
            const threads = await (0, azure_data_gatherer_1.fetchPullRequestNotes)(repositoryData[repoIndex].name, validPullRequestsData[prIndex].pullRequestId);
            const validThreads = threads.filter((pr) => (0, config_verifier_1.inConfigDateRange)(pr.lastUpdatedDate));
            pullRequests[prIndex].notes = (0, azure_data_parser_1.parseAzurePullRequestNoteData)(validThreads);
        }
        allPullRequests = allPullRequests.concat(pullRequests);
    }
    (0, shared_logger_1.logNoteCount)(allPullRequests);
    return allPullRequests;
};
exports.getAzurePullRequests = getAzurePullRequests;
//# sourceMappingURL=azure.js.map