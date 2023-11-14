import { Result } from "../shared/result.model";
import { PullRequest } from "./pull-request.model";
export declare const calculateResults: (pullRequests: PullRequest[]) => Result[];
export declare const sortResults: (results: Result[]) => Result[];
export declare const createResultsTable: (results: Result[]) => (number | string)[][];
export declare const logResults: (tableResults: (number | string)[][]) => void;
//# sourceMappingURL=result-calculator.d.ts.map