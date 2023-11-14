import { AzureHttpHeaders, AzureHttpParams, AzurePullRequest, AzurePullRequestNote, AzureRepository } from "./azure-models";
export declare const getAzureHttpHeaders: () => AzureHttpHeaders;
export declare const getAzureHttpParams: () => AzureHttpParams;
export declare const fetchPullRequestNotes: (projectName: string, pullRequestID: number) => Promise<AzurePullRequestNote[]>;
export declare const fetchAzurePullRequestsByProject: (projectName: string) => Promise<AzurePullRequest[]>;
export declare const fetchAzureRepositoryData: () => Promise<AzureRepository[]>;
//# sourceMappingURL=azure-data-gatherer.d.ts.map