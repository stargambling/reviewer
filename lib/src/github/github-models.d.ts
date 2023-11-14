export interface GithubHttpHeaders {
    Authorization: string;
}
export interface GithubHttpParams {
    [key: string]: string | number;
    state: string;
    page: number;
    per_page: number;
    sort: string;
    direction: string;
}
interface User {
    login: string;
}
export interface GithubRepository {
    name: string;
    updated_at: string;
}
export interface GithubPullRequest {
    number: number;
    state: string;
    user: User;
    updated_at: string;
}
export interface GithubPullRequestNote {
    user: User;
    state: string;
    submitted_at: string;
}
export declare type GithubRepositoryResponse = GithubRepository[];
export declare type GithubPullRequestResponse = GithubPullRequest[];
export declare type GithubPullRequestNoteResponse = GithubPullRequestNote[];
export {};
//# sourceMappingURL=github-models.d.ts.map