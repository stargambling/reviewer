"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGithubRepositoryData = exports.fetchAllGithubPullRequestsForProject = exports.fetchPullRequestNotes = exports.getGithubOrg = exports.getGithubHttpParams = exports.getGithubHttpHeaders = void 0;
const gaxios_1 = require("gaxios");
const config_1 = require("../config");
const config_verifier_1 = require("../shared/config-verifier");
const BASE_URL = "https://api.github.com";
const MAX_LOOKUP_CALLS = 100;
const MAX_RESULTS_PER_PAGE = 100;
const getBase64PAT = () => {
    const token = `:${(0, config_1.getConfig)().github.personalAccessToken}`;
    const tokenBase64 = Buffer.from(token).toString("base64");
    return tokenBase64;
};
const validateSuccessResponse = (response) => {
    const baseErrorMessage = `Github responded with ${response.status} - ${response.statusText}`;
    if (response.status === 200) {
        return;
    }
    else {
        throw Error(baseErrorMessage);
    }
};
const handleErrorResponse = (response) => {
    if (response.response === undefined)
        throw response;
    const baseErrorMessage = `Github responded with ${response.response.status} - ${response.response.statusText}`;
    if (response.response.status === 403) {
        throw Error(`${baseErrorMessage}, which likely means that your personal access token is invalid`);
    }
    else if (response.response.status === 404) {
        throw Error(`${baseErrorMessage}, which likely means that your baseUrl (${(0, config_1.getConfig)().github.baseUrl}) is invalid`);
    }
    else {
        throw Error(baseErrorMessage);
    }
};
const getGithubHttpHeaders = () => {
    return {
        Authorization: `Basic ${getBase64PAT()}`,
    };
};
exports.getGithubHttpHeaders = getGithubHttpHeaders;
const getGithubHttpParams = (pageNumber) => {
    return {
        state: "all",
        per_page: MAX_RESULTS_PER_PAGE,
        page: pageNumber ?? 1,
        sort: "updated",
        direction: "desc",
    };
};
exports.getGithubHttpParams = getGithubHttpParams;
const getGithubOrg = () => {
    const baseUrl = (0, config_1.getConfig)().github.baseUrl;
    const baseUrlArray = baseUrl.split("/");
    const lastUrlParam = baseUrlArray.pop();
    return lastUrlParam ?? "";
};
exports.getGithubOrg = getGithubOrg;
const fetchPullRequestNotes = async (projectName, pullRequestID) => {
    let pullRequestLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: BASE_URL,
        url: `/repos/${(0, exports.getGithubOrg)()}/${projectName}/pulls/${pullRequestID}/reviews`,
        method: "GET",
        headers: (0, exports.getGithubHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        pullRequestLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return pullRequestLookupResponse?.data ?? [];
};
exports.fetchPullRequestNotes = fetchPullRequestNotes;
const fetchGithubPullRequestsByProject = async (projectName, pageNumber) => {
    let pullRequestLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: BASE_URL,
        url: `/repos/${(0, exports.getGithubOrg)()}/${projectName}/pulls`,
        method: "GET",
        params: (0, exports.getGithubHttpParams)(pageNumber),
        headers: (0, exports.getGithubHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        pullRequestLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return pullRequestLookupResponse?.data ?? [];
};
const fetchAllGithubPullRequestsForProject = async (projectName) => {
    let pullRequestsData = [];
    for (let pageNumber = 1; pageNumber <= MAX_LOOKUP_CALLS; pageNumber++) {
        const lookupResults = await fetchGithubPullRequestsByProject(projectName, pageNumber);
        pullRequestsData = pullRequestsData.concat(lookupResults);
        const noMoreResults = lookupResults.length < MAX_LOOKUP_CALLS;
        const lastResultInPage = lookupResults.pop()?.updated_at;
        const resultsNoLongerInDateRange = !!lastResultInPage && !(0, config_verifier_1.inConfigDateRange)(lastResultInPage);
        if (noMoreResults || resultsNoLongerInDateRange) {
            break;
        }
    }
    return pullRequestsData;
};
exports.fetchAllGithubPullRequestsForProject = fetchAllGithubPullRequestsForProject;
const fetchGithubRepositoryData = async () => {
    let repositoryLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: BASE_URL,
        url: `/orgs/${(0, exports.getGithubOrg)()}/repos`,
        method: "GET",
        headers: (0, exports.getGithubHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        repositoryLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return repositoryLookupResponse?.data ?? [];
};
exports.fetchGithubRepositoryData = fetchGithubRepositoryData;
//# sourceMappingURL=github-data-gatherer.js.map