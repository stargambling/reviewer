"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
class Result {
    constructor(name, numPullRequests, numComments, numApprovals) {
        this.numPullRequests = 0;
        this.numComments = 0;
        this.numApprovals = 0;
        this.name = name;
        this.numPullRequests = numPullRequests ?? this.numPullRequests;
        this.numComments = numComments ?? this.numComments;
        this.numApprovals = numApprovals ?? this.numApprovals;
    }
}
exports.Result = Result;
//# sourceMappingURL=result.model.js.map