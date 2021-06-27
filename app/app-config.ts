/**
 * Copyright (c) 2021 Patrik Forsberg <patrik.forsberg@coldmind.com> - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential.
 */

import * as config    from "config";
import { injectable } from "tsyringe";

export interface IAppConfig {
}

export const DebugMode = true;

@injectable()
export class AppConfig implements IAppConfig {

	constructor() {}

	public init() {
		const dbConfig = config.get('Customer.dbConfig');

		if (config.has('optionalFeature.detail')) {
			const detail = config.get('optionalFeature.detail');
		}
	}

	public getDatabaseConfig() {
	}
}

export { config }
