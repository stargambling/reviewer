"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseAzurePullRequestNoteData = exports.parseAzurePullRequestData = void 0;
const note_type_enum_1 = require("../shared/note-type.enum");
const pull_request_note_model_1 = require("../shared/pull-request-note.model");
const pull_request_model_1 = require("../shared/pull-request.model");
const parseAzurePullRequestData = (data) => {
    return data.map((pr) => new pull_request_model_1.PullRequest(pr.createdBy.displayName));
};
exports.parseAzurePullRequestData = parseAzurePullRequestData;
const approvalRegex = /[a-zA-Z ]+ voted [0-9]+/;
const determineNoteType = (data) => {
    if (data.commentType === "text") {
        return note_type_enum_1.NoteType.Comment;
    }
    else if (data.content.match(approvalRegex)) {
        return note_type_enum_1.NoteType.Approval;
    }
    else {
        return note_type_enum_1.NoteType.Unknown;
    }
};
const parseAzurePullRequestNoteData = (threads) => {
    const pullRequestNotes = [];
    for (const thread of threads) {
        for (const comment of thread.comments) {
            const note = new pull_request_note_model_1.PullRequestNote(comment.author.displayName, determineNoteType(comment));
            if (note.noteType === note_type_enum_1.NoteType.Approval || note.noteType === note_type_enum_1.NoteType.Comment) {
                pullRequestNotes.push(note);
            }
        }
    }
    return pullRequestNotes;
};
exports.parseAzurePullRequestNoteData = parseAzurePullRequestNoteData;
//# sourceMappingURL=azure-data-parser.js.map