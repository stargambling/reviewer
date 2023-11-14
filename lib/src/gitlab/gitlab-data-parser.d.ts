import { PullRequestNote } from "../shared/pull-request-note.model";
import { PullRequest } from "../shared/pull-request.model";
import { GitlabPullRequestData, GitlabPullRequestNoteData } from "./gitlab-models";
export declare const parseGitlabPullRequestData: (pullRequestsData: GitlabPullRequestData[]) => PullRequest[];
export declare const parseGitlabPullRequestNoteData: (pullRequestNotesData: GitlabPullRequestNoteData[]) => PullRequestNote[];
//# sourceMappingURL=gitlab-data-parser.d.ts.map