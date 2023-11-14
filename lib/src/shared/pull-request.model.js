"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PullRequest = void 0;
class PullRequest {
    constructor(authorName, notes) {
        this.notes = [];
        this.authorName = authorName;
        this.notes = notes ?? this.notes;
    }
}
exports.PullRequest = PullRequest;
//# sourceMappingURL=pull-request.model.js.map