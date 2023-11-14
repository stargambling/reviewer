"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logResults = exports.createResultsTable = exports.sortResults = exports.calculateResults = void 0;
const date_fns_1 = require("date-fns");
const table_1 = require("table");
const config_1 = require("../config");
const note_type_enum_1 = require("../shared/note-type.enum");
const result_model_1 = require("../shared/result.model");
const shared_logger_1 = require("./shared-logger");
const TABLE_HEADINGS = ["Name", "Pull Requests", "Comments", "Approvals"];
const formatDate = (date) => {
    return (0, date_fns_1.format)(date, "dd/MM/yyyy");
};
const getTableConfig = () => {
    return {
        columnDefault: {
            alignment: "center",
        },
        header: {
            content: `CODE REVIEW LEADERBOARD\n\n${formatDate((0, config_1.getConfig)().startDate)} - ${formatDate((0, config_1.getConfig)().endDate)}`,
        },
    };
};
const getUniqueNames = (pullRequests) => {
    return [...new Set(pullRequests.map((pullRequest) => pullRequest.authorName))];
};
const calculateResults = (pullRequests) => {
    (0, shared_logger_1.logCalculationStart)();
    const uniqueNames = getUniqueNames(pullRequests);
    const results = uniqueNames.map((name) => new result_model_1.Result(name));
    for (const result of results) {
        for (const pullRequest of pullRequests) {
            if (pullRequest.authorName === result.name) {
                result.numPullRequests++;
            }
            for (const note of pullRequest.notes) {
                if (note.authorName === result.name && note.noteType === note_type_enum_1.NoteType.Approval) {
                    result.numApprovals++;
                }
                else if (note.authorName === result.name && note.noteType === note_type_enum_1.NoteType.Comment) {
                    result.numComments++;
                }
            }
        }
    }
    (0, shared_logger_1.logCalculationComplete)();
    return results;
};
exports.calculateResults = calculateResults;
const sortResults = (results) => {
    return results.sort((result1, result2) => result2.numApprovals - result1.numApprovals ||
        result2.numComments - result1.numComments ||
        result2.numPullRequests - result1.numPullRequests ||
        result1.name.localeCompare(result2.name));
};
exports.sortResults = sortResults;
const createResultsTable = (results) => {
    const tableResults = [];
    tableResults.push(TABLE_HEADINGS);
    results.forEach((result) => {
        tableResults.push([result.name, result.numPullRequests, result.numComments, result.numApprovals]);
    });
    return tableResults;
};
exports.createResultsTable = createResultsTable;
const logResults = (tableResults) => {
    const tableOfResults = (0, table_1.table)(tableResults, getTableConfig());
    console.log(tableOfResults);
};
exports.logResults = logResults;
//# sourceMappingURL=result-calculator.js.map