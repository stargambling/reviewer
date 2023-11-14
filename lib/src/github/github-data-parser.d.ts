import { PullRequestNote } from "../shared/pull-request-note.model";
import { PullRequest } from "../shared/pull-request.model";
import { GithubPullRequest, GithubPullRequestNote } from "./github-models";
export declare const parseGithubPullRequestData: (data: GithubPullRequest[]) => PullRequest[];
export declare const parseGithubPullRequestNoteData: (threads: GithubPullRequestNote[]) => PullRequestNote[];
//# sourceMappingURL=github-data-parser.d.ts.map