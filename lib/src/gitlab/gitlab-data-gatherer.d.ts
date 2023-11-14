import { GitlabHttpHeaders, GitlabHttpParams, GitlabPullRequestData, GitlabPullRequestNoteData } from "./gitlab-models";
export declare const getGitlabHttpHeaders: () => GitlabHttpHeaders;
export declare const getGitlabHttpParams: (pageNumber?: number | undefined) => GitlabHttpParams;
export declare const fetchGitlabPullRequestNoteData: (projectID: number, pullRequestID: number) => Promise<GitlabPullRequestNoteData[]>;
export declare const fetchAllGitlabPullRequestData: () => Promise<GitlabPullRequestData[]>;
//# sourceMappingURL=gitlab-data-gatherer.d.ts.map