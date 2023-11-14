import { Config } from "../shared/config.model";
export declare const getStartDate: () => Promise<Date>;
export declare const getEndDate: (startDate: Date) => Promise<Date>;
export declare const getPlatforms: () => Promise<string[]>;
export declare const getAzureBaseUrl: () => Promise<string>;
export declare const getAzureAccessToken: () => Promise<string>;
export declare const getGithubBaseUrl: () => Promise<string>;
export declare const getGithubAccessToken: () => Promise<string>;
export declare const getGitlabBaseUrl: () => Promise<string>;
export declare const getGitlabAccessToken: () => Promise<string>;
export declare const getConfigFromCli: () => Promise<Config>;
//# sourceMappingURL=prompts.d.ts.map