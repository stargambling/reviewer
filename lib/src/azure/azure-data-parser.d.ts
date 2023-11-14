import { PullRequestNote } from "../shared/pull-request-note.model";
import { PullRequest } from "../shared/pull-request.model";
import { AzurePullRequest, AzurePullRequestNote } from "./azure-models";
export declare const parseAzurePullRequestData: (data: AzurePullRequest[]) => PullRequest[];
export declare const parseAzurePullRequestNoteData: (threads: AzurePullRequestNote[]) => PullRequestNote[];
//# sourceMappingURL=azure-data-parser.d.ts.map