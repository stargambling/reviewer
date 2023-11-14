"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseGitlabPullRequestNoteData = exports.parseGitlabPullRequestData = void 0;
const note_type_enum_1 = require("../shared/note-type.enum");
const pull_request_note_model_1 = require("../shared/pull-request-note.model");
const pull_request_model_1 = require("../shared/pull-request.model");
const parseGitlabPullRequestData = (pullRequestsData) => {
    return pullRequestsData.map((data) => new pull_request_model_1.PullRequest(data.author.name));
};
exports.parseGitlabPullRequestData = parseGitlabPullRequestData;
const determineNoteType = (data) => {
    if (data.body === "approved this merge request") {
        return note_type_enum_1.NoteType.Approval;
    }
    else if (data.resolvable === true) {
        return note_type_enum_1.NoteType.Comment;
    }
    else {
        return note_type_enum_1.NoteType.Unknown;
    }
};
const parseGitlabPullRequestNoteData = (pullRequestNotesData) => {
    return pullRequestNotesData
        .map((data) => new pull_request_note_model_1.PullRequestNote(data.author.name, determineNoteType(data)))
        .filter((note) => note.noteType === note_type_enum_1.NoteType.Approval || note.noteType === note_type_enum_1.NoteType.Comment);
};
exports.parseGitlabPullRequestNoteData = parseGitlabPullRequestNoteData;
//# sourceMappingURL=gitlab-data-parser.js.map