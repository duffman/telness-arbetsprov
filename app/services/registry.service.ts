/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Router }          from "express";
import { Express }         from "express";
import { singleton }       from "tsyringe";
import { container }       from "tsyringe";
import { IApiController }  from "../api/api.controller";
import { SubscriptionApi } from "../api/subscription-api";
import { Logger }          from "../utils/logger";

@singleton()
export class RegistryService {
	private webRoutes: Router;
	private registry: IApiController[];

	constructor() {
		this.registry = [];
	}

	public init(webRoutes: Router, app?: Express) {
		this.webRoutes = webRoutes;

		this.registry = [
			container.resolve(SubscriptionApi)
		];

		for (const controller of this.registry) {
			//app.use(controller.baseRoute, controller.router);
			//console.log("[RegistryService] Registered router ::", controller.baseRoute);
			controller.initRoutes(this.webRoutes);
			Logger.logCyan("[RegistryService] Registering controller ::", controller.constructor.name);
		}
	}
}
