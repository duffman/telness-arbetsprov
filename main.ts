/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import "reflect-metadata";
import { container }       from "tsyringe";
import { ApiController }   from "./app/api/api.controller";
import { SubscriptionDB }     from "./app/api/db/subscription-db";
import { SubscriptionApi } from "./app/api/subscription-api";
import { AppConfig }       from "./app/app-config";
import { DAO }                from "./app/database/dao";
import { RegistryService }    from "./app/services/registry.service";
import { CliArgs }         from "./app/utils/cli-args";
import { Logger }          from "./app/utils/logger";
import { WebServer }       from "./app/webserver";
import { LogService }      from "./app/services/log.service";

const pkg = require("package.json");

container.register<WebServer>(WebServer, { useClass: WebServer });
container.register<DAO>(DAO, { useClass: DAO });
container.register<LogService>(LogService, { useClass: LogService });
container.register<AppConfig>(AppConfig, { useClass: AppConfig });
container.register<ApiController>(ApiController, { useClass: SubscriptionApi });
container.register<RegistryService>(RegistryService, { useClass: RegistryService });
container.register<SubscriptionDB>(SubscriptionDB, { useClass: SubscriptionDB });

Logger.logGreen(WebServer.getFullIdent());

const importCSVData = CliArgs.getParamByName("importCSV");
if (importCSVData) {

}

Logger.logCyan("Import ")

//const instance = container.resolve(Webserver);
