import { GithubHttpHeaders, GithubHttpParams, GithubPullRequest, GithubPullRequestNote, GithubRepository } from "./github-models";
export declare const getGithubHttpHeaders: () => GithubHttpHeaders;
export declare const getGithubHttpParams: (pageNumber?: number | undefined) => GithubHttpParams;
export declare const getGithubOrg: () => string;
export declare const fetchPullRequestNotes: (projectName: string, pullRequestID: number) => Promise<GithubPullRequestNote[]>;
export declare const fetchAllGithubPullRequestsForProject: (projectName: string) => Promise<GithubPullRequest[]>;
export declare const fetchGithubRepositoryData: () => Promise<GithubRepository[]>;
//# sourceMappingURL=github-data-gatherer.d.ts.map