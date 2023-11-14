"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGithubPullRequestNoteData = exports.parseGithubPullRequestData = void 0;
const note_type_enum_1 = require("../shared/note-type.enum");
const pull_request_note_model_1 = require("../shared/pull-request-note.model");
const pull_request_model_1 = require("../shared/pull-request.model");
const parseGithubPullRequestData = (data) => {
    return data.map((pr) => new pull_request_model_1.PullRequest(pr.user.login));
};
exports.parseGithubPullRequestData = parseGithubPullRequestData;
const determineNoteType = (state) => {
    if (state === "COMMENTED") {
        return note_type_enum_1.NoteType.Comment;
    }
    else if (state === "APPROVED") {
        return note_type_enum_1.NoteType.Approval;
    }
    else {
        return note_type_enum_1.NoteType.Unknown;
    }
};
const parseGithubPullRequestNoteData = (threads) => {
    const pullRequestNotes = [];
    for (const thread of threads) {
        const note = new pull_request_note_model_1.PullRequestNote(thread.user.login, determineNoteType(thread.state));
        if (note.noteType === note_type_enum_1.NoteType.Approval || note.noteType === note_type_enum_1.NoteType.Comment) {
            pullRequestNotes.push(note);
        }
    }
    return pullRequestNotes;
};
exports.parseGithubPullRequestNoteData = parseGithubPullRequestNoteData;
//# sourceMappingURL=github-data-parser.js.map