import { Ora } from "ora";
import { PullRequest } from "./pull-request.model";
export declare const terminalSpinner: Ora;
export declare const logNoteCount: (pullRequests: PullRequest[]) => void;
export declare const logCalculationStart: () => void;
export declare const logCalculationComplete: () => void;
export declare const logError: (error: Error) => void;
//# sourceMappingURL=shared-logger.d.ts.map