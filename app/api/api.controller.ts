/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import { Router } from "express";

export interface IApiController {
	baseRoute: string;
	initRoutes(routes: Router): void;
}

export class ApiController {
}
