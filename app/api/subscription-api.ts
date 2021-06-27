/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { injectable }     from "tsyringe";
import { IApiController } from "./api.controller";
import { ApiController }  from "./api.controller";
import { Router }         from "express";
import { Request}         from "express";
import { Response}        from "express";
import { SubscriptionDB } from "./db/subscription-db";

@injectable()
export class SubscriptionApi extends ApiController implements IApiController {
	baseRoute: string = "";
	webRoutes: Router = Router();
	tableName: string = "subscriptions"

	constructor(private db: SubscriptionDB) {
		super();
	}

	public initRoutes(routes: Router): void {
		routes.all("/get", this.get.bind(this));
	}

	private async get(req: Request, resp: Response): Promise<void> {
		try {
			let data = await this.db.selectAll(this.tableName);

			resp.json(data);


		} catch (e) {
			console.error(e);
			resp.end(e.message);
			return;
		}
	}
}

