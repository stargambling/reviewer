#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("./cli/prompts");
const config_1 = require("./config");
const leaderboard_1 = require("./shared/leaderboard");
(0, prompts_1.getConfigFromCli)().then((config) => {
    (0, config_1.setConfig)(config);
    (0, leaderboard_1.run)();
});
//# sourceMappingURL=cli.js.map