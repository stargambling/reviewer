"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllGitlabPullRequestData = exports.fetchGitlabPullRequestNoteData = exports.getGitlabHttpParams = exports.getGitlabHttpHeaders = void 0;
const gaxios_1 = require("gaxios");
const config_1 = require("../config");
const PULL_REQUEST_LOOKUP_PATH = "api/v4/merge_requests";
const PROJECT_LOOKUP_PATH = "api/v4/projects";
const MAX_LOOKUP_CALLS = 100;
const MAX_RESULTS_PER_PAGE = 100;
const getGitlabHttpHeaders = () => {
    return {
        "PRIVATE-TOKEN": (0, config_1.getConfig)().gitlab.personalAccessToken,
    };
};
exports.getGitlabHttpHeaders = getGitlabHttpHeaders;
const getGitlabHttpParams = (pageNumber) => {
    return {
        scope: "all",
        state: "all",
        order_by: "updated_at",
        updated_before: (0, config_1.getConfig)().endDate.toISOString(),
        updated_after: (0, config_1.getConfig)().startDate.toISOString(),
        per_page: MAX_RESULTS_PER_PAGE,
        page: pageNumber ?? 1,
    };
};
exports.getGitlabHttpParams = getGitlabHttpParams;
const handleErrorResponse = (response) => {
    const baseErrorMessage = `Gitlab responded with ${response?.code ?? response.message}`;
    if (response?.code === "ENOTFOUND") {
        throw Error(`${baseErrorMessage}, which likely means that your baseUrl (${(0, config_1.getConfig)().gitlab.baseUrl}) is invalid`);
    }
    else if (response.response?.status === 401) {
        throw Error(`${baseErrorMessage}, which likely means that your personal access token is invalid`);
    }
    else {
        throw Error(baseErrorMessage);
    }
};
const fetchGitlabPullRequestDataByPage = async (pageNumber) => {
    let pullRequestLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: (0, config_1.getConfig)().gitlab.baseUrl,
        url: PULL_REQUEST_LOOKUP_PATH,
        method: "GET",
        params: (0, exports.getGitlabHttpParams)(pageNumber),
        headers: (0, exports.getGitlabHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => (pullRequestLookupResponse = response))
        .catch((response) => handleErrorResponse(response));
    return pullRequestLookupResponse?.data ?? [];
};
const fetchGitlabPullRequestNoteData = async (projectID, pullRequestID) => {
    let pullRequestNotesLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: (0, config_1.getConfig)().gitlab.baseUrl,
        url: `${PROJECT_LOOKUP_PATH}/${projectID}/merge_requests/${pullRequestID}/notes`,
        method: "GET",
        headers: (0, exports.getGitlabHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        pullRequestNotesLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return pullRequestNotesLookupResponse?.data ?? [];
};
exports.fetchGitlabPullRequestNoteData = fetchGitlabPullRequestNoteData;
const fetchAllGitlabPullRequestData = async () => {
    let pullRequestsData = [];
    for (let pageNumber = 1; pageNumber <= MAX_LOOKUP_CALLS; pageNumber++) {
        const lookupResults = await fetchGitlabPullRequestDataByPage(pageNumber);
        pullRequestsData = pullRequestsData.concat(lookupResults);
        const noMoreResults = lookupResults.length < MAX_RESULTS_PER_PAGE;
        if (noMoreResults) {
            break;
        }
    }
    return pullRequestsData;
};
exports.fetchAllGitlabPullRequestData = fetchAllGitlabPullRequestData;
//# sourceMappingURL=gitlab-data-gatherer.js.map