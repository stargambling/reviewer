"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = exports.logCalculationComplete = exports.logCalculationStart = exports.logNoteCount = exports.terminalSpinner = void 0;
const ora_1 = __importDefault(require("ora"));
const note_type_enum_1 = require("./note-type.enum");
exports.terminalSpinner = (0, ora_1.default)();
const countPullRequestNotesByType = (notes, noteType) => {
    return notes.filter((note) => note.noteType === noteType).length;
};
const countPullRequestActivity = (pullRequests, noteType) => {
    if (pullRequests.length === 0) {
        return 0;
    }
    return pullRequests
        .map((pr) => countPullRequestNotesByType(pr.notes, noteType))
        .reduce((accumulator, numApprovals) => accumulator + numApprovals);
};
const logNoteCount = (pullRequests) => {
    const totalComments = countPullRequestActivity(pullRequests, note_type_enum_1.NoteType.Comment);
    const totalApprovals = countPullRequestActivity(pullRequests, note_type_enum_1.NoteType.Approval);
    exports.terminalSpinner.succeed(`Found ${totalComments} comments and ${totalApprovals} approvals\n`);
};
exports.logNoteCount = logNoteCount;
const logCalculationStart = () => {
    exports.terminalSpinner.start("Calculating results...");
};
exports.logCalculationStart = logCalculationStart;
const logCalculationComplete = () => {
    exports.terminalSpinner.stopAndPersist();
    exports.terminalSpinner.succeed("Done\n");
};
exports.logCalculationComplete = logCalculationComplete;
const logError = (error) => {
    exports.terminalSpinner.stopAndPersist();
    exports.terminalSpinner.fail(error.toString());
};
exports.logError = logError;
//# sourceMappingURL=shared-logger.js.map