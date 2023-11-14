"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAzureRepositoryData = exports.fetchAzurePullRequestsByProject = exports.fetchPullRequestNotes = exports.getAzureHttpParams = exports.getAzureHttpHeaders = void 0;
const gaxios_1 = require("gaxios");
const config_1 = require("../config");
const getBase64PAT = () => {
    const token = `:${(0, config_1.getConfig)().azure.personalAccessToken}`;
    const tokenBase64 = Buffer.from(token).toString("base64");
    return tokenBase64;
};
const validateSuccessResponse = (response) => {
    const baseErrorMessage = `Azure responded with ${response.status} - ${response.statusText}`;
    if (response.status === 200) {
        return;
    }
    else if (response.status === 203) {
        throw Error(`${baseErrorMessage}, which likely means that your personal access token is invalid`);
    }
    else {
        throw Error(baseErrorMessage);
    }
};
const handleErrorResponse = (response) => {
    // Re-throw the error from validateSuccessResponse()
    // Necessary because 203 responses indicate an error, but are not interpreted as an error by Gaxios
    if (response.response === undefined) {
        throw response;
    }
    const baseErrorMessage = `Azure responded with ${response.response.status} - ${response.response.statusText}`;
    if (response.response.status === 401) {
        throw Error(`${baseErrorMessage}, which likely means that you do not have permission to access ${(0, config_1.getConfig)().azure.baseUrl}`);
    }
    else if (response.response.status === 404) {
        throw Error(`${baseErrorMessage}, which likely means that your baseUrl (${(0, config_1.getConfig)().azure.baseUrl}) is invalid`);
    }
    else {
        throw Error(baseErrorMessage);
    }
};
const getAzureHttpHeaders = () => {
    return {
        Authorization: `Basic ${getBase64PAT()}`,
    };
};
exports.getAzureHttpHeaders = getAzureHttpHeaders;
const getAzureHttpParams = () => {
    return {
        "api-version": 6.0,
        "$top": 1000,
        "searchCriteria.status": "all",
    };
};
exports.getAzureHttpParams = getAzureHttpParams;
const fetchPullRequestNotes = async (projectName, pullRequestID) => {
    let pullRequestLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: (0, config_1.getConfig)().azure.baseUrl,
        url: `/${projectName}/_apis/git/repositories/${projectName}/pullrequests/${pullRequestID}/threads`,
        method: "GET",
        headers: (0, exports.getAzureHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        pullRequestLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return pullRequestLookupResponse?.data.value ?? [];
};
exports.fetchPullRequestNotes = fetchPullRequestNotes;
const fetchAzurePullRequestsByProject = async (projectName) => {
    let pullRequestLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: (0, config_1.getConfig)().azure.baseUrl,
        url: `/${projectName}/_apis/git/pullrequests`,
        method: "GET",
        params: (0, exports.getAzureHttpParams)(),
        headers: (0, exports.getAzureHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        pullRequestLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return pullRequestLookupResponse?.data.value ?? [];
};
exports.fetchAzurePullRequestsByProject = fetchAzurePullRequestsByProject;
const fetchAzureRepositoryData = async () => {
    let repositoryLookupResponse;
    await (0, gaxios_1.request)({
        baseUrl: (0, config_1.getConfig)().azure.baseUrl,
        url: `/_apis/git/repositories`,
        method: "GET",
        headers: (0, exports.getAzureHttpHeaders)(),
        timeout: (0, config_1.getConfig)().httpTimeoutInMS,
        retry: true,
    })
        .then((response) => {
        validateSuccessResponse(response);
        repositoryLookupResponse = response;
    })
        .catch((response) => handleErrorResponse(response));
    return repositoryLookupResponse?.data.value ?? [];
};
exports.fetchAzureRepositoryData = fetchAzureRepositoryData;
//# sourceMappingURL=azure-data-gatherer.js.map